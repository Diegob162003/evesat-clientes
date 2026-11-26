import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, Package, Camera, Music2, Sofa, Bell, BarChart3, ShieldCheck, ClipboardList, ChevronLeft, ChevronRight, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: Landing,
});

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const carousel = [
  { name: "Bodas", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=75", text: "Celebraciones que perduran toda la vida" },
  { name: "Eventos Corporativos", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=75", text: "Imagen, prestigio y profesionalismo" },
  { name: "Baby Shower", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=75", text: "Bienvenidas tiernas y memorables" },
  { name: "Revelación de Género", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1600&q=75", text: "Momentos llenos de emoción" },
  { name: "Quince Años", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=75", text: "El sueño dorado de toda quinceañera" },
  { name: "Grados", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&q=75", text: "Celebra los logros que abren caminos" },
];

const servicios = [
  { icon: Music2, name: "Sonido e Iluminación", desc: "Sistemas profesionales para eventos memorables." },
  { icon: Sofa, name: "Mobiliario y Montaje", desc: "Diseños elegantes adaptados a tu evento." },
  { icon: Camera, name: "Fotografía y Video", desc: "Capturamos cada instante con calidad cinematográfica." },
];

const beneficios = [
  { icon: ClipboardList, title: "Cotiza tus eventos en línea", desc: "Solicita y recibe propuestas en minutos." },
  { icon: Package, title: "Controla tu inventario", desc: "Disponibilidad y reservas en tiempo real." },
  { icon: Bell, title: "Notificaciones inteligentes", desc: "Sigue cada cotización de principio a fin." },
  { icon: BarChart3, title: "Análisis y reportes", desc: "Decisiones basadas en datos confiables." },
  { icon: ShieldCheck, title: "Usuarios y roles", desc: "Gestión segura del equipo y permisos." },
  { icon: Calendar, title: "Agenda de eventos", desc: "Coordina cada detalle sin perder el ritmo." },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-black/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-11 w-11" />
          <div className="hidden sm:block leading-tight">
            <p className="serif text-lg tracking-[0.3em] text-gold">EVESAT</p>
            <p className="text-[10px] tracking-[0.25em] text-beige/60">HAZLO SIMPLE · HAZLO IMPECABLE</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((n) => (
            <a key={n.label} href={n.href} className="text-sm tracking-[0.15em] text-beige/80 transition hover:text-gold">
              {n.label}
            </a>
          ))}
          <Link to="/login" className="rounded-sm border border-gold/60 bg-gradient-to-b from-gold/10 to-transparent px-5 py-2 text-xs tracking-[0.25em] text-gold transition hover:bg-gold hover:text-ink">
            INICIAR SESIÓN
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="mt-20 border-t border-gold/20 bg-[#0a0a0a]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <Logo className="h-16 w-16" />
          <p className="serif mt-3 text-xl tracking-[0.25em] text-gold">EVESAT</p>
          <p className="mt-1 text-xs tracking-widest text-beige/60">HAZLO SIMPLE. HAZLO IMPECABLE.</p>
        </div>
        <div>
          <h4 className="serif mb-3 text-sm tracking-[0.2em] text-gold">CONTACTO</h4>
          <ul className="space-y-2 text-sm text-beige/70">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> contacto@evesat.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +57 300 000 0000</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Bogotá, Colombia</li>
          </ul>
        </div>
        <div>
          <h4 className="serif mb-3 text-sm tracking-[0.2em] text-gold">NAVEGACIÓN</h4>
          <ul className="space-y-2 text-sm text-beige/70">
            {navItems.map((n) => <li key={n.label}><a href={n.href} className="hover:text-gold">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="serif mb-3 text-sm tracking-[0.2em] text-gold">SÍGUENOS</h4>
          <div className="flex gap-3">
            <a href="#" className="rounded-full border border-gold/40 p-2 text-gold hover:bg-gold hover:text-ink"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="rounded-full border border-gold/40 p-2 text-gold hover:bg-gold hover:text-ink"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/15 py-4 text-center text-xs tracking-widest text-beige/50">
        © {new Date().getFullYear()} EVESAT · Todos los derechos reservados
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CarouselSection />
      <ServiciosSection />
      <BeneficiosSection />
      <NosotrosSection />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1800&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center md:py-32">
        <Logo className="h-28 w-28 drop-shadow-[0_0_25px_rgba(212,175,106,0.35)]" />
        <h1 className="serif mt-6 text-6xl tracking-[0.35em] text-gold md:text-7xl">EVESAT</h1>
        <div className="mt-3 flex items-center gap-3 text-gold/70">
          <span className="h-px w-12 bg-gold/50" />
          <p className="serif text-sm tracking-[0.45em]">HAZLO SIMPLE · HAZLO IMPECABLE</p>
          <span className="h-px w-12 bg-gold/50" />
        </div>
        <p className="serif mt-6 max-w-2xl text-lg text-beige/85 italic">
          Sistema integral de cotización y gestión de eventos. Convertimos cada celebración en una experiencia inolvidable, con la elegancia y precisión que tu marca merece.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#contacto" className="rounded-sm bg-gradient-to-b from-gold to-[#b8924d] px-8 py-3 text-xs font-medium tracking-[0.3em] text-ink shadow-[0_8px_30px_-10px_rgba(212,175,106,0.6)] transition hover:from-gold-soft hover:to-gold">
            SOLICITAR COTIZACIÓN
          </a>
          <a href="#servicios" className="rounded-sm border border-gold/60 px-8 py-3 text-xs tracking-[0.3em] text-gold transition hover:bg-gold/10">
            CONOCER SERVICIOS
          </a>
        </div>
      </div>
    </section>
  );
}

function CarouselSection() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % carousel.length), 5000);
    return () => clearInterval(t);
  }, []);
  const next = () => setI((v) => (v + 1) % carousel.length);
  const prev = () => setI((v) => (v - 1 + carousel.length) % carousel.length);
  const slide = carousel[i];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 text-center">
        <p className="text-xs tracking-[0.4em] text-gold/70">EVENTOS QUE DEJAN HUELLA</p>
        <h2 className="serif mt-2 text-4xl text-gold">Momentos inolvidables</h2>
      </div>
      <div className="relative overflow-hidden rounded-lg border border-gold/30">
        <div className="relative aspect-[21/9]">
          <img src={slide.img} alt={slide.name} className="h-full w-full object-cover transition-opacity duration-700" key={slide.img} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-10 left-10 max-w-md">
            <p className="text-xs tracking-[0.3em] text-gold/80">{String(i + 1).padStart(2, "0")} / {String(carousel.length).padStart(2, "0")}</p>
            <h3 className="serif mt-2 text-4xl text-ivory">{slide.name}</h3>
            <p className="serif mt-2 text-lg italic text-beige/85">{slide.text}</p>
          </div>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-gold/40 bg-black/40 p-2 text-gold backdrop-blur hover:bg-gold hover:text-ink">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-gold/40 bg-black/40 p-2 text-gold backdrop-blur hover:bg-gold hover:text-ink">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center gap-2 bg-black/80 py-4">
          {carousel.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1 transition-all ${idx === i ? "w-10 bg-gold" : "w-4 bg-gold/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiciosSection() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="text-xs tracking-[0.4em] text-gold/70">LO QUE OFRECEMOS</p>
        <h2 className="serif mt-2 text-4xl text-gold">Servicios destacados</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {servicios.map((s) => (
          <div key={s.name} className="group rounded-lg border border-gold/20 bg-gradient-to-b from-[#141414] to-black p-8 text-center transition hover:border-gold/60 hover:shadow-[0_15px_40px_-15px_rgba(212,175,106,0.4)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-gold transition group-hover:bg-gold group-hover:text-ink">
              <s.icon className="h-7 w-7" />
            </div>
            <h3 className="serif mt-5 text-2xl text-ivory">{s.name}</h3>
            <p className="serif mt-3 text-base text-beige/70 italic">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BeneficiosSection() {
  return (
    <section id="nosotros" className="bg-[#0a0a0a] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.4em] text-gold/70">POR QUÉ EVESAT</p>
          <h2 className="serif mt-2 text-4xl text-gold">Una plataforma diseñada para crecer contigo</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {beneficios.map((b) => (
            <div key={b.title} className="flex gap-4 rounded-lg border border-gold/15 bg-black/60 p-6 transition hover:border-gold/50">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gold/40 bg-gold/5 text-gold">
                <b.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="serif text-lg text-ivory">{b.title}</h4>
                <p className="mt-1 text-sm text-beige/65">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NosotrosSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 text-center">
      <p className="text-xs tracking-[0.4em] text-gold/70">NUESTRA ESENCIA</p>
      <h2 className="serif mt-2 text-4xl text-gold">Elegancia que se siente, precisión que se nota</h2>
      <p className="serif mx-auto mt-6 max-w-3xl text-lg italic text-beige/80">
        En EVESAT creemos que cada evento merece atención impecable. Nuestra plataforma integra cotizaciones, inventario, clientes y reportes en una sola experiencia, para que tu equipo se enfoque en lo verdaderamente importante: crear momentos extraordinarios.
      </p>
      <div className="mt-10 flex justify-center">
        <Link to="/login" className="rounded-sm bg-gradient-to-b from-gold to-[#b8924d] px-10 py-3 text-xs tracking-[0.3em] text-ink hover:from-gold-soft">
          ACCEDER A LA PLATAFORMA
        </Link>
      </div>
    </section>
  );
}
