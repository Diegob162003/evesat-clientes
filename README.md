# EVESAT – Módulo de Clientes (entrega individual)

Versión individual del proyecto **EVESAT** (SENA – ADSO, ficha 3230984) con **solo el módulo de Clientes** y su **CRUD completo** conectado a base de datos.

**Autor del módulo:** Diego Fernando Buitrago Muñoz

| Parte | Tecnología |
|-------|------------|
| Frontend | React 19 + TypeScript + TanStack Router/Start + Tailwind (mismo diseño de EVESAT) |
| Backend | Python + Flask (arquitectura MVC) |
| Base de datos | MySQL (AMPPS en local) |

## Estructura

```
evesat-clientes/
├── frontend/                       # App React (landing, login, dashboard con Clientes)
│   └── src/
│       ├── routes/                 # Páginas: /, /login, /dashboard/clientes
│       ├── views/dashboard/ClientesView.tsx   # Vista del módulo (tabla + formularios)
│       └── lib/api/clientes.ts     # Servicio que llama a la API Flask
├── backend/                        # API REST en Flask (MVC)
│   ├── app.py                      # Punto de entrada
│   ├── config.py                   # Lee el .env
│   ├── database.py                 # Conexión SQLAlchemy
│   ├── models/cliente.py           # MODELO: tabla clientes
│   ├── controllers/cliente_controller.py  # CONTROLADOR: lógica y validaciones del CRUD
│   └── routes/cliente_routes.py    # RUTAS: endpoints /api/clientes
└── database/evesat_clientes.sql    # Script SQL para MySQL / phpMyAdmin
```

## API

| Método | URL | Acción |
|--------|-----|--------|
| GET | `/api/clientes` | Listar clientes |
| GET | `/api/clientes/<id>` | Ver un cliente |
| POST | `/api/clientes` | Crear cliente |
| PUT | `/api/clientes/<id>` | Actualizar cliente |
| DELETE | `/api/clientes/<id>` | Eliminar cliente |
| GET | `/api/health` | Verificar que el backend está arriba |

Validaciones en el backend: nombre obligatorio, correo obligatorio, con formato válido y **sin repetir**, teléfono con formato válido y estado `Activo`/`Inactivo`.

## Cómo correrlo en local

### 1. Base de datos (AMPPS)
1. Abre AMPPS y enciende **Apache** y **MySQL**.
2. Entra a phpMyAdmin (`http://localhost/phpmyadmin`) → pestaña **Importar** → selecciona `database/evesat_clientes.sql` → **Continuar**.
   *(Opcional: si no importas el script, el backend crea la tabla solo; pero la base `evesat_clientes` sí debe existir.)*

### 2. Backend
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
copy .env.example .env      # en Mac/Linux: cp .env.example .env
python app.py
```
Queda en `http://localhost:5000` (prueba `http://localhost:5000/api/clientes`).

### 3. Frontend
```bash
cd frontend
copy .env.example .env      # en Mac/Linux: cp .env.example .env
npm install                 # o: bun install
npm run dev                 # o: bun run dev
```
Abre `http://localhost:8080` → **Iniciar sesión** → **Ingresar** → módulo **Clientes**.

> El login por ahora deja entrar sin validar (las validaciones del login se harán más adelante).
