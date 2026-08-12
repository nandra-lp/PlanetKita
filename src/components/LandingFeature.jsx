import { Smartphone, BookOpenCheck } from "lucide-react";

const features = [
  {
    id: 1,
    badge: "IMERSIF",
    title: "Aplikasi AR PlanetKita",
    description:
      "Jelajahi tata surya secara interaktif dengan teknologi Augmented Reality. Lihat planet secara 3D di dunia nyata melalui kamera perangkat Anda.",
    icon: <Smartphone size={26} strokeWidth={1.8} />,
    gradient:
      "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.08) 100%)",
    accentColor: "#a5b4fc",
  },
  {
    id: 2,
    badge: "INTERAKTIF",
    title: "Kuis Test PlanetKita",
    description:
      "Uji pengetahuanmu tentang tata surya dengan kuis interaktif. Dapatkan skor, pelajari fakta menarik, dan tantang diri sendiri setiap hari.",
    icon: <BookOpenCheck size={26} strokeWidth={1.8} />,
    gradient:
      "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.08) 100%)",
    accentColor: "#c4b5fd",
  },
];

export default function LandingFeature() {
  return (
    <section
      id="features"
      style={{
        position: "relative",
        padding: "80px 20px",
        overflow: "hidden",
      }}
    >
      {/* Background Glow Orbs (Dekoratif) */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1100px",
          margin: "0 auto",
          zIndex: 1,
        }}
      >
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              borderRadius: 999,
              color: "#a5b4fc",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              marginBottom: 20,
            }}
          >
            FITUR UNGGULAN
          </span>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: 16,
              color: "var(--text-primary, #f8fafc)",
            }}
          >
            Dua cara seru untuk mengenal
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              tata surya lebih dekat
            </span>
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-secondary, #94a3b8)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Nikmati pengalaman belajar astronomi yang imersif dan interaktif,
            dirancang khusus untuk memicu rasa ingin tahu Anda.
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
          }}
        >
          {features.map((feature, index) => (
            <article
              key={feature.id}
              style={{
                position: "relative",
                padding: 32,
                borderRadius: 24,
                background:
                  "linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "default",
                overflow: "hidden",
                animation: `fadeUp 0.6s ease-out forwards`,
                animationDelay: `${index * 0.15}s`,
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform = "translateY(-8px)";
                card.style.borderColor = "rgba(99, 102, 241, 0.4)";
                card.style.boxShadow =
                  "0 20px 40px -10px rgba(99, 102, 241, 0.25), 0 0 30px rgba(99, 102, 241, 0.1)";
                const iconBox = card.querySelector(".feature-icon-box");
                if (iconBox) {
                  iconBox.style.transform = "scale(1.08) rotate(-4deg)";
                  iconBox.style.boxShadow = `0 8px 24px ${feature.gradient.includes("99, 102, 241") ? "rgba(99, 102, 241, 0.3)" : "rgba(139, 92, 246, 0.3)"}`;
                }
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = "translateY(0)";
                card.style.borderColor = "rgba(255, 255, 255, 0.08)";
                card.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
                const iconBox = card.querySelector(".feature-icon-box");
                if (iconBox) {
                  iconBox.style.transform = "scale(1) rotate(0deg)";
                  iconBox.style.boxShadow = "none";
                }
              }}
            >
              {/* Decorative corner glow */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "200px",
                  height: "200px",
                  background: feature.gradient,
                  filter: "blur(40px)",
                  opacity: 0.6,
                  pointerEvents: "none",
                  transform: "translate(30%, -30%)",
                }}
              />

              {/* Icon Container */}
              <div
                className="feature-icon-box"
                style={{
                  position: "relative",
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: feature.gradient,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: feature.accentColor,
                  marginBottom: 24,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {feature.icon}
              </div>

              {/* Badge */}
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: feature.accentColor,
                  marginBottom: 12,
                  opacity: 0.9,
                }}
              >
                {feature.badge}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "var(--text-primary, #f8fafc)",
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: "var(--text-secondary, #94a3b8)",
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
