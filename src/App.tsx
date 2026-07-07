import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ClienteApp } from "./ClienteApp";
import { AuthModal } from "./components/AuthModal";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LandingPage } from "./screens/LandingPage";
import { PagoExitosoScreen } from "./screens/PagoExitosoScreen";
import { PagoFallidoScreen } from "./screens/PagoFallidoScreen";
import { PagoPendienteScreen } from "./screens/PagoPendienteScreen";
import { ComprobanteScreen } from "./screens/ComprobanteScreen";
import { useAuth } from "./hooks/useAuth";
import type { RolUsuario } from "./types";

// Pantallas B2B
import { ProveedorLayout } from "./screens/proveedor/ProveedorLayout";
import { DashboardScreen } from "./screens/proveedor/DashboardScreen";
import { InventarioScreen } from "./screens/proveedor/InventarioScreen";
import { PaquetesScreen } from "./screens/proveedor/PaquetesScreen";
import { PerfilScreen } from "./screens/proveedor/PerfilScreen";

import { CalendarioScreen } from "./screens/proveedor/CalendarioScreen";
import { OperacionesScreen } from "./screens/proveedor/OperacionesScreen";
import { FinanzasScreen } from "./screens/proveedor/FinanzasScreen";
import { MetricasScreen } from "./screens/proveedor/MetricasScreen";

function LandingPageWrapper() {
  const { openAuthModal } = useAuth();
  const navigate = useNavigate();

  return (
    <LandingPage
      onLoginClick={() => openAuthModal("login")}
      onRegisterClick={() => openAuthModal("register")}
      onCTAClick={() => navigate("/chat")}
      onProviderRegisterClick={() => openAuthModal("register")}
    />
  );
}

export default function App() {
  return (
    <>
      {/* Modal de auth global — se renderiza siempre, visible solo cuando authModalMode != null */}
      <AuthModal />

      <Routes>
        {/* Landing Page — pantalla principal */}
        <Route path="/" element={<LandingPageWrapper />} />

        {/* Chat / buscador de eventos */}
        <Route path="/chat" element={<ClienteApp />} />

        {/* Mercado Pago post-pago */}
        <Route path="/pago-exitoso" element={<PagoExitosoScreen />} />
        <Route path="/pago-fallido" element={<PagoFallidoScreen />} />
        <Route path="/pago-pendiente" element={<PagoPendienteScreen />} />
        <Route path="/comprobante/:reserva_id" element={<ComprobanteScreen />} />

        {/* Rutas proveedor — Panel B2B protegidas por rol */}
        <Route path="/proveedor" element={<ProtectedRoute rol="PROVEEDOR" />}>
          <Route element={<ProveedorLayout />}>
            <Route path="dashboard" element={<DashboardScreen />} />
            <Route path="inventario" element={<InventarioScreen />} />
            <Route path="paquetes" element={<PaquetesScreen />} />
            <Route path="perfil" element={<PerfilScreen />} />
            
            {/* Nuevos módulos */}
            <Route path="calendario" element={<CalendarioScreen />} />
            <Route path="operaciones" element={<OperacionesScreen />} />
            <Route path="finanzas" element={<FinanzasScreen />} />
            <Route path="metricas" element={<MetricasScreen />} />

            {/* Redirección por defecto */}
            <Route path="" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        {/* 404 genérico → al landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
