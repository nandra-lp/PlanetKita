import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext.jsx";

import Protected from "./components/Protected.jsx";
import Navbar from "./components/Navbar.jsx";
import AdminNavbar from "./components/AdminNavbar.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PlanetPage from "./pages/PlanetPage.jsx";
import PlanetDetailPage from "./pages/PlanetDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";

export default function App() {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Menunggu proses autentikasi
  if (loading) {
    return (
      <div className="app-loading">
        <p>Memuat aplikasi...</p>
      </div>
    );
  }

  return (
    <>
      {isAdminRoute && isAdmin ? <AdminNavbar /> : <Navbar />}

      <main className="container">
        <Routes>
        {/* =================================
            PUBLIC LANDING
            ================================= */}

        <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <LandingPage />}
        />

        {/* =================================
            AUTH
            ================================= */}

        <Route
          path="/login"
          element={user ? <Navigate to="/home" replace /> : <LoginPage />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/home" replace /> : <RegisterPage />}
        />

        {/* =================================
            USER HOME
            ================================= */}

        <Route
          path="/home"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />

        <Route
          path="/planets"
          element={
            <Protected>
              <PlanetPage />
            </Protected>
          }
        />

        {/* =================================
            PLANET DETAIL
            ================================= */}

        <Route
          path="/planet/:slug"
          element={
            <Protected>
              <PlanetDetailPage />
            </Protected>
          }
        />

        {/* =================================
            ADMIN
            ================================= */}

        <Route
          path="/admin"
          element={
            <Protected adminOnly>
              <AdminDashboardPage />
            </Protected>
          }
        />

        {/* =================================
            FALLBACK
            ================================= */}

        <Route
          path="*"
          element={<Navigate to={user ? "/home" : "/"} replace />}
        />
      </Routes>
      </main>
    </>
  );
}
