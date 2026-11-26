// Servicio que se comunica con el backend Flask (API REST de clientes).
// La URL del backend se toma de la variable VITE_API_URL (archivo .env del frontend).
const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:5000").replace(/\/$/, "");

export type EstadoCliente = "Activo" | "Inactivo";

// Así llega un cliente desde el backend
export type ClienteApi = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  eventos: number;
  estado: EstadoCliente;
  fecha_registro: string | null;
};

// Lo que se envía al crear/editar
export type ClientePayload = {
  nombre: string;
  correo: string;
  telefono: string;
  estado: EstadoCliente;
};

export type ErroresCampos = Partial<Record<keyof ClientePayload, string>>;

// Error que trae el mensaje del backend y, si aplica, los errores por campo
export class ApiError extends Error {
  status: number;
  errores: ErroresCampos;
  constructor(status: number, mensaje: string, errores: ErroresCampos = {}) {
    super(mensaje);
    this.status = status;
    this.errores = errores;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    });
  } catch {
    throw new ApiError(0, "No se pudo conectar con el servidor.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, data.mensaje ?? "Ocurrió un error.", data.errores ?? {});
  }
  return data as T;
}

export const clientesApi = {
  listar: () => request<ClienteApi[]>("/api/clientes"),
  crear: (payload: ClientePayload) =>
    request<ClienteApi>("/api/clientes", { method: "POST", body: JSON.stringify(payload) }),
  actualizar: (id: number, payload: ClientePayload) =>
    request<ClienteApi>(`/api/clientes/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  eliminar: (id: number) =>
    request<{ mensaje: string }>(`/api/clientes/${id}`, { method: "DELETE" }),
};
