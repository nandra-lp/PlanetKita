import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  Sparkles,
  Telescope,
  ArrowRight,
  Loader2,
  AlertCircle,
  LogIn,
} from "lucide-react";

import { getPlanetSummaries } from "../services/db.js";
import LandingFeature from "../components/LandingFeature.jsx";

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

  // Batasi hanya 4 planet untuk ditampilkan di Landing Page
  const displayedPlanets = planets.slice(0, 4);

  return (
    <main
      className="animate-fade-up"
      style={{ width: "100%", overflowX: "hidden" }}
    >
      {/* ==========================================
          HERO SECTION (Dioptimalkan untuk Mobile & Desktop)
          ========================================== */}
      <section
        className="hero"
        style={{
          position: "relative",
          // Padding atas/bawah lebih ringkas di mobile (32px), tetap lega di desktop (48px/80px)
          padding: "clamp(32px, 5vw, 48px) 20px clamp(40px, 6vw, 80px)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // PERUBAHAN UTAMA:
          // min(450px, 65vh) memastikan di HP tingginya hanya ~450px (tidak memenuhi layar).
          // Di desktop, akan membesar hingga calc(100vh - 70px).
          minHeight: "clamp(450px, 65vh, calc(100vh - 70px))",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15%", // Sedikit dinaikkan agar lebih pas di tengah visual mobile
            left: "50%",
            transform: "translate(-50%, -50%)",
            // min() mencegah glow menjadi terlalu raksasa di layar HP
            width: "min(80vw, 500px)",
            height: "min(80vw, 500px)",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            zIndex: -1,
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <div
          className="hero-content"
          style={{
            maxWidth: 800,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            width: "100%",
          }}
        >
          <span
            className="hero-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px", // Sedikit lebih kecil di mobile
              background: "rgba(255,255,255,0.05)",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 20, // Dikurangi dari 24px
            }}
          >
            <Sparkles size={14} strokeWidth={2.25} color="#a5b4fc" />
            <span
              style={{
                fontSize: "0.85rem", // Sedikit lebih kecil
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Eksplorasi Tata Surya
            </span>
          </span>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 8vw, 5rem)", // 2.2rem lebih pas untuk layar HP sempit
              lineHeight: 1.1,
              marginBottom: 20,
              letterSpacing: "-0.03em",
              fontWeight: 800,
            }}
          >
            Jelajahi Dunia
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PlanetKita
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
              color: "var(--text-secondary, #94a3b8)",
              // Dikurangi marginnya agar tombol lebih dekat dan tidak memaksa scroll di HP
              marginBottom: 32,
              maxWidth: 600,
              margin: "0 auto 32px auto",
              lineHeight: 1.6,
              paddingHorizontal: "10px",
            }}
          >
            Jelajahi keindahan dan misteri planet-planet dalam tata surya kita.
            Dapatkan data statistik, fakta menarik, dan galeri media lengkap.
          </p>

          <div
            className="hero-actions"
            style={{
              display: "flex",
              gap: 12, // Gap sedikit diperkecil di mobile
              justifyContent: "center",
              flexWrap: "wrap",
              width: "100%",
              paddingHorizontal: "10px",
            }}
          >
            <Link
              to="/register"
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 24px", // Padding lebih ringkas di mobile
                fontSize: "0.95rem",
                fontWeight: 600,
                borderRadius: 12,
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                color: "white",
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
                flex: "1 1 auto", // Agar tombol bisa menyesuaikan lebar di HP
                maxWidth: "200px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(99, 102, 241, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(99, 102, 241, 0.3)";
              }}
            >
              <Rocket size={16} strokeWidth={2.25} />
              Daftar
            </Link>

            <Link
              to="/login"
              className="btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 24px",
                fontSize: "0.95rem",
                fontWeight: 600,
                borderRadius: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                textDecoration: "none",
                transition: "background 0.2s",
                flex: "1 1 auto",
                maxWidth: "200px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            >
              <LogIn size={16} strokeWidth={2.25} />
              Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          PLANET SECTION (Premium Cards)
          ========================================== */}
      <section
        id="planets"
        className="section"
        style={{ padding: "40px 20px 80px" }}
      >
        <div
          className="section-header"
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              marginBottom: 12,
              fontWeight: 700,
            }}
          >
            Daftar Planet
          </h2>
          <p
            className="small"
            style={{
              margin: "0 auto",
              maxWidth: 550,
              color: "var(--text-secondary, #94a3b8)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              paddingHorizontal: "10px",
            }}
          >
            Login untuk melihat detail lengkap, statistik, fakta, dan media dari
            setiap planet.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              padding: "60px 0",
              color: "var(--text-secondary, #94a3b8)",
            }}
          >
            <Loader2
              size={32}
              strokeWidth={2}
              className="spin-icon"
              style={{ animation: "spin 1s linear infinite" }}
            />
            <p style={{ fontSize: "0.95rem" }}>Menemukan planet...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              padding: "32px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: 16,
              maxWidth: 450,
              margin: "0 auto",
            }}
          >
            <AlertCircle size={32} color="#fca5a5" />
            <p
              style={{
                textAlign: "center",
                margin: 0,
                color: "#fca5a5",
                fontSize: "0.95rem",
              }}
            >
              Gagal memuat planet: {error}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && planets.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              padding: "60px 0",
              color: "var(--text-secondary, #94a3b8)",
            }}
          >
            <Telescope size={48} strokeWidth={1.5} opacity={0.5} />
            <p style={{ fontSize: "0.95rem" }}>
              Belum ada planet yang terdeteksi di radar.
            </p>
          </div>
        )}

        {/* Planet List Grid (Maksimal 4) */}
        {!loading && !error && displayedPlanets.length > 0 && (
          <>
            <div
              className="grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Dinaikkan sedikit minmax-nya agar tidak terlalu gepeng di HP
                gap: 24,
                maxWidth: 1200,
                margin: "0 auto",
                padding: "0 10px",
              }}
            >
              {displayedPlanets.map((planet, index) => (
                <article
                  key={planet.id}
                  className="card"
                  style={{
                    animation: `fadeUp 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    borderRadius: 20,
                    background:
                      "linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                    transition:
                      "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease, box-shadow 0.4s ease",
                    cursor: "default",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget;
                    card.style.transform = "translateY(-8px)";
                    card.style.borderColor = "rgba(99, 102, 241, 0.4)";
                    card.style.boxShadow =
                      "0 20px 40px -10px rgba(99, 102, 241, 0.15), 0 0 20px rgba(99, 102, 241, 0.1)";
                    const img = card.querySelector("img");
                    if (img) img.style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget;
                    card.style.transform = "translateY(0)";
                    card.style.borderColor = "rgba(255,255,255,0.06)";
                    card.style.boxShadow = "0 4px 24px rgba(0,0,0,0.12)";
                    const img = card.querySelector("img");
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  {planet.image_url && (
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        aspectRatio: "16/10",
                        backgroundColor: "#0f172a",
                      }}
                    >
                      <img
                        src={planet.image_url}
                        alt={planet.name}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          margin: 0,
                          transition:
                            "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 40%, transparent 100%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  )}

                  <div
                    style={{
                      padding: "24px 24px 20px",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.4rem",
                        marginBottom: 12,
                        marginTop: 0,
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        color: "var(--text-primary, #f8fafc)",
                      }}
                    >
                      {planet.name}
                    </h3>

                    <p
                      style={{
                        color: "var(--text-secondary, #94a3b8)",
                        lineHeight: 1.7,
                        flex: 1,
                        marginBottom: 24,
                        fontSize: "0.95rem",
                      }}
                    >
                      {planet.short_description || "Deskripsi belum tersedia."}
                    </p>

                    <Link
                      to="/login"
                      state={{ from: `/planet/${planet.slug}` }}
                      className="card-link"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "14px 18px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 14,
                        textDecoration: "none",
                        color: "#e2e8f0",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(99, 102, 241, 0.1)";
                        e.currentTarget.style.borderColor =
                          "rgba(99, 102, 241, 0.3)";
                        e.currentTarget.style.color = "#a5b4fc";
                        const arrow = e.currentTarget.querySelector("svg");
                        if (arrow) arrow.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.03)";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.06)";
                        e.currentTarget.style.color = "#e2e8f0";
                        const arrow = e.currentTarget.querySelector("svg");
                        if (arrow) arrow.style.transform = "translateX(0)";
                      }}
                    >
                      <span>Login untuk lihat detail</span>
                      <ArrowRight
                        size={18}
                        strokeWidth={2}
                        style={{ transition: "transform 0.3s ease" }}
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {planets.length > 4 && (
              <div style={{ textAlign: "center", marginTop: 48 }}>
                <Link
                  to="/login"
                  state={{ from: "/planets" }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 28px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#a5b4fc",
                    textDecoration: "none",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: 999,
                    background: "rgba(99, 102, 241, 0.05)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(99, 102, 241, 0.15)";
                    e.currentTarget.style.borderColor =
                      "rgba(99, 102, 241, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(99, 102, 241, 0.05)";
                    e.currentTarget.style.borderColor =
                      "rgba(99, 102, 241, 0.3)";
                  }}
                >
                  Lihat Daftar Lengkap
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      <LandingFeature />

      {/* ==========================================
          CTA SECTION
          ========================================== */}
      <section style={{ padding: "40px 20px 100px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "clamp(32px, 6vw, 60px) 20px", // Padding dikurangi di mobile
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(255,255,255,0.02) 100%)",
            borderRadius: 24, // Sedikit lebih kecil radiusnya di mobile
            border: "1px solid rgba(99, 102, 241, 0.15)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "min(300px, 80vw)", // Responsif
              height: "min(300px, 80vw)",
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
              filter: "blur(50px)",
              zIndex: -1,
              transform: "translate(30%, -30%)",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(1.6rem, 5vw, 2.5rem)",
              marginBottom: 16,
              fontWeight: 800,
            }}
          >
            Siap menjelajah lebih dalam?
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary, #94a3b8)",
              maxWidth: 500,
              margin: "0 auto 28px auto",
              lineHeight: 1.6,
              paddingHorizontal: "10px",
            }}
          >
            Daftar sekarang secara gratis untuk mengakses data lengkap, fakta
            eksklusif, dan visual menakjubkan dari tata surya kita.
          </p>
          <Link
            to="/register"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "14px 32px",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              color: "white",
              textDecoration: "none",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
              width: "100%",
              maxWidth: "280px",
              margin: "0 auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 25px rgba(99, 102, 241, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(99, 102, 241, 0.3)";
            }}
          >
            Mulai Ekspedisi
            <Rocket size={18} strokeWidth={2.25} />
          </Link>
        </div>
      </section>
    </main>
  );
}
