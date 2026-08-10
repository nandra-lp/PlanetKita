import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Protected({ children, adminOnly = false }) {
  const { user, profile, profileError, profileStatus, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p>Memuat...</p>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  if (adminOnly) {
    if (profileStatus === "error") {
      return <p className="error">Gagal memuat profil: {profileError}</p>;
    }

    if (profileStatus === "not_found") {
      return (
        <p>Profil tidak ditemukan. Coba login ulang atau hubungi admin.</p>
      );
    }

    if (!profile) {
      return <p>Memuat profil...</p>;
    }

    if (profile.role !== "admin") {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
