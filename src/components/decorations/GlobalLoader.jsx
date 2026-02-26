import React from "react";
import { motion } from "framer-motion";

const GlobalLoader = ({ message = "جاري التحميل..." }) => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#020617]/80 backdrop-blur-sm">
      <div className="relative w-24 h-24">
        {/* حلقة خارجية متحركة */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-t-yellow-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full"
        />
        {/* أيقونة في المنتصف */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          🌙
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        className="mt-4 text-yellow-500 font-serif tracking-widest"
      >
        {message}
      </motion.p>
    </div>
  );
};

export default GlobalLoader;
