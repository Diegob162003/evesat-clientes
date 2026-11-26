import { createFileRoute, redirect } from "@tanstack/react-router";

// En esta versión individual no hay vista de "Inicio":
// al entrar a /dashboard se redirige directamente al módulo de Clientes.
export const Route = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard/clientes" });
  },
});
