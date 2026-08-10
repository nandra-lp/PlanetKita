import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to={user ? "/home" : "/"} className="navbar-brand">
        <span className="navbar-brand-icon">🪐</span>
        <span>PlanetKita</span>
      </Link>

      {/* Menu: selalu sejajar di samping logo */}
      <div className="navbar-menu">
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/home">Dashboard</Link>
              <Link to="/planets">Planets</Link>
              {isAdmin && <Link to="/admin">Admin</Link>}
            </>
          ) : (
            <a href="/#planets">Planet</a>
          )}
        </div>

        <div className="navbar-auth">
          {user ? (
            <button onClick={signOut}>Keluar</button>
          ) : (
            <>
              <Link to="/login" className="navbar-login-link">
                Masuk
              </Link>
              <Link to="/register" className="btn-primary">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
