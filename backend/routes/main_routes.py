"""General-purpose routes: health check / API root."""

from flask import Blueprint, jsonify

main_bp = Blueprint("main", __name__)


@main_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({"success": True, "message": "ShareBite API is running."})
