"""MODELO: representa la tabla `clientes` en la base de datos."""
from datetime import datetime

from database import db


class Cliente(db.Model):
    __tablename__ = "clientes"

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    correo = db.Column(db.String(150), nullable=False, unique=True)
    telefono = db.Column(db.String(30), nullable=True)
    # Cantidad de eventos del cliente. Cuando exista el módulo de eventos se calculará desde allí.
    eventos = db.Column(db.Integer, nullable=False, default=0)
    estado = db.Column(db.Enum("Activo", "Inactivo", name="estado_cliente"), nullable=False, default="Activo")
    fecha_registro = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def to_dict(self):
        """Convierte el cliente en un diccionario para devolverlo como JSON."""
        return {
            "id": self.id,
            "nombre": self.nombre,
            "correo": self.correo,
            "telefono": self.telefono or "",
            "eventos": self.eventos,
            "estado": self.estado,
            "fecha_registro": self.fecha_registro.isoformat() if self.fecha_registro else None,
        }
