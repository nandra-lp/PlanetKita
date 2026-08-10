import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { user, loading: authLoading, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [authLoading, user, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const data = await signUp(email, password, fullName);

      if (data.session) {
        navigate("/", { replace: true });
      } else {
        setMessage(
          "Registrasi berhasil. Jika konfirmasi email aktif, silakan cek email Anda.",
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="animate-fade-up" style={{ maxWidth: 420, margin: "40px auto" }}>
      <div className="card" style={{ padding: '32px' }}>
        <h1 style={{ marginTop: 0, marginBottom: 8, fontSize: '2rem' }}>Daftar</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>Bergabunglah dengan ekspedisi tata surya kita.</p>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />
          
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
            placeholder="Password (Min. 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
          />

          <button disabled={submitting} className="btn-primary" style={{ width: '100%', marginTop: 8, padding: '12px' }}>
            {submitting ? "Memproses..." : "Buat Akun"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.95rem' }}>
          Sudah punya akun? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Masuk di sini</Link>
        </p>
      </div>
    </section>
  );
}
