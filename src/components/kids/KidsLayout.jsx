import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import KidsLoader from "./KidsLoader";

const KidsLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-300 to-indigo-400 overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <KidsLoader key="loader" />}
      </AnimatePresence>

      {/* يظهر المحتوى فقط بعد انتهاء اللودر */}
      {!isLoading && (
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center justify-center py-10 min-h-screen"
        >
          {children}
        </motion.main>
      )}

      {/* زخارف خلفية ثابتة وهادئة */}
      <div className="absolute top-10 left-10 text-4xl opacity-30 select-none">
        ☁️
      </div>
      <div className="absolute bottom-10 right-10 text-5xl opacity-30 select-none">
        ✨
      </div>
    </div>
  );
};

export default KidsLayout;
