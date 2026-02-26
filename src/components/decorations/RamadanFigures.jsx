import { motion } from "framer-motion";

const RamadanFigures = () => {
  return (
    <>
      {/* مسحراتي */}
      <motion.img
        src="/images/mesaharaty.png"
        alt="مسحراتي"
        className="hidden md:block absolute bottom-0 left-1/2 w-36 opacity-70 pointer-events-none z-0"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* مدفع رمضان */}
      <motion.img
        src="/images/cannon.png"
        alt="مدفع رمضان"
        className="hidden md:block absolute bottom-0  left-4 w-32 opacity-70 pointer-events-none z-0"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* عربية فول */}
      <motion.img
        src="/images/foul-cart.png"
        alt="عربية فول"
        className="hidden lg:block absolute bottom-2 right-6 -translate-x-1/2 w-32 opacity-60 pointer-events-none z-0"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
};

export default RamadanFigures;
