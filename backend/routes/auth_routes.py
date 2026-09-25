"""
Placeholder authentication routes.

These endpoints mock login/register against an in-memory list of users
(see data/mock_users.py). There is no password hashing, session handling,
or real database yet — that comes in a later milestone.
"""

from flask import Blueprint, jsonify, request

from data.mock_users import add_user, find_user_by_email

auth_bp = Blueprint("auth", __name__)

VALID_ROLES = {"donor", "ngo"}


@auth_bp.route("/register", methods=["POST"])
def register():
    body = request.get_json(silent=True) or {}
    name = (body.get("name") or "").strip()
    email = (body.get("email") or "").strip()
    password = body.get("password") or ""
    role = (body.get("role") or "").strip().lower()

    if not name or not email or not password:
        return jsonify({"success": False, "message": "Name, email, and password are required."}), 400

    if role not in VALID_ROLES:
        return jsonify({"success": False, "message": "Role must be either 'donor' or 'ngo'."}), 400

    if find_user_by_email(email):
        return jsonify({"success": False, "message": "An account with this email already exists."}), 409

    user = add_user(name, email, password, role)

    return jsonify({
        "success": True,
        "message": f"Account created for {user['name']} as a {user['role']}. (mocked, not persisted)",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
        },
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    body = request.get_json(silent=True) or {}
    email = (body.get("email") or "").strip()
    password = body.get("password") or ""

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400

    user = find_user_by_email(email)

    if not user or user["password"] != password:
        return jsonify({"success": False, "message": "Invalid email or password."}), 401

    return jsonify({
        "success": True,
        "message": f"Welcome back, {user['name']}! (mocked login, no session yet)",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
        },
    }), 200
