import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { LogOut } from "lucide-react"; // Pastikan lucide-react sudah diinstal

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth();

  // Fungsi helper untuk kelas aktif yang elegan
  const navLinkClass = ({ isActive }) =>
    `navbar-link ${isActive ? "active" : ""}`;

  return (
    <nav className="navbar">
      {/* Logo */}
      <NavLink to={user ? "/home" : "/"} className="navbar-brand">
        <span className="navbar-brand-icon">🪐</span>
        <span className="navbar-brand-text">PlanetKita</span>
      </NavLink>

      {/* Menu Navigasi */}
      <div className="navbar-menu">
        <div className="navbar-links">
          {user ? (
            <>
              <NavLink to="/home" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/planets" className={navLinkClass}>
                Planets
              </NavLink>
              <NavLink to="/download-ar" className={navLinkClass}>
                Aplikasi AR
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin" className={navLinkClass}>
                  Admin
                </NavLink>
              )}
            </>
          ) : (
            <a href="/#planets" className="navbar-link">
              Planet
            </a>
          )}
        </div>

        {/* Auth Section */}
        <div className="navbar-auth">
          {user ? (
            <button onClick={signOut} className="btn-ghost" title="Keluar">
              <LogOut size={18} />
              <span>Keluar</span>
            </button>
          ) : (
            <>
              <NavLink to="/login" className="navbar-link-auth">
                Masuk
              </NavLink>
              <NavLink to="/register" className="btn-primary-sm">
                Daftar
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
