import os 
from flask import Flask
from flask.cors import CORS
from flask_jwt_extended import JWTManager

# Application factory
def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)     # instance_relative_configは設定ファイルの場所がインスタンスフォルダから相対的に示されることをappに伝える
    app.config.from_mapping(
                        SECRET_KEY='dev',       # データを安全に保つため
                        DATAVASE = os.path.join(app.instance_path, 'flaskr.sqlite'),        # SQLiteデータベースファイルのパス
                        )
    
    app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
    CORS(app, resources={r"/*": {"origins": "*"}})
    jwt = JWTManager(app)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)        # 標準設定の上書き。デプロイ時の時には、本当のSECRET_KEYを設定するために使用
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    from . import db
    db.init_app(app)

    # Blueprintの登録
    from . import auth
    app.register_blueprint(auth.bp)
    from . import blog
    app.register_blueprint(blog.bp)
    app.add_url_rule('/', endpoint='index')

    return app