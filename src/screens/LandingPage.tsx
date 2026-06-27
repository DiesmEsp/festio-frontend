import {
  Sparkles,
  Zap,
  CalendarCheck,
  Shield,
  ArrowRight,
  Wand2,
  Building2,
  TrendingUp,
  Users,
  Headphones,
  Star,
  Menu,
  X,
  ChevronRight,
  Send,
  MessageCircle,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type LandingPageProps = {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onCTAClick?: () => void;
  onProviderRegisterClick?: () => void;
};

export function LandingPage({
  onLoginClick,
  onRegisterClick,
  onCTAClick,
  onProviderRegisterClick,
}: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-2xl border-b border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 select-none cursor-pointer transition-transform hover:scale-105 active:scale-95"
            aria-label="Festio - Inicio"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#6D28D9] text-white shadow-lg shadow-purple-500/25">
              <Sparkles size={18} />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Festio
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 text-slate-700 hover:text-[#6D28D9] hover:bg-purple-50 transition-colors"
              onClick={onLoginClick}
            >
              Iniciar sesión
            </button>
            <Button
              className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              onClick={onRegisterClick}
            >
              Registrarse
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen ? (
          <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3 md:hidden">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 text-slate-700 hover:text-[#6D28D9] hover:bg-purple-50 transition-colors"
                onClick={onLoginClick}
              >
                Iniciar sesión
              </button>
              <Button
                className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white justify-start"
                onClick={onRegisterClick}
              >
                Registrarse
              </Button>
            </div>
          </div>
        ) : null}
      </header>

      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* 1. Textura de puntos (Dot Grid) */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Animaciones CSS inyectadas para los globos abstractos */}
        <style>
          {`
            @keyframes float-up {
              0% { transform: translateY(0) translateX(0) rotate(-10deg); opacity: 0; }
              10% { opacity: 0.9; }
              90% { opacity: 0.9; }
              100% { transform: translateY(-100vh) translateX(60px) rotate(20deg); opacity: 0; }
            }
            .balloon-1 { animation: float-up 15s linear infinite; }
            .balloon-2 { animation: float-up 18s linear infinite 3s; }
            .balloon-3 { animation: float-up 14s linear infinite 6s; }
            .balloon-4 { animation: float-up 20s linear infinite 9s; }
            .balloon-5 { animation: float-up 16s linear infinite 12s; }
            .balloon-6 { animation: float-up 19s linear infinite 2s; }
            .balloon-7 { animation: float-up 22s linear infinite 7s; }
            .balloon-8 { animation: float-up 17s linear infinite 14s; }
          `}
        </style>

        {/* 2. Globos flotantes (Abstractos y vibrantes en Glassmorphism) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Globo 1 */}
          <div className="balloon-1 absolute -bottom-[30%] left-[10%] h-40 w-32 rounded-[45%] bg-gradient-to-tr from-purple-500/60 to-purple-300/60 backdrop-blur-md border border-white/50 shadow-xl shadow-purple-500/20" />
          {/* Globo 2 */}
          <div className="balloon-2 absolute -bottom-[40%] left-[85%] h-52 w-40 rounded-[45%] bg-gradient-to-tr from-[#8B5CF6]/70 to-purple-400/60 backdrop-blur-md border border-white/50 shadow-xl shadow-purple-500/20" />
          {/* Globo 3 */}
          <div className="balloon-3 absolute -bottom-[20%] left-[45%] h-32 w-24 rounded-[45%] bg-gradient-to-tr from-fuchsia-400/60 to-purple-300/60 backdrop-blur-md border border-white/50 shadow-xl shadow-fuchsia-500/20" />
          {/* Globo 4 */}
          <div className="balloon-4 absolute -bottom-[35%] left-[65%] h-48 w-36 rounded-[45%] bg-gradient-to-tr from-[#6D28D9]/60 to-purple-500/50 backdrop-blur-md border border-white/40 shadow-xl shadow-purple-500/20" />
          {/* Globo 5 */}
          <div className="balloon-5 absolute -bottom-[25%] left-[25%] h-24 w-20 rounded-[45%] bg-gradient-to-tr from-purple-500/70 to-purple-300/60 backdrop-blur-md border border-white/50 shadow-xl shadow-purple-500/20" />
          {/* Globo 6 (Nuevo) */}
          <div className="balloon-6 absolute -bottom-[30%] left-[5%] h-36 w-28 rounded-[45%] bg-gradient-to-tr from-fuchsia-500/60 to-pink-300/50 backdrop-blur-md border border-white/50 shadow-xl shadow-pink-500/20" />
          {/* Globo 7 (Nuevo) */}
          <div className="balloon-7 absolute -bottom-[45%] left-[55%] h-44 w-32 rounded-[45%] bg-gradient-to-tr from-violet-500/60 to-purple-300/60 backdrop-blur-md border border-white/50 shadow-xl shadow-violet-500/20" />
          {/* Globo 8 (Nuevo) */}
          <div className="balloon-8 absolute -bottom-[20%] left-[75%] h-28 w-24 rounded-[45%] bg-gradient-to-tr from-purple-400/70 to-fuchsia-300/60 backdrop-blur-md border border-white/50 shadow-xl shadow-purple-500/20" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-6 text-center sm:px-6 sm:pt-8 lg:px-8">
          {/* Badge */}
          <div className="mb-6 flex justify-center">
            <Badge
              variant="secondary"
              className="gap-2 rounded-full border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-semibold text-[#6D28D9]"
            >
              <Sparkles size={14} />
              Plataforma Inteligente de Eventos
            </Badge>
          </div>

          {/* Heading */}
          <div className="flex w-full justify-center">
            <h1 className="max-w-4xl text-center text-4xl font-extrabold tracking-tight leading-tight text-slate-900 sm:text-5xl">
              Tu evento ideal,
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] bg-clip-text text-transparent">
                diseñado de forma inteligente
              </span>
              <br className="hidden sm:block" />
              y sin estrés.
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mt-6 flex w-full justify-center">
            <p className="max-w-2xl text-center text-lg leading-relaxed text-slate-500 sm:text-xl">
              Cuéntale a Festio qué tipo de evento necesitas y nuestra IA
              <br className="hidden sm:block" />
              buscará las mejores opciones con disponibilidad en tiempo real.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-[#6D28D9] px-8 text-base font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:bg-[#5B21B6] hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5"
              onClick={onCTAClick}
            >
              <Wand2 size={18} />
              Planear mi evento ahora
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              +500 eventos realizados
            </span>
            <span className="hidden h-4 w-px bg-slate-200 sm:block" />
            <span className="flex items-center gap-1.5">
              <Users size={14} />
              +200 proveedores verificados
            </span>
            <span className="hidden h-4 w-px bg-slate-200 sm:block" />
            <span className="flex items-center gap-1.5">
              <Headphones size={14} />
              Soporte 24/7
            </span>
          </div>
        </div>
      </section>

      {/* ── Benefits Section (B2C) ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/50 to-white px-4 py-24 sm:px-6 lg:px-8">
        {/* Línea divisoria elegante con brillo (Glow Line) */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-80" />
        <div className="absolute top-0 inset-x-1/4 h-[3px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 blur-[2px]" />

        {/* Conexión visual: Puntos */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-40" />

        {/* Iluminación de fondo (Aura Lila) */}
        {/* Luz central trasera (NUEVA) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-purple-200/30 blur-[150px] pointer-events-none" />

        {/* Luces laterales (Existentes) */}
        <div className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[120px] pointer-events-none" />
        <div className="absolute -right-32 bottom-10 h-[400px] w-[400px] rounded-full bg-fuchsia-50/50 blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          {/* Badge alineado a la izquierda */}
          <div className="flex justify-start mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-semibold text-[#6D28D9]">
              <Users size={16} />
              <span>Para Clientes</span>
            </div>
          </div>
          {/* Título centrado */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              ¿Por qué organizar tu evento con{" "}
              <span className="bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] bg-clip-text text-transparent">
                Festio?
              </span>
            </h2>
          </div>

          {/* Cards grid */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Cotización Instantánea */}
            <div className="group relative flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-2 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              <span className="relative grid size-14 place-items-center rounded-2xl bg-purple-50 text-[#6D28D9] transition-transform duration-300 group-hover:scale-110 group-hover:bg-purple-100">
                <Zap size={26} />
              </span>
              <div className="relative">
                <h3 className="text-xl font-bold text-slate-900">
                  Cotización Instantánea
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-500">
                  Olvídate de esperar días por un presupuesto. Recibe opciones reales al instante.
                </p>
              </div>
            </div>

            {/* Card 2: Disponibilidad Real */}
            <div className="group relative flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-2 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              <span className="relative grid size-14 place-items-center rounded-2xl bg-purple-50 text-[#6D28D9] transition-transform duration-300 group-hover:scale-110 group-hover:bg-purple-100">
                <CalendarCheck size={26} />
              </span>
              <div className="relative">
                <h3 className="text-xl font-bold text-slate-900">
                  Disponibilidad Real
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-500">
                  Bloqueamos el inventario temporalmente para garantizar tu reserva.
                </p>
              </div>
            </div>

            {/* Card 3: Pago Seguro */}
            <div className="group relative flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-2 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              <span className="relative grid size-14 place-items-center rounded-2xl bg-purple-50 text-[#6D28D9] transition-transform duration-300 group-hover:scale-110 group-hover:bg-purple-100">
                <Shield size={26} />
              </span>
              <div className="relative">
                <h3 className="text-xl font-bold text-slate-900">
                  Pago 100% Seguro
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-500">
                  Transacciones verificadas y garantías de cumplimiento del servicio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Section (Carrusel Infinito) ────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/50 to-white px-4 py-24 sm:px-6 lg:px-8">
        {/* Línea divisoria elegante (Glow Line) */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-80" />
        <div className="absolute top-0 inset-x-1/4 h-[3px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 blur-[2px]" />

        {/* Conexión visual: Puntos */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-40" />

        {/* Iluminación de fondo (Aura Lila) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-purple-200/30 blur-[150px] pointer-events-none" />
        <div className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[120px] pointer-events-none" />
        <div className="absolute -right-32 bottom-10 h-[400px] w-[400px] rounded-full bg-fuchsia-50/50 blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          {/* Cabecera (Badge y Título) */}
          <div className="flex justify-start mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-semibold text-[#6D28D9]">
              <MessageCircle size={16} />
              <span>Comentarios</span>
            </div>
          </div>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Lo que dicen de <span className="text-[#6D28D9]">Festio</span>
            </h2>
          </div>

          {/* Animación inyectada para el carrusel continuo */}
          <style>
            {`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 40s linear infinite;
                display: flex;
                width: max-content;
              }
              .animate-marquee:hover {
                animation-play-state: paused;
              }
            `}
          </style>

          {/* Contenedor del carrusel con máscara de bordes desvanecidos */}
          <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
            <div className="animate-marquee gap-6 pb-8 pt-4">
              {/* Renderizamos la lista de comentarios duplicada para el efecto infinito continuo */}
              {[
                { id: 1, name: "Lucía M.", role: "Boda de 150 personas", initial: "LM", text: "Increíble. Conseguí catering y DJ en la misma tarde. La plataforma es súper intuitiva, aunque me gustaría ver más opciones de decoración vintage." },
                { id: 2, name: "Carlos R.", role: "Evento Corporativo", initial: "CR", text: "Nos salvó la cena de fin de año de la empresa. El sistema de pago es muy seguro, lo cual era un requisito estricto de nuestra área de finanzas." },
                { id: 3, name: "Sofía T.", role: "Fiesta Infantil", initial: "ST", text: "¡Muy buena idea! Todo súper rápido. Solamente tuve un pequeño retraso de un proveedor en responder, pero el soporte de Festio me ayudó al instante." },
                { id: 4, name: "Diego V.", role: "Aniversario", initial: "DV", text: "La IA de verdad entiende lo que pides. Puse mi presupuesto y me armó un paquete exacto sin costos ocultos. Totalmente recomendados para evitar estrés." },
                { id: 5, name: "Andrea C.", role: "Lanzamiento de Marca", initial: "AC", text: "Los proveedores están muy bien filtrados. Todos los que contactamos tenían disponibilidad real, algo que siempre es un dolor de cabeza fuera de aquí." },
                /* ---- Duplicado exacto para el loop infinito ---- */
                { id: 6, name: "Lucía M.", role: "Boda de 150 personas", initial: "LM", text: "Increíble. Conseguí catering y DJ en la misma tarde. La plataforma es súper intuitiva, aunque me gustaría ver más opciones de decoración vintage." },
                { id: 7, name: "Carlos R.", role: "Evento Corporativo", initial: "CR", text: "Nos salvó la cena de fin de año de la empresa. El sistema de pago es muy seguro, lo cual era un requisito estricto de nuestra área de finanzas." },
                { id: 8, name: "Sofía T.", role: "Fiesta Infantil", initial: "ST", text: "¡Muy buena idea! Todo súper rápido. Solamente tuve un pequeño retraso de un proveedor en responder, pero el soporte de Festio me ayudó al instante." },
                { id: 9, name: "Diego V.", role: "Aniversario", initial: "DV", text: "La IA de verdad entiende lo que pides. Puse mi presupuesto y me armó un paquete exacto sin costos ocultos. Totalmente recomendados para evitar estrés." },
                { id: 10, name: "Andrea C.", role: "Lanzamiento de Marca", initial: "AC", text: "Los proveedores están muy bien filtrados. Todos los que contactamos tenían disponibilidad real, algo que siempre es un dolor de cabeza fuera de aquí." }
              ].map((item) => (
                <div key={item.id} className="w-[320px] sm:w-[400px] shrink-0 flex flex-col justify-between rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-purple-50/30 p-8 shadow-xl shadow-slate-200/40 transition-transform hover:-translate-y-1">
                  <p className="text-slate-600 mb-8 italic leading-relaxed">"{item.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-purple-100 flex items-center justify-center text-[#6D28D9] font-bold text-lg">
                      {item.initial}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── B2B Section (Para Proveedores) ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/50 to-white px-4 py-24 sm:px-6 lg:px-8">
        {/* Línea divisoria elegante (Glow Line) */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-80" />
        <div className="absolute top-0 inset-x-1/4 h-[3px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 blur-[2px]" />

        {/* Conexión visual: Puntos */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-40" />

        {/* Iluminación de fondo (Aura Lila) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-purple-200/30 blur-[150px] pointer-events-none" />
        <div className="absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[120px] pointer-events-none" />
        <div className="absolute -left-32 bottom-10 h-[400px] w-[400px] rounded-full bg-fuchsia-50/50 blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text column */}
            <div>
              <Badge
                variant="secondary"
                className="mb-6 gap-2 rounded-full border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-semibold text-[#6D28D9]"
              >
                <Building2 size={14} />
                Para Proveedores
              </Badge>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                ¿Tienes una empresa de eventos o animación?
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-slate-500">
                Digitaliza tu negocio, recibe solicitudes pre-filtradas y
                multiplica tus ventas en piloto automático sin costos fijos
                iniciales.
              </p>

              {/* Feature list */}
              <ul className="mt-8 space-y-4">
                {[
                  {
                    icon: TrendingUp,
                    text: "Aumenta tu visibilidad y multiplica tus ventas",
                  },
                  {
                    icon: Zap,
                    text: "Recibe leads calificados listos para contratar",
                  },
                  {
                    icon: CalendarCheck,
                    text: "Gestiona tu inventario y disponibilidad en un solo lugar",
                  },
                  {
                    icon: Shield,
                    text: "Cobra de forma segura con garantía de pago",
                  },
                ].map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 text-sm font-medium text-slate-600"
                  >
                    <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-purple-50 text-[#6D28D9] flex-shrink-0">
                      <Icon size={12} />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button
                  variant="outline"
                  size="lg"
                  className="group mt-8 h-12 rounded-xl border border-[#6D28D9] bg-transparent text-[#6D28D9] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6D28D9] hover:text-white hover:shadow-lg hover:shadow-purple-500/25"
                  onClick={onProviderRegisterClick}
                >
                  <Building2 size={18} className="mr-2" />
                  Afiliar mi empresa
                  <ChevronRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Visual column — abstract illustration with icons */}
            <div className="relative hidden lg:block">
              <div className="relative mx-auto aspect-square max-w-md">
                {/* Main purple blob */}
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#6D28D9]/10 to-[#8B5CF6]/5" />
                <div className="absolute inset-4 rounded-[32px] bg-gradient-to-br from-[#6D28D9]/15 to-[#8B5CF6]/5 border border-purple-100" />

                {/* Floating icon cards */}
                <div className="absolute -top-4 -left-4 grid size-16 place-items-center rounded-2xl bg-white shadow-lg shadow-purple-100/50 border border-purple-50">
                  <TrendingUp size={28} className="text-[#6D28D9]" />
                </div>
                <div className="absolute top-1/4 -right-6 grid size-14 place-items-center rounded-2xl bg-white shadow-lg shadow-purple-100/50 border border-purple-50">
                  <Users size={24} className="text-[#8B5CF6]" />
                </div>
                <div className="absolute bottom-1/4 -left-8 grid size-14 place-items-center rounded-2xl bg-white shadow-lg shadow-purple-100/50 border border-purple-50">
                  <CalendarCheck size={24} className="text-[#6D28D9]" />
                </div>
                <div className="absolute -bottom-2 right-4 grid size-16 place-items-center rounded-2xl bg-white shadow-lg shadow-purple-100/50 border border-purple-50">
                  <Shield size={28} className="text-[#7C3AED]" />
                </div>

                {/* Center stats card */}
                <div className="absolute inset-0 m-auto grid h-28 w-44 place-items-center rounded-2xl bg-white shadow-xl shadow-purple-100/60 border border-purple-50 p-4">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-[#6D28D9]">
                      +200
                    </span>
                    <span className="block text-xs font-semibold text-slate-400">
                      proveedores activos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feedback Section (Formulario) ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/50 to-white px-4 py-24 sm:px-6 lg:px-8">
        {/* Línea divisoria elegante (Glow Line) */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-80" />
        <div className="absolute top-0 inset-x-1/4 h-[3px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 blur-[2px]" />

        {/* Conexión visual: Puntos */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-40" />

        {/* Iluminación de fondo (Aura Lila) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-purple-200/30 blur-[150px] pointer-events-none" />
        <div className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[120px] pointer-events-none" />
        <div className="absolute -right-32 bottom-10 h-[400px] w-[400px] rounded-full bg-fuchsia-50/50 blur-[100px] pointer-events-none" />

        {/* Contenedor principal alineado con el resto de la web */}
        <div className="relative mx-auto max-w-7xl">

          {/* Badge alineado a la izquierda real de la página */}
          <div className="flex justify-start mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-semibold text-[#6D28D9]">
              <Lightbulb size={16} />
              <span>Danos tu opinión</span>
            </div>
          </div>

          {/* Título y subtítulo centrados */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
              Ayúdanos a mejorar
            </h2>
            <p className="text-slate-500">¿Tienes alguna sugerencia o comentario sobre la plataforma? Te leemos.</p>
          </div>

          {/* Contenedor estrecho solo para el formulario */}
          <div className="mx-auto max-w-3xl">
            <form className="rounded-3xl border border-white/50 bg-white/60 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/10 text-left">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tu nombre</label>
                  <input type="text" className="w-full rounded-xl border-slate-200 bg-white/80 px-4 py-3 focus:border-[#6D28D9] focus:ring-[#6D28D9] outline-none transition-all" placeholder="Ej. María Pérez" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tu comentario</label>
                  <textarea rows={4} className="w-full rounded-xl border-slate-200 bg-white/80 px-4 py-3 focus:border-[#6D28D9] focus:ring-[#6D28D9] outline-none transition-all resize-none" placeholder="Me encantaría que la plataforma tuviera..."></textarea>
                </div>
                <Button className="w-full h-12 rounded-xl bg-[#6D28D9] hover:bg-[#5b21b6] text-white font-bold transition-all shadow-lg shadow-purple-500/30">
                  Enviar comentario
                  <Send size={18} className="ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] text-white shadow-lg shadow-purple-500/20">
              <Sparkles size={20} />
            </div>
            <span className="text-xl font-black tracking-tight text-white">Festio</span>
          </div>

          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Festio. Todos los derechos reservados.
          </p>

          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-purple-400 transition-colors">Términos</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
