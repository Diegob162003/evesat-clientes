import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<{ correo?: string; password?: string }>({});
  const [showRecover, setShowRecover] = useState(false);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.88),rgba(0,0,0,0.96)),url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=70')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md rounded-xl border border-gold/30 bg-[#0d0d0d]/95 p-10 shadow-[0_25px_60px_-20px_rgba(212,175,106,0.35)] backdrop-blur">
        <Link to="/" className="mb-8 flex flex-col items-center gap-3">
          <Logo className="h-24 w-24" />
          <p className="serif text-2xl tracking-[0.35em] text-gold">EVESAT</p>
          <p className="text-[10px] tracking-[0.4em] text-beige/60">HAZLO SIMPLE · HAZLO IMPECABLE</p>
        </Link>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/dashboard" });
          }}
        >
          <div>
            <label className="text-[10px] tracking-[0.3em] text-beige/70">CORREO</label>
            <input
              type="email"
              required
              value={correo} //
              onChange={(e) => setCorreo(e.target.value)} // Esta linea guarda y actualiza el valor del correo cuando se ingrese uno nuevo
              className="mt-2 w-full rounded-sm border border-gold/25 bg-black/60 px-3 py-2.5 text-sm text-ivory outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.3em] text-beige/70">CONTRASEÑA</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                required
                defaultValue="demo1234"
                className="mt-2 w-full rounded-sm border border-gold/25 bg-black/60 px-3 py-2.5 pr-10 text-sm text-ivory outline-none focus:border-gold"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-2 top-1/2 mt-1 -translate-y-1/2 text-beige/60 hover:text-gold"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowRecover(true)}
              className="text-[10px] tracking-[0.2em] text-beige/60 hover:text-gold"
            >
              ¿OLVIDASTE TU CONTRASEÑA?
            </button>
          </div>
          <div className="flex items-center justify-between pt-2">
            <Link
              to="/"
              className="flex-1 rounded-sm border border-gold/30 py-2.5 text-center text-xs tracking-[0.3em] text-beige/70 hover:border-gold hover:text-gold"
            >
              CANCELAR
            </Link>
            <button
              type="submit"
              className="ml-3 flex-1 rounded-sm bg-gradient-to-b from-gold to-[#b8924d] py-2.5 text-xs tracking-[0.3em] text-ink hover:from-gold-soft"
            >
              INGRESAR
            </button>
          </div>
        </form>

        {showRecover && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
            <div className="w-full max-w-sm rounded-xl border border-gold/30 bg-[#0d0d0d] p-8">
              <h2 className="mb-2 text-center serif text-lg text-gold">RECUPERAR CONTRASEÑA</h2>
              <p className="mb-6 text-center text-xs text-beige/60">
                Ingresa tu correo y te enviaremos instrucciones
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowRecover(false);
                }}
              >
                <label className="text-[10px] tracking-[0.3em] text-beige/70">CORREO</label>
                <input
                  type="email"
                  required
                  className="mt-2 w-full rounded-sm border border-gold/25 bg-black/60 px-3 py-2.5 text-sm text-ivory outline-none focus:border-gold"
                />
                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowRecover(false)}
                    className="flex-1 rounded-sm border border-gold/30 py-2.5 text-center text-xs tracking-[0.3em] text-beige/70 hover:border-gold hover:text-gold"
                  >
                    CANCELAR
                  </button>
                  <button
                    type="submit"
                    className="ml-3 flex-1 rounded-sm bg-gradient-to-b from-gold to-[#b8924d] py-2.5 text-xs tracking-[0.3em] text-ink hover:from-gold-soft"
                  >
                    ENVIAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}