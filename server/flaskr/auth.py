import functools
from flask import (Blueprint, flash, g, redirect, request, session, url_for, jsonify)
from werkzeug.security import check_password_hash, generate_password_hash
from flaskr.db import get_db


# authと名付けられたBlueprintを作成. url_prefixはblueprintと関連づけられる全てのURLの先頭に付けられる
bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/signup', methods=('GET', 'POST'))
def signup():
    if request.method == 'POST':
        data = request.get_json()
        username = data('username')
        password = data('password')
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'

        if error is None:
            try:
                db.execute(
                    "INSERT INTO user (username, password) VALUES (?, ?)",
                    (username, generate_password_hash(password)),
                )
                db.commit()
            except db.IntegrityError:
                error = f"User {username} is already registered."
            else:
                return jsonify({"status": "successful", "message": "redirect to /auth/login"})

        flash(error)

    return jsonify({"status": "error", "message": get_flashed_messages(with_categories=True)})


# ログイン
@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        data = request.get_data()
        username = data('username')
        password = data('password')
        db = get_db()
        error = None
        user = db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()        # fetchoneはクエリの結果から一行返す

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return jsonify({"status": "successful", "message": "redirect to /", "user id": user['id'], "username": username})
            #return redirect(url_for('index'))

        flash(error)

    return jsonify({"status": "error", "message": get_flashed_messages(with_categories=True)})

# viewの関数の前に実行する関数
@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()


# ログアウト
@bp.route('/logout')
def logout():
    session.clear()
    return jsonify({"message": "logout"})
    

# 他のviewでの認証の要求
def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return jsonify({"message": "login required, redirect /auth/login"})
        return view(**kwargs)
    
    return wrapped_view




