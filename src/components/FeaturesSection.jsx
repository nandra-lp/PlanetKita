import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Sparkles,
  Globe2,
  Box,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const sectionHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 20,
  paddingBottom: 14,
  borderBottom: "1px solid var(--border-subtle)",
};

const iconBadgeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  flexShrink: 0,
  borderRadius: 12,
  background: "var(--accent-glow)",
  color: "var(--accent-hover)",
};

const cardIconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  flexShrink: 0,
  borderRadius: 10,
  background: "rgba(255, 255, 255, 0.05)",
};

const headingStyle = {
  fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
  lineHeight: 1.3,
  margin: 0,
  color: "var(--text-primary)",
};

const gridStyle = {
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 20,
  alignItems: "stretch",
};

const comingSoonBadgeStyle = {
  flexShrink: 0,
  fontSize: 11,
  padding: "4px 10px",
  background: "var(--accent-glow)",
  color: "var(--accent-hover)",
  borderRadius: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 0.4,
};

export default function FeaturesSection() {
  return (
    <>
      {/* Fitur Saat Ini */}
      <div style={{ marginBottom: 48 }}>
        <div style={sectionHeaderStyle}>
          <span style={iconBadgeStyle} aria-hidden="true">
            <CheckCircle2 size={20} strokeWidth={2} />
          </span>
          <h2 style={headingStyle}>Fitur Tersedia</h2>
        </div>

        <section className="grid" style={gridStyle}>
          <article
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: 24,
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{ ...cardIconStyle, color: "var(--accent-hover)" }}
                aria-hidden="true"
              >
                <Globe2 size={18} strokeWidth={2} />
              </span>
              <h3
                style={{
                  fontSize: "1.3rem",
                  color: "var(--accent-hover)",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                Daftar Tata Surya
              </h3>
            </div>
            <p
              style={{
                flex: 1,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Jelajahi setiap planet, dari raksasa gas Jupiter hingga bongkahan
              es di Pluto. Lihat model gambar, jarak orbit, dan fakta menarik
              secara terperinci.
            </p>
            <Link
              to="/planets"
              style={{
                color: "var(--accent)",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 4,
              }}
            >
              Lihat daftar
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </article>
        </section>
      </div>

      {/* Fitur Menarik Selanjutnya */}
      <div>
        <div style={sectionHeaderStyle}>
          <span style={iconBadgeStyle} aria-hidden="true">
            <Sparkles size={20} strokeWidth={2} />
          </span>
          <h2 style={headingStyle}>Fitur Menarik Selanjutnya</h2>
        </div>

        <section className="grid" style={gridStyle}>
          {/* Upcoming Feature 1 */}
          <article
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: 24,
              gap: 12,
              background: "rgba(23, 26, 40, 0.3)",
              borderStyle: "dashed",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <span
                  style={{ ...cardIconStyle, color: "var(--text-secondary)" }}
                  aria-hidden="true"
                >
                  <Box size={17} strokeWidth={2} />
                </span>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    color: "var(--text-primary)",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  Aplikasi AR 3D Interaktif
                </h3>
              </div>
              <span style={comingSoonBadgeStyle}>Segera</span>
            </div>
            <p
              style={{
                flex: 1,
                color: "var(--text-muted)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Fitur mendatang ini akan memungkinkan Anda memutar dan mengamati
              permukaan planet menggunakan rendering grafis 3D secara real-time
              di browser Anda.
            </p>
          </article>

          {/* Upcoming Feature 2 */}
          <article
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: 24,
              gap: 12,
              background: "rgba(23, 26, 40, 0.3)",
              borderStyle: "dashed",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <span
                  style={{ ...cardIconStyle, color: "var(--text-secondary)" }}
                  aria-hidden="true"
                >
                  <HelpCircle size={17} strokeWidth={2} />
                </span>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    color: "var(--text-primary)",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  Kuis Astronomi
                </h3>
              </div>
              <span style={comingSoonBadgeStyle}>Segera</span>
            </div>
            <p
              style={{
                flex: 1,
                color: "var(--text-muted)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Uji pengetahuan Anda tentang tata surya! Selesaikan misi kuis,
              kumpulkan lencana, dan bersaing dengan eksplorer lainnya di papan
              peringkat global.
            </p>
          </article>
        </section>
      </div>
    </>
  );
}
