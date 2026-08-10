import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlanetBySlug } from "../services/db.js";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  BarChart3,
  Sparkles,
  Images,
  Ruler,
  Weight,
  Gauge,
  Sun,
  Orbit,
  RotateCw,
  Thermometer,
  Moon,
  CircleDashed,
} from "lucide-react";

const STAT_LABELS = [
  ["diameter", "Diameter"],
  ["mass", "Massa"],
  ["gravity", "Gravitasi"],
  ["distance_from_sun", "Jarak dari Matahari"],
  ["orbital_period", "Periode Orbit"],
  ["rotation_period", "Periode Rotasi"],
  ["average_temperature", "Suhu Rata-rata"],
  ["number_of_moons", "Jumlah Satelit"],
  ["has_rings", "Memiliki Cincin"],
];

const STAT_FORMATTERS = {
  diameter: (val) => `${Number(val).toLocaleString("id-ID")} km`,
  mass: (val) => `${val} × 10²⁴ kg`,
  gravity: (val) => `${val} m/s²`,
  distance_from_sun: (val) => `${Number(val).toLocaleString("id-ID")} juta km`,
  orbital_period: (val) => `${Number(val).toLocaleString("id-ID")} hari`,
  rotation_period: (val) => `${Number(val).toLocaleString("id-ID")} jam`,
  average_temperature: (val) => `${val} °C`,
  number_of_moons: (val) => `${val} Satelit`,
  has_rings: (val) => (val ? "Ya" : "Tidak"),
};

const STAT_ICONS = {
  diameter: Ruler,
  mass: Weight,
  gravity: Gauge,
  distance_from_sun: Sun,
  orbital_period: Orbit,
  rotation_period: RotateCw,
  average_temperature: Thermometer,
  number_of_moons: Moon,
  has_rings: CircleDashed,
};

const sectionHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 24,
  paddingBottom: 14,
  borderBottom: "1px solid var(--border-subtle)",
};

const iconBadgeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 38,
  height: 38,
  flexShrink: 0,
  borderRadius: 11,
  background: "var(--accent-glow)",
  color: "var(--accent-hover)",
};

const sectionHeadingStyle = {
  fontSize: "1.5rem",
  margin: 0,
  lineHeight: 1.3,
};

export default function PlanetDetailPage() {
  const { slug } = useParams();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPlanetDetail = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getPlanetBySlug(slug);

        if (!isMounted) return; // Hentikan jika komponen sudah di-unmount

        if (!data) {
          throw new Error("Planet tidak ditemukan");
        }

        setPlanet(data);
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Gagal mengambil detail planet.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlanetDetail();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: "80px 0",
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
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 480, margin: "60px auto", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            padding: 24,
            borderRadius: 12,
            background: "rgba(255, 80, 80, 0.06)",
            border: "1px solid rgba(255, 80, 80, 0.2)",
            marginBottom: 20,
          }}
        >
          <AlertCircle
            size={24}
            strokeWidth={2}
            color="#e29b9b"
            aria-hidden="true"
          />
          <p className="error" style={{ margin: 0 }}>
            {error}
          </p>
        </div>
        <Link
          to="/home"
          className="btn-secondary"
          style={{
            padding: "8px 16px",
            fontSize: 13,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ArrowLeft size={15} strokeWidth={2.25} aria-hidden="true" />
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  if (!planet) {
    return null;
  }

  return (
    <div className="animate-fade-up">
      {/* Navigation */}
      <div style={{ marginBottom: 24 }}>
        <Link
          to="/home"
          className="btn-secondary"
          style={{
            padding: "8px 16px",
            fontSize: 13,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ArrowLeft size={15} strokeWidth={2.25} aria-hidden="true" />
          Kembali ke Dashboard
        </Link>
      </div>

      {/* Planet Hero / Header */}
      <div
        className="hero"
        style={{
          padding: "clamp(24px, 4vw, 40px)",
          marginBottom: 40,
          textAlign: "left",
          display: "flex",
          gap: 40,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {planet.image_url && (
          <div style={{ flex: "1 1 300px", maxWidth: 400 }}>
            <img
              src={planet.image_url}
              alt={planet.name}
              style={{
                width: "100%",
                borderRadius: 16,
                boxShadow: "var(--shadow-lg)",
                filter: "drop-shadow(0 0 20px rgba(238, 240, 245, 0.1))",
              }}
            />
          </div>
        )}
        <div style={{ flex: "2 1 400px", minWidth: 0 }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: 8,
              lineHeight: 1.15,
            }}
          >
            {planet.name}
          </h1>
          <p
            className="hero-subtitle"
            style={{ margin: "0 0 20px 0", maxWidth: "100%" }}
          >
            {planet.short_description || "-"}
          </p>
          <p
            style={{
              opacity: 0.85,
              lineHeight: 1.8,
              fontSize: "1.05rem",
              margin: 0,
            }}
          >
            {planet.description || "Belum ada deskripsi lengkap."}
          </p>
        </div>
      </div>

      {/* Statistics */}
      {planet.stats && (
        <div style={{ marginBottom: 56 }}>
          <div style={sectionHeaderStyle}>
            <span style={iconBadgeStyle} aria-hidden="true">
              <BarChart3 size={19} strokeWidth={2} />
            </span>
            <h2 style={sectionHeadingStyle}>Data Statistik</h2>
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: 16,
            }}
          >
            {STAT_LABELS.map(([key, label], index) => {
              let value = planet.stats[key];
              if (value === null || value === undefined || value === "") {
                value = "-";
              } else if (STAT_FORMATTERS[key]) {
                value = STAT_FORMATTERS[key](value);
              }

              const StatIcon = STAT_ICONS[key];

              return (
                <div
                  key={key}
                  className="card"
                  style={{
                    padding: 16,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    animation: `fadeUp 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  {StatIcon && (
                    <StatIcon
                      size={18}
                      strokeWidth={1.75}
                      color="var(--text-muted)"
                      aria-hidden="true"
                    />
                  )}
                  <div
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Facts */}
      {planet.facts?.length > 0 && (
        <div style={{ marginBottom: 56 }}>
          <div style={sectionHeaderStyle}>
            <span style={iconBadgeStyle} aria-hidden="true">
              <Sparkles size={19} strokeWidth={2} />
            </span>
            <h2 style={sectionHeadingStyle}>Fakta Menarik</h2>
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {planet.facts.map((fact, index) => (
              <article
                key={fact.id}
                className="card"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  animation: `fadeUp 0.6s ease-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: 10,
                    color: "var(--accent-hover)",
                    fontSize: "1.15rem",
                  }}
                >
                  {fact.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    flex: 1,
                    margin: 0,
                  }}
                >
                  {fact.content}
                </p>
                {fact.source && (
                  <p
                    className="small"
                    style={{
                      marginTop: 16,
                      paddingTop: 12,
                      borderTop: "1px solid var(--border-subtle)",
                    }}
                  >
                    Sumber: {fact.source}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Media */}
      {planet.media?.length > 0 && (
        <div style={{ marginBottom: 56 }}>
          <div style={sectionHeaderStyle}>
            <span style={iconBadgeStyle} aria-hidden="true">
              <Images size={19} strokeWidth={2} />
            </span>
            <h2 style={sectionHeadingStyle}>Galeri Media</h2>
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {planet.media.map((item, index) => (
              <figure
                key={item.id}
                className="card"
                style={{
                  padding: 12,
                  margin: 0,
                  animation: `fadeUp 0.6s ease-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {item.media_type === "video" ? (
                  <video
                    src={item.media_url}
                    controls
                    preload="metadata"
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      backgroundColor: "#000",
                      display: "block",
                    }}
                  />
                ) : (
                  <div style={{ overflow: "hidden", borderRadius: 8 }}>
                    <img
                      src={item.media_url}
                      alt={item.caption || `Media ${planet.name}`}
                      loading="lazy"
                      className="planet-image"
                      style={{
                        height: 200,
                        width: "100%",
                        objectFit: "cover",
                        margin: 0,
                        display: "block",
                      }}
                    />
                  </div>
                )}
                {item.caption && (
                  <figcaption
                    style={{
                      marginTop: 12,
                      fontSize: 14,
                      textAlign: "center",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
