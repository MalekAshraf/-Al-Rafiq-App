import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ChevronLeft } from "lucide-react";
import GlobalLoader from "../components/decorations/GlobalLoader";
import Lantern from "../components/decorations/Lantern";
// تأكد من وضع الصورة في المسار: src/assets/404-ramadan.png
import errorImage from "../assets/404-ramadan.png";

export default function NotFound() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
  });
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-5 relative overflow-hidden">
      <AnimatePresence>
        {loading && <GlobalLoader message="نورتم منصة الرفيق..." />}
      </AnimatePresence>

      {!loading && (
        <>
          <Lantern position="left" animate={true} />
          <Lantern position="right" animate={true} />
        </>
      )}
      {/* عناصر خلفية جمالية (نجوم وأهلة خفيفة) */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-md w-full text-center z-10">
        {/* الأنيميشن للصورة */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-8"
        >
          <img
            src={errorImage}
            alt="404 Ramadan"
            className="w-full h-auto drop-shadow-[0_0_50px_rgba(234,179,8,0.2)]"
          />
        </motion.div>

        {/* نصوص الصفحة */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-6xl font-black text-yellow-500 mb-2 tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl font-bold text-white mb-4 italic">
            OOPS! PAGE NOT FOUND
          </h2>
          <p className="text-white/40 text-sm mb-10 leading-relaxed font-medium">
            يبدو أن هذه الصفحة ذهبت لتناول التمر والاستعداد للسحور.. <br />
            لا تقلق، يمكنك العودة للرئيسية ومتابعة وردك.
          </p>

          {/* زر العودة للرئيسية بتصميم متناسق مع الهيدر */}
          <div className="flex flex-col gap-3">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/20 transition-all hover:bg-yellow-400"
              >
                <Home size={20} />
                اذهب الى الصفحة الرئيسية
              </motion.button>
            </Link>

            <Link to={-1}>
              <button className="w-full bg-white/5 text-white/60 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                <ChevronLeft size={18} />
                GO BACK
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* لمسة نهائية: كلمة الرفيق المزخرفة أسفل الصفحة */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
        <span className="text-yellow-500 font-black italic tracking-widest text-xs uppercase">
          الـرَّفِـيـق• COMPANION
        </span>
      </div>
    </div>
  );
}
