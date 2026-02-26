import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: -100, x: "-50%", opacity: 0 }}
          className="fixed top-4 left-1/2 z-[100] w-[94%] max-w-5xl"
        >
          <div className="bg-slate-900/85 backdrop-blur-lg border border-yellow-500/20 px-4 py-2.5 rounded-[22px] flex justify-between items-center shadow-2xl">
            {/* اللوجو المزخرف */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {/* <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-black font-black text-sm">ر</span>
              </div> */}
              <div className="flex flex-col">
                <span className="text-lg font-black text-yellow-500 italic leading-tight">
                  الـرَّفِـيـق
                </span>
                <span className="text-[6px] text-yellow-500/50 font-bold tracking-[0.4em] -mt-0.5 uppercase">
                  Ramadan 2026
                </span>
              </div>
            </div>

            {/* الأزرار الموحدة */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToSection("about")}
                className="text-[10px] font-black bg-yellow-500 text-black px-3.5 py-1.5 rounded-xl shadow-lg shadow-yellow-500/10 active:scale-95 transition-all"
              >
                المطور
              </button>
              <button
                onClick={() => scrollToSection("feedback")}
                className="text-[10px] font-black bg-yellow-500 text-black px-3.5 py-1.5 rounded-xl shadow-lg shadow-yellow-500/10 active:scale-95 transition-all"
              >
                قيمنا
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Header;
