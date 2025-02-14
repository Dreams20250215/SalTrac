from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    post = db.Column(db.Integer, nullable=False, default=0)
    follow = db.Column(db.Integer, nullable=False, default=0)
    follower = db.Column(db.Integer, nullable=False, default=0)
    icon = db.Column(db.Text, nullable=True, default="./user_default.png")

