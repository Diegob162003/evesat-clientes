import { createFileRoute, useNavigate, useRouterState, Link, Outlet } from "@tanstack/react-router";
import { Bell, LogOut, UserSquare2 } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

// Versión individual: solo se muestra el módulo de Clientes (Diego Buitrago)
const modules = [{ to: "/dashboard/clientes", label: "Clientes", icon: UserSquare2 }] as const;

function Dashboard() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentLabel = modules.find((m) => m.to === pathname)?.label ?? "Clientes";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-ink/95 md:flex md:flex-col">
        <Link to="/" className="flex items-center gap-3 border-b border-gold/20 px-5 py-5">
          <Logo className="h-10 w-10" />
          <div className="leading-tight">
            <p className="serif text-lg tracking-[0.3em] text-gold">EVESAT</p>
            <p className="text-[9px] tracking-[0.25em] text-beige/50">HAZLO IMPECABLE</p>
          </div>
        </Link>
        <nav className="flex-1 overflow-y-auto py-4">
          {modules.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="flex w-full items-center gap-3 px-6 py-2.5 text-left text-sm text-beige/70 transition hover:bg-secondary/50 hover:text-gold"
              activeProps={{ className: "bg-secondary text-gold border-l-2 border-gold" }}
            >
              <m.icon className="h-4 w-4" />
              {m.label}
            </Link>
          ))}
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-4 flex w-full items-center gap-3 border-t border-border px-6 py-3 text-left text-sm text-beige/70 hover:bg-secondary/50 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" /> Cerrar Sesión
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
          <div>
            <h1 className="serif text-xl text-gold">{currentLabel}</h1>
            <p className="text-xs text-beige/60">Panel administrativo EVESAT</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-beige/80 hover:text-gold">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                3
              </span>
            </button>
            <div className="hidden text-right md:block">
              <p className="text-sm text-beige">Andrea Martínez</p>
              <p className="text-xs text-gold/80">Coordinadora</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-secondary text-sm text-gold">
              A
            </div>
            <button
              onClick={() => navigate({ to: "/" })}
              className="rounded border border-gold/50 px-3 py-1.5 text-xs tracking-wide text-gold hover:bg-gold hover:text-ink"
            >
              Salir
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
