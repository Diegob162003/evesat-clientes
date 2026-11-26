import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { StatCard } from "@/components/dashboard/StatCard";
import { Toolbar } from "@/components/dashboard/Toolbar";
import { ActionIcons } from "@/components/dashboard/ActionIcons";
import { Badge } from "@/components/dashboard/Badge";
import { clientesApi, ApiError, type ClienteApi, type ErroresCampos } from "@/lib/api/clientes";

type Cliente = {
  id: number;
  n: string;
  e: string;
  t: string;
  ev: number;
  s: "Activo" | "Inactivo";
  f: string | null;
};
type ClienteForm = {
  nombre: string;
  correo: string;
  telefono: string;
  estado: "Activo" | "Inactivo";
};

// Convierte el cliente que llega del backend al formato corto que usa la tabla
function toCliente(c: ClienteApi): Cliente {
  return {
    id: c.id,
    n: c.nombre,
    e: c.correo,
    t: c.telefono,
    ev: c.eventos,
    s: c.estado,
    f: c.fecha_registro,
  };
}

// Cuenta los clientes registrados en el mes actual
function nuevosEsteMes(lista: Cliente[]) {
  const hoy = new Date();
  return lista.filter((c) => {
    if (!c.f) return false;
    const d = new Date(c.f);
    return d.getMonth() === hoy.getMonth() && d.getFullYear() === hoy.getFullYear();
  }).length;
}

export function ClientesView() {
  // READ: los clientes ahora vienen de la base de datos (backend Flask)
  const [cli, setCli] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ClienteForm>({
    nombre: "",
    correo: "",
    telefono: "",
    estado: "Activo",
  });
  const [errors, setErrors] = useState<ErroresCampos>({});
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Cliente | null>(null);
  const [viewTarget, setViewTarget] = useState<Cliente | null>(null);

  async function cargarClientes() {
    setCargando(true);
    setErrorCarga(null);
    try {
      const data = await clientesApi.listar();
      setCli(data.map(toCliente));
    } catch (err) {
      setErrorCarga(err instanceof ApiError ? err.message : "No se pudieron cargar los clientes.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarClientes();
  }, []);

  function runSearch() {
    setAppliedQuery(query.trim().toLowerCase());
  }

  const clientesFiltrados = cli.filter((c) => {
    if (!appliedQuery) return true;
    return c.n.toLowerCase().includes(appliedQuery) || c.e.toLowerCase().includes(appliedQuery);
  });

  function openForm() {
    setEditingId(null);
    setForm({ nombre: "", correo: "", telefono: "", estado: "Activo" });
    setErrors({});
    setOpen(true);
  }

  function openEditForm(c: Cliente) {
    setEditingId(c.id);
    setForm({ nombre: c.n, correo: c.e, telefono: c.t, estado: c.s });
    setErrors({});
    setOpen(true);
  }

  function updateForm(field: keyof ClienteForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const next: ErroresCampos = {};
    if (!form.nombre.trim()) next.nombre = "El nombre es obligatorio.";
    if (!form.correo.trim()) {
      next.correo = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      next.correo = "Ingresa un correo válido.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  // CREATE / UPDATE: envía el formulario al backend
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || guardando) return;

    setGuardando(true);
    try {
      if (editingId !== null) {
        // Modo edición: actualiza el cliente existente
        const actualizado = toCliente(await clientesApi.actualizar(editingId, form));
        setCli((prev) => prev.map((c) => (c.id === editingId ? actualizado : c)));
      } else {
        // Modo creación
        const nuevo = toCliente(await clientesApi.crear(form));
        setCli((prev) => [...prev, nuevo]);
      }
      setOpen(false);
      setEditingId(null);
    } catch (err) {
      if (err instanceof ApiError && Object.keys(err.errores).length > 0) {
        // Errores de validación que devuelve el backend (ej: correo repetido)
        setErrors(err.errores);
      } else {
        setErrors({
          nombre: err instanceof Error ? err.message : "No se pudo guardar el cliente.",
        });
      }
    } finally {
      setGuardando(false);
    }
  }

  // DELETE: elimina el cliente en el backend
  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await clientesApi.eliminar(deleteTarget.id);
      setCli((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    } catch (err) {
      setErrorCarga(err instanceof Error ? err.message : "No se pudo eliminar el cliente.");
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total clientes" value={cli.length} />
        <StatCard label="Activos" value={cli.filter((c) => c.s === "Activo").length} />
        <StatCard label="Nuevos este mes" value={nuevosEsteMes(cli)} />
      </div>
      <div className="rounded-lg border border-border bg-card p-6">
        <Toolbar
          placeholder="Buscar cliente..."
          button="Agregar Cliente"
          onButtonClick={openForm}
          searchValue={query}
          onSearchChange={setQuery}
          onSearch={runSearch}
        />
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-beige/60">
            <tr className="border-b border-border">
              <th className="py-2">Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Eventos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-beige/90">
            {clientesFiltrados.map((c) => (
              <tr key={c.id} className="border-b border-border/50">
                <td className="py-3">{c.n}</td>
                <td className="text-beige/70">{c.e}</td>
                <td>{c.t || "—"}</td>
                <td>{c.ev}</td>
                <td>
                  <Badge tone={c.s === "Activo" ? "ok" : "bad"}>{c.s}</Badge>
                </td>
                <td>
                  <ActionIcons
                    onView={() => setViewTarget(c)}
                    onEdit={() => openEditForm(c)}
                    onDelete={() => setDeleteTarget(c)}
                  />
                </td>
              </tr>
            ))}
            {(cargando || errorCarga || clientesFiltrados.length === 0) && (
              <tr>
                <td
                  colSpan={6}
                  className={`py-6 text-center ${errorCarga ? "text-destructive" : "text-beige/50"}`}
                >
                  {cargando
                    ? "Cargando clientes..."
                    : (errorCarga ?? "No hay clientes para mostrar.")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-gold/30 bg-[#0d0d0d] text-beige">
          <DialogHeader>
            <DialogTitle className="serif text-gold">
              {editingId !== null ? "Editar Cliente" : "Agregar Cliente"}
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="text-[10px] tracking-[0.3em] text-beige/70">NOMBRE</label>
              <input
                value={form.nombre}
                onChange={(e) => updateForm("nombre", e.target.value)}
                className={`mt-1 w-full rounded-sm border bg-black/60 px-3 py-2 text-sm text-ivory outline-none ${errors.nombre ? "border-destructive" : "border-gold/25 focus:border-gold"}`}
              />
              {errors.nombre && <p className="mt-1 text-xs text-destructive">{errors.nombre}</p>}
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] text-beige/70">CORREO</label>
              <input
                type="email"
                value={form.correo}
                onChange={(e) => updateForm("correo", e.target.value)}
                className={`mt-1 w-full rounded-sm border bg-black/60 px-3 py-2 text-sm text-ivory outline-none ${errors.correo ? "border-destructive" : "border-gold/25 focus:border-gold"}`}
              />
              {errors.correo && <p className="mt-1 text-xs text-destructive">{errors.correo}</p>}
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] text-beige/70">TELÉFONO</label>
              <input
                value={form.telefono}
                onChange={(e) => updateForm("telefono", e.target.value)}
                placeholder="+57 300 000 0000"
                className={`mt-1 w-full rounded-sm border bg-black/60 px-3 py-2 text-sm text-ivory outline-none ${errors.telefono ? "border-destructive" : "border-gold/25 focus:border-gold"}`}
              />
              {errors.telefono && (
                <p className="mt-1 text-xs text-destructive">{errors.telefono}</p>
              )}
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] text-beige/70">ESTADO</label>
              <select
                value={form.estado}
                onChange={(e) => updateForm("estado", e.target.value as "Activo" | "Inactivo")}
                className="mt-1 w-full rounded-sm border border-gold/25 bg-black/60 px-3 py-2 text-sm text-ivory outline-none focus:border-gold"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-sm border border-gold/30 py-2.5 text-xs tracking-[0.2em] text-beige/70 hover:border-gold hover:text-gold"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                disabled={guardando}
                className="flex-1 disabled:opacity-60 rounded-sm bg-gradient-to-b from-gold to-[#b8924d] py-2.5 text-xs tracking-[0.2em] text-ink hover:from-gold-soft"
              >
                {guardando ? "GUARDANDO..." : editingId !== null ? "GUARDAR CAMBIOS" : "GUARDAR"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de detalle (icono del ojo) */}
      <Dialog open={!!viewTarget} onOpenChange={(o) => !o && setViewTarget(null)}>
        <DialogContent className="border-gold/30 bg-[#0d0d0d] text-beige">
          <DialogHeader>
            <DialogTitle className="serif text-gold">Detalle del cliente</DialogTitle>
          </DialogHeader>
          {viewTarget && (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-beige/50">NOMBRE</p>
                <p className="text-beige/90">{viewTarget.n}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-beige/50">CORREO</p>
                <p className="text-beige/90">{viewTarget.e}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-beige/50">TELÉFONO</p>
                <p className="text-beige/90">{viewTarget.t || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-beige/50">EVENTOS</p>
                <p className="text-beige/90">{viewTarget.ev}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-beige/50">ESTADO</p>
                <Badge tone={viewTarget.s === "Activo" ? "ok" : "bad"}>{viewTarget.s}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmación de eliminación */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent className="border-gold/30 bg-[#0d0d0d] text-beige">
          <AlertDialogHeader>
            <AlertDialogTitle className="serif text-gold">¿Eliminar cliente?</AlertDialogTitle>
            <AlertDialogDescription className="text-beige/60">
              Esta acción no se puede deshacer. Se eliminará a{" "}
              <span className="text-beige/90">{deleteTarget?.n}</span> de la lista de clientes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-gold/30 bg-transparent text-beige/70 hover:bg-transparent hover:text-gold">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
