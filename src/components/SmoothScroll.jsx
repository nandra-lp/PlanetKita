// src/components/SmoothScroll.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // 1. Inisialisasi Lenis
    const lenis = new Lenis({
      duration: 1.2, // Durasi animasi (semakin besar, semakin lambat/mulus)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function standar Lenis
      smoothWheel: true, // Aktifkan smooth scroll untuk mouse wheel
      touchMultiplier: 2, // Sensitivitas scroll di layar sentuh (HP/Tablet)
    });

    lenisRef.current = lenis;

    // 2. Jalankan requestAnimationFrame untuk animasi yang optimal
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Cleanup saat komponen di-unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  // 4. Scroll ke atas secara instan setiap kali pathname (rute) berubah
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return <>{children}</>;
}
