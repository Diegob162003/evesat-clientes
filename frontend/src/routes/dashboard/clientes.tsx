import { createFileRoute } from "@tanstack/react-router";
import { ClientesView } from "@/views/dashboard/ClientesView";

export const Route = createFileRoute("/dashboard/clientes")({
  component: ClientesView,
});