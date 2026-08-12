import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { LogOut, Menu, X } from "lucide-react"; 

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fungsi helper untuk kelas aktif yang elegan
  const navLinkClass = ({ isActive }) =>
    `navbar-link ${isActive ? "active" : ""}`;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <NavLink to={user ? "/home" : "/"} className="navbar-brand" onClick={closeMobileMenu}>
        <span className="navbar-brand-icon">🪐</span>
        <span className="navbar-brand-text">PlanetKita</span>
      </NavLink>

      {/* Hamburger Toggle Button (Mobile Only) */}
      <button 
        className="mobile-menu-toggle" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Navigasi */}
      <div className={`navbar-menu ${isMobileMenuOpen ? "is-open" : ""}`}>
        <div className="navbar-links">
          {user ? (
            <>
              <NavLink to="/home" className={navLinkClass} onClick={closeMobileMenu}>
                Dashboard
              </NavLink>
              <NavLink to="/planets" className={navLinkClass} onClick={closeMobileMenu}>
                Planets
              </NavLink>
              <NavLink to="/download-ar" className={navLinkClass} onClick={closeMobileMenu}>
                Aplikasi AR
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin" className={navLinkClass} onClick={closeMobileMenu}>
                  Admin
                </NavLink>
              )}
            </>
          ) : (
            <a href="/#planets" className="navbar-link" onClick={closeMobileMenu}>
              Planet
            </a>
          )}
        </div>

        {/* Auth Section */}
        <div className="navbar-auth">
          {user ? (
            <button onClick={() => { signOut(); closeMobileMenu(); }} className="btn-ghost" title="Keluar">
              <LogOut size={18} />
              <span>Keluar</span>
            </button>
          ) : (
            <>
              <NavLink to="/login" className="navbar-link-auth" onClick={closeMobileMenu}>
                Masuk
              </NavLink>
              <NavLink to="/register" className="btn-primary-sm" onClick={closeMobileMenu}>
                Daftar
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
