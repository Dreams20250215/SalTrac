import os
from flask import Flask

# Application factory
def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)     # instance_relative_configは設定ファイルの場所がインスタンスフォルダから相対的に示されることをappに伝える
    app.config.from_mapping(
                        SECRET_KEY='dev',       # データを安全に保つため
                        DATAVASE = os.path.join(app.instance_path, 'flaskr.sqlite'),        # SQLiteデータベースファイルのパス
                        )
    
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)        # 標準設定の上書き。デプロイ時の時には、本当のSECRET_KEYを設定するために使用
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/hello')
    def hello():
        return 'Hello, World!'
    
    return app