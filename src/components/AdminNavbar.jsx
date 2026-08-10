import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function AdminNavbar() {
  const { signOut } = useAuth();

  return (
    <nav className="admin-navbar">
      {/* Logo */}
      <Link
        to="/admin"
        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '18px' }}
      >
        <span style={{ fontSize: '24px' }}>🛠️</span>
        <span>Admin Panel</span>
      </Link>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/admin">Dashboard</Link>
        <Link to="/">Lihat Situs</Link>
      </div>

      <span style={{ flex: 1 }} />

      {/* Authentication */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
        <button onClick={signOut} style={{ backgroundColor: '#dc2626' }}>Keluar</button>
      </div>
    </nav>
  );
}
