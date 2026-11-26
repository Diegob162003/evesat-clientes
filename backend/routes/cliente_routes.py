"""RUTAS: define los endpoints de la API de clientes y llama al controlador.

| Método | URL                   | Acción                 |
|--------|-----------------------|------------------------|
| GET    | /api/clientes         | Listar (con ?q=texto)  |
| GET    | /api/clientes/<id>    | Ver detalle            |
| POST   | /api/clientes         | Crear                  |
| PUT    | /api/clientes/<id>    | Actualizar             |
| DELETE | /api/clientes/<id>    | Eliminar               |
"""
from flask import Blueprint, jsonify, request

from controllers import cliente_controller as controller

clientes_bp = Blueprint("clientes", __name__, url_prefix="/api/clientes")


@clientes_bp.get("")
def listar():
    datos, codigo = controller.listar_clientes(request.args.get("q"))
    return jsonify(datos), codigo


@clientes_bp.get("/<int:cliente_id>")
def detalle(cliente_id):
    datos, codigo = controller.obtener_cliente(cliente_id)
    return jsonify(datos), codigo


@clientes_bp.post("")
def crear():
    datos, codigo = controller.crear_cliente(request.get_json(silent=True) or {})
    return jsonify(datos), codigo


@clientes_bp.put("/<int:cliente_id>")
def actualizar(cliente_id):
    datos, codigo = controller.actualizar_cliente(cliente_id, request.get_json(silent=True) or {})
    return jsonify(datos), codigo


@clientes_bp.delete("/<int:cliente_id>")
def eliminar(cliente_id):
    datos, codigo = controller.eliminar_cliente(cliente_id)
    return jsonify(datos), codigo
