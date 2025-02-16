import os
import json
import sqlite3
import traceback
import logging
from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
from datetime import timedelta
from models import db, User, Post, Follow, Like
import pytz
from FoodPredictor.predict_food import predict_food_salt


logging.basicConfig(level=logging.DEBUG)

load_dotenv()

# アプリケーションの定義
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///saltrac.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)

CORS(app, resources={r"/*": {"origins": "*"}})
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

db.init_app(app)

with app.app_context():
    db.create_all()

UPLOAD_FOLDER = "./uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/recommends", methods=["GET"])
@jwt_required()
def get_posts():
    user_id = get_jwt_identity()
    posts = Post.query.all()

    posts_data = [
        {
            "userid": post.user.id,
            "postid": post.id,
            "image": post.image if post.image else "./no_image.png",
            "text": post.text,
            "salt": post.salt,
            "username": post.user.username,
            "icon": post.user.icon if post.user.icon else "./user_default.png",
            "likes": post.get_likes_count(),
            "likedByCurrentUser": Like.query.filter_by(user_id=user_id, post_id=post.id).first() is not None
        }
        for post in posts
    ]
    return jsonify(posts_data), 200

@app.route("/like/<int:post_id>", methods=["POST"])
@jwt_required()
def like_post(post_id):
    user_id = get_jwt_identity()
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"error": "Post not found"}), 404
    
    existing_like = Like.query.filter_by(user_id=user_id, post_id=post_id).first()
    if existing_like:
        return jsonify({"message": "Already liked", "likes": Like.query.filter_by(post_id=post_id).count()}), 200
    
    new_like = Like(user_id=user_id, post_id=post_id)
    db.session.add(new_like)
    db.session.commit()

    likes_count = Like.query.filter_by(post_id=post_id).count()
    return jsonify({"message": "Liked", "likes": likes_count}), 201

@app.route("/unlike/<int:post_id>", methods=["DELETE"])
@jwt_required()
def unlike_post(post_id):
    user_id = get_jwt_identity()
    like = Like.query.filter_by(user_id=user_id, post_id=post_id).first()

    if not like:
        return jsonify({"error": "Like not found"}), 404
    
    db.session.delete(like)
    db.session.commit()

    likes_count = Like.query.filter_by(post_id=post_id).count()
    return jsonify({"message": "Unliked", "likes": likes_count}), 200


@app.route("/users", methods=["POST"])
@jwt_required()
def search_users():
    user_id = get_jwt_identity()
    data = request.get_json()

    search_query = data.get("query", "")
    users = User.query.filter(User.username.ilike(f"%{search_query}%")).all()
    users_data = [
        {
            "userid": user.id,
            "username": user.username,
            "icon": user.icon if user.icon else "./user_default.png",
            "post": user.post,
            "follow": user.follow_count,
            "follower": user.follower_count,
        }
        for user in users
    ]
    return jsonify(users_data), 200

@app.route("/follow", methods=["POST"])
@jwt_required()
def follow_user():
    user_id = get_jwt_identity()
    data = request.get_json()
    print("Received follow request:", data)
    target_user_id = data.get("userId")

    if not target_user_id:
        return jsonify({"success": False, "message": "Invalid user ID"}), 400
    
    target_user = User.query.get(target_user_id)

    if not target_user:
        return jsonify({"success": False, "message": "User not found"}), 400
    
    existing_follow = Follow.query.filter_by(follower_id=user_id, followed_id=target_user_id).first()

    if existing_follow:
        db.session.delete(existing_follow)
        db.session.commit()
        return jsonify({"success": True, "following": False, "updatedFollowerCount": target_user.follower_count}), 200
    else:
        new_follow = Follow(follower_id=user_id, followed_id=target_user_id)
        db.session.add(new_follow)
        db.session.commit()
        return jsonify({"success": True, "following": True, "updatedFollowerCount": target_user.follower_count}), 200

@app.route("/is_following/<int:target_user_id>", methods=["GET"])
@jwt_required()
def is_following(target_user_id):
    user_id = get_jwt_identity()
    
    follow = Follow.query.filter_by(follower_id=user_id, followed_id=target_user_id).first()

    return jsonify({"success": True, "isFollowing": follow is not None}), 200

@app.route("/analyze_image", methods=["POST"])
@jwt_required()
def analyze_image():
    image = request.files.get("image")
    if not image:
        return jsonify({"error": "No image provided"}), 400

    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    # 仮の画像認識処理 (ここにMLモデルを導入)
    predicted_salt = predict_food_salt(image_path)

    return predicted_salt, 200


@app.route("/post", methods=["POST"])
@jwt_required()
def upload_post():
    image = request.files.get("image")
    text = request.form.get("text", "")
    salt = request.form.get("salt", 0, type=int)
    userid = get_jwt_identity()

    user = User.query.get(userid)

    image_path = os.path.abspath(os.path.join(UPLOAD_FOLDER, image.filename))
    if image:
        image_path = os.path.join(UPLOAD_FOLDER, image.filename)
        image.save(image_path)

    new_post = Post(user_id=userid, image=image_path, text=text, salt=salt)
    db.session.add(new_post)

    user.post += 1

    db.session.commit()

    return jsonify({"Success": "Post saved"}), 201

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/mypost", methods=["GET"])
@jwt_required()
def get_myposts():
    user_id = get_jwt_identity()
    print(f"[DEBUG] user_id: {user_id}")

    user = User.query.get(user_id)
    if not user:
        print("[ERROR] User not found")
        return jsonify({"error": "User not found"}), 404

    myposts = Post.query.filter_by(user_id=user.id).all()
    print(f"[DEBUG] Retrieved {len(myposts)} posts")

    myposts_data = [{
        "postid": post.id,
        "userid": user.id,
        "image": post.image if post.image else "./no_image.png",
        "text": post.text,
        "salt": post.salt,
        "username": post.user.username,
        "icon": user.icon if user.icon else "./user_default.png",
        "likes": post.get_likes_count(),
        "likedByCurrentUser": Like.query.filter_by(user_id=user_id, post_id=post.id).first() is not None
    }
    for post in myposts
    ]
    return jsonify(myposts_data), 200

@app.route("/delete_post/<int:post_id>", methods=["DELETE"])
@jwt_required()
def delete(post_id):
    user_id = get_jwt_identity()
    post = Post.query.get(post_id)

    if not post or post.user_id != user_id:
        return jsonify({"error": "Post not found or unauthorized"}), 403
    
    user = User.query.get(user_id)
    user.post -= 1

    db.session.delete(post)
    db.session.commit()

    return jsonify({"success": True, "message": "Post deleted"}), 200

@app.route("/myprofile")
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    profile_data = {
        "userid": user.id,
        "username": user.username,
        "icon": user.icon if user.icon else "./user_default.png",
        "post": user.post,
        "follow": user.follow_count,
        "follower": user.follower_count,
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
        token = create_access_token(identity=user.id)
        print(f"Generated token for user ID: {user.id}")  # 追加
        return jsonify({"token": token, "username": username}), 200
    else:
        return jsonify({"message": "Bad username or password"}), 401
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)