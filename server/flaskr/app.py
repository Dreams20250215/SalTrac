from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
CORS(app, resources={r"/*": {"origins": "*"}})
jwt = JWTManager(app)

users = {"testuser": "testpassword"}

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username in users and users[username] == password:
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)