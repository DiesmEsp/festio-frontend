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
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
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
            <Button variant="ghost" onClick={onLoginClick}>
              Iniciar sesión
            </Button>
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
              <Button variant="ghost" className="justify-start" onClick={onLoginClick}>
                Iniciar sesión
              </Button>
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
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/80 via-white to-white pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-purple-400/5 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-20 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <Badge
              variant="secondary"
              className="gap-2 rounded-full border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-semibold text-[#6D28D9]"
            >
              <Sparkles size={14} />
              Plataforma Inteligente de Eventos
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Tu evento ideal,{" "}
            <span className="bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] bg-clip-text text-transparent">
              diseñado de forma inteligente
            </span>{" "}
            y sin estrés.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 sm:text-xl">
            Cuéntale a Festio qué tipo de evento necesitas y nuestra IA buscará las
            mejores opciones con disponibilidad en tiempo real.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
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
      <section className="bg-slate-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              ¿Por qué organizar tu evento con Festio?
            </h2>
          </div>

          {/* Cards grid */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Cotización Instantánea */}
            <div className="group flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <span className="grid size-12 place-items-center rounded-xl bg-purple-50 text-[#6D28D9]">
                <Zap size={24} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Cotización Instantánea
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Olvídate de esperar días por un presupuesto. Recibe opciones
                  reales al instante.
                </p>
              </div>
            </div>

            {/* Card 2: Disponibilidad Real */}
            <div className="group flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <span className="grid size-12 place-items-center rounded-xl bg-purple-50 text-[#6D28D9]">
                <CalendarCheck size={24} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Disponibilidad Real
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Bloqueamos el inventario temporalmente para garantizar tu
                  reserva.
                </p>
              </div>
            </div>

            {/* Card 3: Pago Seguro */}
            <div className="group flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <span className="grid size-12 place-items-center rounded-xl bg-purple-50 text-[#6D28D9]">
                <Shield size={24} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Pago 100% Seguro
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Transacciones verificadas y garantías de cumplimiento del
                  servicio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── B2B Section (Para Proveedores) ──────────────────────────────── */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
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
                  className="h-12 rounded-xl border-[#6D28D9] px-8 text-base font-bold text-[#6D28D9] transition-all hover:bg-purple-50 hover:text-[#5B21B6] hover:border-[#5B21B6]"
                  onClick={onProviderRegisterClick}
                >
                  <Building2 size={18} />
                  Afiliar mi empresa
                  <ChevronRight size={18} className="-ml-1" />
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

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-lg bg-[#6D28D9] text-white shadow-md shadow-purple-500/20">
              <Sparkles size={15} />
            </span>
            <span className="text-sm font-semibold text-slate-500">
              © 2026 Festio. Todos los derechos reservados.
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="transition-colors hover:text-slate-600">
              Términos
            </a>
            <a href="#" className="transition-colors hover:text-slate-600">
              Privacidad
            </a>
            <a href="#" className="transition-colors hover:text-slate-600">
              Contacto
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
