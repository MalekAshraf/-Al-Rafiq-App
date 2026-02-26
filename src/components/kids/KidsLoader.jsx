import React from "react";
import { motion } from "framer-motion";

const KidsLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-sky-400 flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-8xl mb-6"
      >
        🏮
      </motion.div>
      <motion.h2
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-white font-black text-2xl tracking-widest"
      >
        يا بطل.. نجهز لك الألعاب!
      </motion.h2>
    </motion.div>
  );
};

export default KidsLoader;
