import { Sparkles, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

type AppHeaderProps = {
  onReservasClick?: () => void;
  subtitle?: string;
};

export function AppHeader({ onReservasClick, subtitle }: AppHeaderProps) {
  const { isAuthenticated, user, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="app-header">
      <Link
        to="/"
        className="brand-button select-none cursor-pointer transition-transform hover:scale-105 active:scale-95"
        aria-label="Festio - Inicio"
      >
        <span className="brand-icon">
          <Sparkles size={18} />
        </span>
        <div className="brand-text">
          <span>Festio</span>
          {subtitle ? <small>{subtitle}</small> : null}
        </div>
      </Link>

      <nav className="header-actions">
        {isAuthenticated ? (
          <div className="header-user-info">
            {user?.rol === "PROVEEDOR" ? (
              <button
                id="header-go-panel"
                className="header-btn header-btn-outline"
                type="button"
                onClick={() => navigate("/proveedor/dashboard")}
              >
                <LayoutDashboard size={16} />
                Mi Panel
              </button>
            ) : null}
            {onReservasClick && user?.rol === "CLIENTE" && (
              <button
                id="header-go-reservas"
                className="header-btn header-btn-outline"
                type="button"
                onClick={onReservasClick}
              >
                Mis Reservas
              </button>
            )}
            <span className="header-user-name">
              Hola, <strong>{user?.nombre}</strong>
            </span>
            <button
              id="header-logout"
              className="header-btn header-btn-ghost"
              type="button"
              onClick={handleLogout}
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="header-auth-buttons">
            <button
              id="header-login"
              className="header-btn header-btn-ghost"
              type="button"
              onClick={() => openAuthModal("login")}
            >
              Iniciar sesión
            </button>
            <button
              id="header-register"
              className="header-btn header-btn-primary"
              type="button"
              onClick={() => openAuthModal("register")}
            >
              Registrarse
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
