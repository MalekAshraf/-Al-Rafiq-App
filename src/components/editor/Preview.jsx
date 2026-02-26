import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Facebook, Instagram, MessageCircle } from "lucide-react";
import GlobalLoader from "../decorations/GlobalLoader";

export default function Preview({ result, loading }) {
  const shareLink = window.location.href;

  return (
    <div dir="rtl" className="w-full text-center px-4">
      {/* 1. اللودر */}
      <AnimatePresence>
        {loading && (
          <GlobalLoader message="جاري إرسال صورتك للموديل والتحضير..." />
        )}
      </AnimatePresence>

      {/* 2. النتيجة وأزرار الشير */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <img
            src={result}
            alt="Ramadan AI"
            className="mx-auto max-w-full rounded-3xl shadow-2xl border-4 border-white/5"
          />

          <div className="grid grid-cols-2 gap-3 mt-8 max-w-sm mx-auto pb-10">
            <a
              href={result}
              download="ramadan-magic.png"
              className="col-span-2 flex items-center justify-center gap-2 bg-yellow-500 text-black py-4 rounded-2xl font-black shadow-lg hover:bg-yellow-400"
            >
              <Download size={20} /> تحميل الصورة
            </a>

            <button
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent("شوف صورتي الرمضانية!")}`,
                )
              }
              className="col-span-2 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold"
            >
              <MessageCircle size={18} /> واتساب
            </button>

            <button className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-3 rounded-xl font-bold">
              <Facebook size={18} /> فيسبوك
            </button>
            <button className="flex items-center justify-center gap-2 bg-gradient-to-tr from-[#f9ce34] to-[#6228d7] text-white py-3 rounded-xl font-bold">
              <Instagram size={18} /> انستا
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
