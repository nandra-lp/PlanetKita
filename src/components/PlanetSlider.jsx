import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

// Data mock (bisa diganti dengan data dari API/Supabase nantinya)
const planets = [
  {
    id: "merkurius",
    name: "Merkurius",
    image_url:
      "https://ofwofwvikvugkcmuobml.supabase.co/storage/v1/object/public/planet-media/merkurius/merkurius.png",
    tagline: "Neraka Beku di Dekat Matahari",
    hook_fact:
      "Suhunya bisa melelehkan timah di siang hari, tapi menyimpan miliaran ton es abadi di kawah gelapnya. Bagaimana bisa?",
  },
  {
    id: "venus",
    name: "Venus",
    image_url:
      "https://ofwofwvikvugkcmuobml.supabase.co/storage/v1/object/public/planet-media/venus/venus.png",
    tagline: "Kembaran Beracun Bumi",
    hook_fact:
      "Satu hari di Venus lebih lama dari satu tahunnya, dan matahari terbit dari barat. Jelajahi planet yang tekanannya bisa menghancurkan kapal selam nuklir ini.",
  },
  {
    id: "mars",
    name: "Mars",
    image_url:
      "https://ofwofwvikvugkcmuobml.supabase.co/storage/v1/object/public/planet-media/mars/mars.png",
    tagline: "Masa Depan Umat Manusia?",
    hook_fact:
      "Memiliki gunung berapi tiga kali lebih tinggi dari Everest dan matahari terbenam yang berwarna biru. Apakah dulu Mars pernah hidup?",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    image_url:
      "https://ofwofwvikvugkcmuobml.supabase.co/storage/v1/object/public/planet-media/jupiter/jupyter-ob.png",
    tagline: "Sang Raja Tata Surya",
    hook_fact:
      "Memiliki badai raksasa yang sudah berputar selama 300 tahun dan samudra logam cair di dalamnya. Jupiter adalah pelindung Bumi.",
  },
];

export default function PlanetSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === planets.length - 1 ? 0 : prevIndex + 1,
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? planets.length - 1 : prevIndex - 1,
    );
  }, []);

  // Auto-play (ganti slide tiap 6 detik, jeda saat di-hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  return (
    <div
      className="animate-fade-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(500px, 70vh, 650px)", // Lebih lega secara vertikal
        borderRadius: "24px",
        overflow: "hidden",
        marginBottom: 48,
        backgroundColor: "#050505",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--border-strong)",
      }}
    >
      {/* Track Slider */}
      <div
        style={{
          display: "flex",
          height: "100%",
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {planets.map((planet, index) => (
          <div
            key={planet.id}
            style={{
              minWidth: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Gambar Background dengan Efek Zoom Lambat (Ken Burns) */}
            <img
              src={planet.image_url}
              alt={planet.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: currentIndex === index ? 0.65 : 0.3,
                transform: currentIndex === index ? "scale(1.08)" : "scale(1)",
                transition: "transform 8s ease-out, opacity 1s ease",
              }}
            />

            {/* Gradient Overlay (Gelap di bawah & kiri, pudar ke atas/kanan) */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(10, 11, 18, 0.95) 0%, rgba(10, 11, 18, 0.4) 50%, transparent 100%), linear-gradient(to right, rgba(10, 11, 18, 0.8) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />

            {/* Konten Teks & Tombol */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "clamp(24px, 5vw, 64px)",
                paddingBottom: "clamp(64px, 8vw, 80px)", // Ruang esktra untuk dots
                paddingLeft: "clamp(32px, 8vw, 80px)", // Ruang esktra untuk tombol prev (terutama di mobile)
                paddingRight: "clamp(32px, 8vw, 80px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                opacity: currentIndex === index ? 1 : 0,
                transform:
                  currentIndex === index ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
              }}
            >
              <span
                className="hero-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 16,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(4px)",
                  color: "#fff",
                  boxShadow: "none",
                }}
              >
                <Sparkles size={13} strokeWidth={2.25} aria-hidden="true" />
                {planet.tagline}
              </span>

              <h2
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  lineHeight: 1.1,
                  margin: "0 0 16px 0",
                  color: "#ffffff",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  textShadow: "0 4px 20px rgba(0,0,0,0.6)",
                }}
              >
                {planet.name}
              </h2>

              <p
                style={{
                  opacity: 0.9,
                  fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                  lineHeight: 1.6,
                  maxWidth: 600,
                  margin: "0 0 32px 0",
                  color: "#eef0f5",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                {planet.hook_fact}
              </p>

              <Link
                to={`/planet/${planet.id}`}
                className="btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#ffffff",
                  color: "#0a0b12",
                  padding: "14px 32px",
                }}
              >
                Jelajahi Detail
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigasi Kiri (Arrow) */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        style={{
          position: "absolute",
          top: "50%",
          left: "clamp(16px, 5vw, 32px)", // Posisikan sedikit lebih jauh untuk tombol yang lebih besar
          transform: "translateY(-50%)",
          // UKURAN TOMBOL DIPERBESAR agar menampung ikon yang jauh lebih besar
          width: "clamp(56px, 8vw, 72px)",
          height: "clamp(56px, 8vw, 72px)",
          borderRadius: "50%",
          // Latar belakang sedikit lebih solid untuk kejelasan di latar belakang gelap
          background: "rgba(10, 11, 18, 0.5)",
          backdropFilter: "blur(16px)", // Blur ditingkatkan
          // Border lebih tipis agar tidak mengalihkan perhatian dari ikon yang tebal
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Shadow diperkuat
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
          // Transisi disederhanakan dan lebih halus
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.5)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(10, 11, 18, 0.5)";
          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translateY(-50%) scale(0.96)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
        }}
      >
        {/* Ikon Chevron Kiri: UKURAN DIPERBESAR DRASTIS dan KETEBALAN GARIS DITINGKATKAN DRASTIS */}
        <ChevronLeft size={52} strokeWidth={2.5} />
      </button>

      {/* Navigasi Kanan (Arrow) */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        style={{
          position: "absolute",
          top: "50%",
          right: "clamp(16px, 5vw, 32px)", // Posisikan sedikit lebih jauh untuk tombol yang lebih besar
          transform: "translateY(-50%)",
          // UKURAN TOMBOL DIPERBESAR agar menampung ikon yang jauh lebih besar
          width: "clamp(56px, 8vw, 72px)",
          height: "clamp(56px, 8vw, 72px)",
          borderRadius: "50%",
          // Latar belakang sedikit lebih solid untuk kejelasan di latar belakang gelap
          background: "rgba(10, 11, 18, 0.5)",
          backdropFilter: "blur(16px)", // Blur ditingkatkan
          // Border lebih tipis agar tidak mengalihkan perhatian dari ikon yang tebal
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Shadow diperkuat
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 10,
          // Transisi disederhanakan dan lebih halus
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.5)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(10, 11, 18, 0.5)";
          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translateY(-50%) scale(0.96)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
        }}
      >
        {/* Ikon Chevron Kanan: UKURAN DIPERBESAR DRASTIS dan KETEBALAN GARIS DITINGKATKAN DRASTIS */}
        <ChevronRight size={52} strokeWidth={2.5} />
      </button>

      {/* Indikator Titik (Dots) di bawah */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
          zIndex: 10,
        }}
      >
        {planets.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              width: currentIndex === index ? 32 : 10,
              height: 10,
              borderRadius: 5,
              background:
                currentIndex === index ? "#fff" : "rgba(255,255,255,0.3)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            onMouseOver={(e) => {
              if (currentIndex !== index)
                e.currentTarget.style.background = "rgba(255,255,255,0.6)";
            }}
            onMouseOut={(e) => {
              if (currentIndex !== index)
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
            }}
          />
        ))}
      </div>
    </div>
  );
}
