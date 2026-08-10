export default function PurposeSection() {
  return (
    <section
      className="card"
      style={{
        marginBottom: 48,
        padding: "clamp(24px, 4vw, 32px)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        background:
          "linear-gradient(135deg, rgba(23, 26, 40, 0.6) 0%, rgba(14, 16, 25, 0.8) 100%)",
        borderLeft: "4px solid var(--accent)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: 12,
            fontSize: 20,
            background: "var(--accent-glow)",
          }}
        >
          🎯
        </span>
        <h2
          style={{
            fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
            lineHeight: 1.25,
            margin: 0,
            color: "var(--text-primary)",
          }}
        >
          Tujuan &amp; Fungsi PlanetKita
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          color: "var(--text-secondary)",
          fontSize: "1.02rem",
          lineHeight: 1.75,
        }}
      >
        <p style={{ margin: 0 }}>
          <strong style={{ color: "var(--text-primary)" }}>PlanetKita</strong>{" "}
          diciptakan dengan misi mulia untuk mendemokratisasi edukasi astronomi
          di Indonesia. Kami bertujuan menyediakan platform interaktif yang
          memudahkan pelajar, pendidik, maupun penggemar ruang angkasa dalam
          mempelajari keajaiban tata surya.
        </p>
        <p style={{ margin: 0 }}>
          Situs ini berfungsi sebagai ensiklopedia digital yang akurat,
          tervisualisasi dengan elegan, dan dirancang khusus untuk menginspirasi
          keingintahuan generasi penjelajah masa depan tentang semesta yang
          membentang luas.
        </p>
      </div>
    </section>
  );
}
