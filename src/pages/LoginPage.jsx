import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { user, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from && location.state.from !== "/login"
      ? location.state.from
      : "/";

  useEffect(() => {
    if (!authLoading && user) {
      navigate(from, { replace: true });
    }
  }, [authLoading, user, from, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="animate-fade-up" style={{ maxWidth: 420, margin: "40px auto" }}>
      <div className="card" style={{ padding: '32px' }}>
        <h1 style={{ marginTop: 0, marginBottom: 8, fontSize: '2rem' }}>Masuk</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Lanjutkan penjelajahan tata surya Anda.</p>

        {error && <p className="error">{error}</p>}

        {from !== "/" && (
          <div className="card" style={{ marginBottom: 24, padding: '12px', background: 'rgba(238, 240, 245, 0.05)', border: '1px dashed var(--border-subtle)' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
              Anda perlu masuk untuk mengakses halaman yang dituju.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />

          <button disabled={submitting} className="btn-primary" style={{ width: '100%', marginTop: 8, padding: '12px' }}>
            {submitting ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.95rem' }}>
          Belum punya akun? <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Daftar di sini</Link>
        </p>
      </div>
    </section>
  );
}
