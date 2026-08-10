import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPlanetSummaries } from "../services/db.js";

export default function LandingPage() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPlanetSummaries()
      .then((data) => setPlanets(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">🪐 Eksplorasi Tata Surya</span>

            <h1>
              Jelajahi Dunia
              <br />
              <span>PlanetKita</span>
            </h1>

            <p>
              Jelajahi keindahan dan misteri planet-planet dalam tata surya
              kita. Dapatkan data statistik, fakta menarik, dan galeri media
              lengkap.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="btn-primary">
                Daftar Gratis
              </Link>

              <Link to="/login" className="btn-secondary">
                Sudah punya akun? Masuk
              </Link>
            </div>
          </div>
        </section>

        {/* Planet Section */}
        <section id="planets" className="section">
          <div className="section-header">
            <h2>Planet dalam Tata Surya</h2>

            <p className="small">
              Login untuk melihat detail lengkap, statistik, fakta, dan media
              setiap planet.
            </p>
          </div>

          {/* Loading */}
          {loading && <p>Memuat planet...</p>}

          {/* Error */}
          {error && <p className="error">Gagal memuat planet: {error}</p>}

          {/* Empty */}
          {!loading && !error && planets.length === 0 && (
            <p>Belum ada data planet.</p>
          )}

          {/* Planet List */}
          {!loading && !error && planets.length > 0 && (
            <div className="grid">
              {planets.map((planet, index) => (
                <article
                  key={planet.id}
                  className="card"
                  style={{
                    "--animation-order": index,
                  }}
                >
                  {planet.image_url && (
                    <div
                      style={{
                        overflow: "hidden",
                        borderRadius: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      <img
                        src={planet.image_url}
                        alt={planet.name}
                        className="planet-image"
                        style={{ margin: 0 }}
                      />
                    </div>
                  )}

                  <h3>{planet.name}</h3>

                  <p>
                    {planet.short_description || "Deskripsi belum tersedia."}
                  </p>

                  <Link
                    to="/login"
                    state={{
                      from: `/planet/${planet.slug}`,
                    }}
                    className="card-link"
                  >
                    Login untuk lihat detail <span>→</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="hero cta-section">
          <div className="hero-content">
            <h2>Siap menjelajah lebih dalam?</h2>

            <p>
              Daftar sekarang untuk mengakses statistik, fakta, dan galeri media
              lengkap setiap planet.
            </p>

            <Link to="/register" className="btn-primary">
              Daftar Sekarang
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
