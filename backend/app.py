"""
ShareBite backend entry point.
"""

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

from routes.auth_routes import auth_bp
from routes.main_routes import main_bp
from routes.donation_routes import donation_bp


def create_app():
    app = Flask(__name__)

    # Allow the Vite dev server (default http://localhost:5173) to call the API.
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.register_blueprint(main_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(donation_bp, url_prefix="/api")

    @app.errorhandler(404)
    def not_found(_error):
        return jsonify({"success": False, "message": "Resource not found."}), 404

    @app.errorhandler(500)
    def server_error(_error):
        return jsonify({"success": False, "message": "Internal server error."}), 500

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
