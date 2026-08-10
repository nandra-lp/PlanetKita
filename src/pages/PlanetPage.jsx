import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlanetsWithStats } from "../services/db.js";
import {
  Loader2,
  AlertCircle,
  Telescope,
  Ruler,
  Moon,
  CircleDashed,
  ArrowRight,
} from "lucide-react";

const statBadgeStyle = {
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "0.8rem",
  display: "flex",
  alignItems: "center",
  gap: 6,
  lineHeight: 1.4,
  color: "var(--text-secondary)",
};

export default function PlanetPage() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPlanetsWithStats()
      .then((data) => setPlanets(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-up">
      <div
        className="section-header"
        style={{ marginBottom: 40, marginTop: 24, textAlign: "left" }}
      >
        <h2 style={{ margin: 0 }}>Katalog Planet</h2>
        <p className="small" style={{ marginTop: 8, maxWidth: 560 }}>
          Jelajahi berbagai planet di tata surya kita dan klik untuk melihat
          detail lengkap.
        </p>
      </div>

      {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: "60px 0",
            color: "var(--text-secondary)",
          }}
        >
          <Loader2
            size={28}
            strokeWidth={2}
            className="spin-icon"
            aria-hidden="true"
          />
          <p style={{ margin: 0 }}>Memuat planet...</p>
        </div>
      )}

      {error && !loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
            padding: "24px",
            borderRadius: 12,
            background: "rgba(255, 80, 80, 0.06)",
            border: "1px solid rgba(255, 80, 80, 0.2)",
          }}
        >
          <AlertCircle
            size={24}
            strokeWidth={2}
            color="#e29b9b"
            aria-hidden="true"
          />
          <p className="error" style={{ margin: 0 }}>
            Gagal memuat planet: {error}
          </p>
        </div>
      )}

      {!loading && !error && planets.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            padding: "60px 0",
            color: "var(--text-secondary)",
          }}
        >
          <Telescope size={32} strokeWidth={1.75} aria-hidden="true" />
          <p style={{ margin: 0 }}>Belum ada data planet.</p>
        </div>
      )}

      {!loading && !error && planets.length > 0 && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {planets.map((planet, index) => (
            <article
              key={planet.id}
              className="card"
              style={{
                animation: `fadeUp 0.6s ease-out forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                display: "flex",
                flexDirection: "column",
                padding: 20,
              }}
            >
              {planet.image_url && (
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: 12,
                    marginBottom: 20,
                    aspectRatio: "16/9",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                  }}
                >
                  <img
                    src={planet.image_url}
                    alt={planet.name}
                    className="planet-image"
                    loading="lazy"
                    style={{
                      margin: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <h3
                style={{
                  marginTop: 0,
                  marginBottom: 10,
                  fontSize: "1.4rem",
                  lineHeight: 1.3,
                }}
              >
                {planet.name}
              </h3>

              <p
                style={{
                  flex: 1,
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                {planet.short_description || "Deskripsi belum tersedia."}
              </p>

              {planet.stats && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 20,
                  }}
                >
                  {planet.stats.diameter != null && (
                    <span style={statBadgeStyle}>
                      <Ruler size={13} strokeWidth={2} aria-hidden="true" />
                      {Number(planet.stats.diameter).toLocaleString("id-ID")} km
                    </span>
                  )}
                  {planet.stats.number_of_moons != null && (
                    <span style={statBadgeStyle}>
                      <Moon size={13} strokeWidth={2} aria-hidden="true" />
                      {planet.stats.number_of_moons} Satelit
                    </span>
                  )}
                  {planet.stats.has_rings && (
                    <span style={statBadgeStyle}>
                      <CircleDashed
                        size={13}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Bercincin
                    </span>
                  )}
                </div>
              )}

              <Link
                to={`/planet/${planet.slug}`}
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  textAlign: "center",
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 8,
                  marginTop: "auto",
                }}
              >
                Jelajahi {planet.name}
                <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
