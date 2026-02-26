import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import * as THREE from "three";
import DOTS from "vanta/dist/vanta.dots.min.js";
import RamadanFigures from "../components/decorations/RamadanFigures";

const Layout = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    window.THREE = THREE;

    if (!vantaEffect) {
      setVantaEffect(
        DOTS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x0f172a, // لون غامق رمضانى
          color: 0xfacc15, // ذهبي
        }),
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="min-h-screen relative text-slate-50">
      {/* الشخصيات الرمضانية */}
      <RamadanFigures />

      {/* محتوى الصفحات */}
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
