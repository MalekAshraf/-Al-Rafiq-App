import React from "react";
import { motion } from "framer-motion";

const Lantern = ({ position, animate }) => {
  const isLeft = position === "left";

  return (
    <>
      <motion.div
        className={`absolute top-0 ${
          isLeft ? "left-6" : "right-6"
        } pointer-events-none z-0`}
        initial={{ opacity: 0, y: -40 }}
        animate={animate ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-yellow-400 blur-2xl opacity-30"
          animate={animate ? { opacity: [0.2, 0.4, 0.2] } : { opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Lantern Image */}
        <motion.img
          src="/images/lantern.png"
          alt="فانوس رمضان"
          className="relative w-20 md:w-24"
          animate={animate ? { rotate: [-5, 5, -5] } : { rotate: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "top center" }}
        />
      </motion.div>
    </>
  );
};

export default Lantern;
