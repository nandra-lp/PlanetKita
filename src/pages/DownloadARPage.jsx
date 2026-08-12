import React, { useState } from "react";
import {
  Box,
  Rotate3D,
  Info,
  Smartphone,
  Apple,
  Bell,
  Download,
  Sparkles,
} from "lucide-react";
import "../styles/ar-page.css"; // Import file CSS yang baru dibuat

export default function DownloadARPage() {
  const [isWaitlisted, setIsWaitlisted] = useState(false);

  const handleWaitlist = () => {
    setIsWaitlisted(true);
    // Di sini nanti bisa ditambahkan logika kirim email ke backend
  };

  const features = [
    {
      icon: <Box size={28} strokeWidth={1.5} />,
      title: "Proyeksi 3D Nyata",
      description:
        "Lihat planet dalam bentuk 3D beresolusi tinggi langsung di atas mejamu atau di lingkungan sekitarmu melalui kamera.",
    },
    {
      icon: <Rotate3D size={28} strokeWidth={1.5} />,
      title: "Skala & Rotasi Akurat",
      description:
        "Eksplorasi ukuran dan rotasi sebenarnya. Putar, perbesar, dan amati detail permukaan planet dari berbagai sudut.",
    },
    {
      icon: <Info size={28} strokeWidth={1.5} />,
      title: "Informasi Interaktif",
      description:
        "Ketuk pada model planet di dunia nyata untuk membaca informasi mendalam tentang komposisi, atmosfer, dan sejarahnya.",
    },
  ];

  return (
    <div className="fade-in ar-page">
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section className="ar-hero">
        {/* Background Glow */}
        <div className="ar-hero-glow" />

        {/* COMING SOON BADGE */}
        <div className="ar-coming-soon">
          <Sparkles size={16} color="#a5b4fc" />
          <span>Segera Hadir</span>
        </div>

        <h1 className="ar-hero-title">
          Bawa Tata Surya
          <br />
          <span className="ar-hero-title-gradient">ke Genggamanmu</span>
        </h1>

        <p className="ar-hero-subtitle">
          Rasakan pengalaman belajar astronomi yang lebih nyata dengan teknologi
          Augmented Reality. Hadirkan planet-planet ke dalam ruanganmu secara
          interaktif.
        </p>

        {/* Mockup Container dengan Efek Glow */}
        <div className="ar-mockup-container">
          <img
            src="/ar-mockup.jpg"
            alt="AR App Mockup"
            className="ar-mockup-img"
          />
          {/* Overlay gradient di bawah gambar agar menyatu */}
          <div className="ar-mockup-overlay" />
        </div>

        {/* Action Buttons */}
        <div className="ar-hero-actions">
          <button
            onClick={handleWaitlist}
            disabled={isWaitlisted}
            className={`ar-btn-waitlist ${isWaitlisted ? "waitlisted" : ""}`}
          >
            {isWaitlisted ? (
              <>
                <Sparkles size={18} />
                Anda Terdaftar!
              </>
            ) : (
              <>
                <Bell size={18} />
                Beri Tahu Saya Saat Rilis
              </>
            )}
          </button>

          <button className="ar-btn-guide">
            <Download size={18} />
            Panduan Instalasi
          </button>
        </div>
      </section>

      {/* ==========================================
          FEATURES GRID
          ========================================== */}
      <section className="ar-features-section">
        <div className="ar-features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="ar-feature-card"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fadeUp 0.6s ease-out forwards",
              }}
            >
              <div className="ar-feature-icon">{feature.icon}</div>
              <h3 className="ar-feature-title">{feature.title}</h3>
              <p className="ar-feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          TATA CARA SECTION
          ========================================== */}
      <section className="ar-specs-section" style={{ marginBottom: "40px" }} id="tata-cara">
        <div className="ar-specs-glow" />
        <div className="ar-specs-content">
          <h2 className="ar-specs-title">
            Cara Penggunaan Aplikasi
          </h2>
          <p className="ar-specs-subtitle">
            Ikuti langkah berikut agar target marker dapat terbaca dengan optimal.
          </p>
          <ol className="ar-specs-steps" aria-label="Langkah penggunaan aplikasi" style={{ textAlign: "left", maxWidth: "500px", margin: "0 auto", color: "var(--text-secondary)", lineHeight: "1.8", paddingLeft: "20px" }}>
            <li>Download target marker.</li>
            <li>Masuk ke aplikasi.</li>
            <li>Arahkan kamera ke target marker, lalu posisikan dengan stabil agar target terbaca dengan benar.</li>
          </ol>
        </div>
      </section>

      {/* ==========================================
          SPECS SECTION
          ========================================== */}
      <section className="ar-specs-section">
        <div className="ar-specs-glow" />
        <div className="ar-specs-content">
          <h2 className="ar-specs-title">
            Spesifikasi Minimum
          </h2>
          <p className="ar-specs-subtitle">
            Untuk mendapatkan pengalaman AR terbaik, pastikan perangkatmu
            memenuhi persyaratan berikut:
          </p>

          <div className="ar-specs-grid">
            {/* Android Card */}
            <div className="ar-spec-card">
              <div className="ar-spec-icon-android">
                <Smartphone size={24} />
              </div>
              <div className="ar-spec-text-left">
                <strong className="ar-spec-platform">Android</strong>
                <span className="ar-spec-details">
                  Android 8.0+
                  <br />
                  (Dukungan ARCore)
                </span>
              </div>
            </div>

            {/* iOS Card */}
            <div className="ar-spec-card">
              <div className="ar-spec-icon-ios">
                <Apple size={24} />
              </div>
              <div className="ar-spec-text-left">
                <strong className="ar-spec-platform">iOS</strong>
                <span className="ar-spec-details">
                  iOS 11.0+
                  <br />
                  (Dukungan ARKit)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
