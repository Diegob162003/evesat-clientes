"""CONTROLADOR: lógica del CRUD de clientes (validar, consultar, crear, actualizar, eliminar).

Cada función devuelve una tupla (datos, código_http) para que la ruta solo tenga que responder.
"""
import re

from sqlalchemy import or_

from database import db
from models.cliente import Cliente

CORREO_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
ESTADOS_VALIDOS = ("Activo", "Inactivo")


def _validar(data, cliente_id=None):
    """Valida los datos recibidos. Devuelve un diccionario de errores por campo (vacío si todo está bien)."""
    errores = {}
    nombre = (data.get("nombre") or "").strip()
    correo = (data.get("correo") or "").strip().lower()
    telefono = (data.get("telefono") or "").strip()
    estado = data.get("estado") or "Activo"

    if not nombre:
        errores["nombre"] = "El nombre es obligatorio."
    elif len(nombre) > 120:
        errores["nombre"] = "El nombre no puede superar 120 caracteres."

    if not correo:
        errores["correo"] = "El correo es obligatorio."
    elif not CORREO_REGEX.match(correo):
        errores["correo"] = "Ingresa un correo válido."
    else:
        # El correo no se puede repetir (se ignora el propio cliente cuando se está editando).
        consulta = Cliente.query.filter(Cliente.correo == correo)
        if cliente_id is not None:
            consulta = consulta.filter(Cliente.id != cliente_id)
        if consulta.first():
            errores["correo"] = "Ya existe un cliente con ese correo."

    if telefono and not re.fullmatch(r"[0-9+\-\s()]{7,30}", telefono):
        errores["telefono"] = "Ingresa un teléfono válido."

    if estado not in ESTADOS_VALIDOS:
        errores["estado"] = "El estado debe ser Activo o Inactivo."

    limpio = {"nombre": nombre, "correo": correo, "telefono": telefono, "estado": estado}
    return errores, limpio


def listar_clientes(busqueda=None):
    """READ: lista todos los clientes (opcionalmente filtrados por nombre o correo)."""
    consulta = Cliente.query
    if busqueda:
        patron = f"%{busqueda.strip()}%"
        consulta = consulta.filter(or_(Cliente.nombre.ilike(patron), Cliente.correo.ilike(patron)))
    clientes = consulta.order_by(Cliente.id.asc()).all()
    return [c.to_dict() for c in clientes], 200


def obtener_cliente(cliente_id):
    """READ: devuelve un solo cliente por su id."""
    cliente = db.session.get(Cliente, cliente_id)
    if not cliente:
        return {"mensaje": "Cliente no encontrado."}, 404
    return cliente.to_dict(), 200


def crear_cliente(data):
    """CREATE: registra un cliente nuevo."""
    errores, limpio = _validar(data)
    if errores:
        return {"mensaje": "Datos inválidos.", "errores": errores}, 400

    cliente = Cliente(**limpio)
    db.session.add(cliente)
    db.session.commit()
    return cliente.to_dict(), 201


def actualizar_cliente(cliente_id, data):
    """UPDATE: modifica un cliente existente."""
    cliente = db.session.get(Cliente, cliente_id)
    if not cliente:
        return {"mensaje": "Cliente no encontrado."}, 404

    errores, limpio = _validar(data, cliente_id=cliente_id)
    if errores:
        return {"mensaje": "Datos inválidos.", "errores": errores}, 400

    for campo, valor in limpio.items():
        setattr(cliente, campo, valor)
    db.session.commit()
    return cliente.to_dict(), 200


def eliminar_cliente(cliente_id):
    """DELETE: elimina un cliente."""
    cliente = db.session.get(Cliente, cliente_id)
    if not cliente:
        return {"mensaje": "Cliente no encontrado."}, 404

    db.session.delete(cliente)
    db.session.commit()
    return {"mensaje": "Cliente eliminado correctamente."}, 200
