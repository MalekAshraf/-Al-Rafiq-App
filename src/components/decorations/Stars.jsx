import React from "react";
import { motion } from "framer-motion";

const Stars = ({ animate }) => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-yellow-300 pointer-events-none z-index: -1
"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            fontSize: "12px",
          }}
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: [0.2, 0.6, 0.2] } : { opacity: 0 }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.span>
      ))}
    </>
  );
};

export default Stars;
