"""Configuración de la aplicación: lee las variables del archivo .env."""
import os

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    # Si no hay DATABASE_URL, se usa SQLite (un archivo local) para no bloquear las pruebas.
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or (
        "sqlite:///" + os.path.join(BASE_DIR, "evesat.db")
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Evita errores "MySQL server has gone away" en hostings que cierran conexiones inactivas.
    SQLALCHEMY_ENGINE_OPTIONS = {"pool_pre_ping": True, "pool_recycle": 280}

    CORS_ORIGINS = [
        o.strip()
        for o in os.getenv("CORS_ORIGINS", "*").split(",")
        if o.strip()
    ]

    # Para que los JSON muestren tildes y ñ tal cual.
    JSON_AS_ASCII = False
