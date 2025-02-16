from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)

    user = db.relationship("User", backref=db.backref("likes", lazy=True, cascade="all, delete-orphan"))
    post = db.relationship("Post", backref=db.backref("likes", lazy=True, cascade="all, delete-orphan"))

    __table_args__ = (db.UniqueConstraint("user_id", "post_id", name="unique_like"),)


class Follow(db.Model):
    __tablename__ = "follows"

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    follower = db.relationship("User", foreign_keys=[follower_id], back_populates="following_relations")
    followed = db.relationship("User", foreign_keys=[followed_id], back_populates="follower_relations")


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    post = db.Column(db.Integer, nullable=False, default=0)
    icon = db.Column(db.Text, nullable=True, default="./user_default.png")

    following_relations = db.relationship("Follow", foreign_keys=[Follow.follower_id], back_populates="follower", lazy="dynamic", cascade="all, delete-orphan")
    follower_relations = db.relationship("Follow", foreign_keys=[Follow.followed_id], back_populates="followed", lazy="dynamic", cascade="all, delete-orphan")

    @property
    def follow_count(self):
        return self.following_relations.count()

    @property
    def follower_count(self):
        return self.follower_relations.count()


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    image = db.Column(db.Text, nullable=False, default="./no_image.png")
    text = db.Column(db.Text, nullable=False)
    salt = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", backref=db.backref("posts", lazy=True))

<<<<<<< HEAD
    
    def get_likes_count(self):
        return Like.query.filter_by(post_id=self.id).count()
=======

class Food(db.Model):
    __tablename__ = "foods"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    salt = db.Column(db.Float, nullable=False)
>>>>>>> 5be8f23 (complete model)
