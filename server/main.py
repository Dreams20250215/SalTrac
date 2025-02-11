from flask import Flask, request, redirect, url_for

app = Flask(__name__)

# routeデコレータで、どのURLが引き金になるべきかをFlaskに伝える
# URL "/"（ブラウザ）の時、home関数が呼ばれる
@app.route('/')
def home():
    return redirect(url_for('login'))

# ログイン画面の処理
@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['username'], request.form['passward']):
            return log_the_user_in(request.form['username'])
        else:
            error = 'Invalid username/passward'



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)      # host="0.0.0.0"で全ての公開されているIP上でアクセスを受け付け
    app.logger.debug('A value for debugging')
    app.logger.warning('A warning occurred (%d apples)', 42)
    app.logger.error('An error occurred')