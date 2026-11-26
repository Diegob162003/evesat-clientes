"""Punto de entrada del backend EVESAT - Módulo Clientes.

Ejecutar en local:   python app.py   (queda en http://localhost:5000)
"""
from flask import Flask, jsonify
from flask_cors import CORS

from config import Config
from database import db
from models.cliente import Cliente
from routes.cliente_routes import clientes_bp

CLIENTES_INICIALES = [
    {"nombre": "Mariana Pérez", "correo": "mariana@mail.com", "telefono": "+57 311 222 3344", "eventos": 3, "estado": "Activo"},
    {"nombre": "Familia López", "correo": "lopez@mail.com", "telefono": "+57 300 555 1010", "eventos": 1, "estado": "Activo"},
    {"nombre": "TechCo S.A.S", "correo": "contacto@techco.com", "telefono": "+57 601 888 9000", "eventos": 4, "estado": "Activo"},
    {"nombre": "J. Vargas", "correo": "jvargas@mail.com", "telefono": "+57 312 444 5566", "eventos": 0, "estado": "Inactivo"},
    {"nombre": "Camila Restrepo", "correo": "camir@mail.com", "telefono": "+57 305 121 3434", "eventos": 1, "estado": "Activo"},
]


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.json.ensure_ascii = False

    CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})
    db.init_app(app)
    app.register_blueprint(clientes_bp)

    @app.get("/api/health")
    def health():
        return jsonify({"estado": "ok", "servicio": "EVESAT - Módulo Clientes"})

    @app.errorhandler(404)
    def no_encontrado(_e):
        return jsonify({"mensaje": "Recurso no encontrado."}), 404

    @app.errorhandler(500)
    def error_servidor(_e):
        return jsonify({"mensaje": "Error interno del servidor."}), 500

    # Crea la tabla si no existe y carga los clientes de ejemplo la primera vez.
    with app.app_context():
        db.create_all()
        if Cliente.query.count() == 0:
            db.session.add_all(Cliente(**c) for c in CLIENTES_INICIALES)
            db.session.commit()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
