import sqlite3
import click
from flask import current_app, g


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row      # dictのように振舞えるようになる。列名による列のアクセス

    return g.db     # データベースへのコネクション


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

@click.command('init-db')
def init_db_command():
    init_db()
    click.echo('Initialized the database')


# Flaskアプリケーションを受け取り、登録
def init_app(app):
    app.teardown_appcontext(close_db)       # レスポンスを返した後のクリーンアップを行うときにclos_dbを呼び出す
    app.cli.add_command(init_db_command)        #　init_db_commandをflaskコマンドを使って読み出すことができるにする