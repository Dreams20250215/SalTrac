import os
import json
import sqlite3
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime
from models import db, User
import pytz

load_dotenv()

# アプリケーションの定義
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///saltrac.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
CORS(app, resources={r"/*": {"origins": "*"}})
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

db.init_app(app)

with app.app_context():
    db.create_all()

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    body = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(pytz.timezone("Asia/Tokyo")))


@app.route("/recommends", methods=["GET"])
def get_posts():
    posts = Post.query.all()
    posts_data = [
        {
            "postid": post.id,
            "image": post.image,
            "text": post.text,
            "salt": post.salt,
            "username": post.user.username,
            "icon": post.user.icon if post.user.icon else "./user_default.png"
        }
        for post in posts
    ]
    return jsonify(posts_data)

@app.route("/mypost", methods=["POST"])
def upload_post():
    image = request.files["image"]
    text = request.form["text"]
    salt = request.form["salt"]
    userid = get_jwt_identity()

    image_path = os.path.join("uploads", image.filename)
    image.save(image_path)

    new_post = Post(user=userid, image=image_path, text=text, salt=salt)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({"messsage": "Post uploaded successfully", "postid": new_post}), 201

@app.route("/myprofile")
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()

    if not user_id:
        return jsonify({"message": "Invalid token"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    profile_data = {
        "userid": user.id,
        "username": user.username,
        "icon": user.icon if user.icon else "./user_default.png",
        "post": user.post,
        "follow": user.follow,
        "follower": user.follower,
    }

    return jsonify(profile_data), 200

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(email=email).first() or User.query.filter_by(username=username).first():
        return jsonify({"message": "Username or Email already exists"}), 400
    
    new_user = User(
        email=email,
        username=username,
        password_hash=bcrypt.generate_password_hash(password).decode("utf-8"),
        post = 0,
        follow=0,
        follower=0,
        icon="./user_default.png"
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=user.id)
        print(f"Generated token for user ID: {user.id}")  # 追加
        return jsonify({"access_token": access_token, "username": username}), 200
    else:
        return jsonify({"message": "Bad username or password"}), 401
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
