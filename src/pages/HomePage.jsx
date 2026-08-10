import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import PurposeSection from "../components/PurposeSection.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import PlanetSlider from "../components/PlanetSlider.jsx"; // <-- Import komponen slider baru
import { Satellite, Rocket, Telescope } from "lucide-react";

export default function HomePage() {
  const { user, profile } = useAuth();
  const displayName = profile?.full_name || user?.email || "Pengguna Eksplorer";

  return (
    <div className="animate-fade-up">
      {/* Dashboard Welcome */}
      <section
        className="hero hero-auth"
        style={{
          marginBottom: 48,
          textAlign: "left",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Aksen dekoratif — murni visual, tidak mempengaruhi layout/flow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -80,
            left: "30%",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--accent-2-glow) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <span
            className="hero-badge"
            style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
          >
            <Satellite size={13} strokeWidth={2.25} aria-hidden="true" />
            Pusat Kendali Aktif
          </span>

          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Selamat Datang, {displayName}
          </h1>

          <p
            style={{
              opacity: 0.9,
              fontSize: "1.05rem",
              lineHeight: 1.6,
              maxWidth: 640,
              margin: "12px 0 28px 0",
            }}
          >
            Ini adalah pusat kendali ekspedisi tata surya Anda. Dari sini, Anda
            dapat mulai menjelajahi daftar planet yang menakjubkan atau melihat
            pembaruan terbaru misi kita.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/planets"
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Mulai Penjelajahan
              <Rocket size={16} strokeWidth={2.25} aria-hidden="true" />
            </Link>
            <Link
              to="/planets"
              className="btn-secondary"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Telescope size={16} strokeWidth={2.25} aria-hidden="true" />
              Lihat daftar Planet
            </Link>
          </div>
        </div>
      </section>

      {/* --- Slider Planet Masuk Di Sini --- */}
      <PlanetSlider />

      {/* Bagian Konten Tambahan */}
      <PurposeSection />
      <FeaturesSection />
    </div>
  );
}
