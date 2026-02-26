import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Plus, X, Check } from "lucide-react";

export default function ZikrSlider({
  azkar,
  selectedIndex,
  changeZikrByIndex,
  addZikr,
  deleteZikr,
}) {
  const startX = useRef(0);
  const [showInput, setShowInput] = useState(false);
  const [newText, setNewText] = useState("");

  const handleStart = (x) => (startX.current = x);
  const handleEnd = (x) => {
    const diff = startX.current - x;
    if (diff > 50 && selectedIndex < azkar.length - 1)
      changeZikrByIndex(selectedIndex + 1);
    if (diff < -50 && selectedIndex > 0) changeZikrByIndex(selectedIndex - 1);
  };

  return (
    <div className="relative w-full px-4" dir="rtl">
      {/* صف التحكم العلوي: زر الإضافة على الشمال */}
      <div className="flex justify-start mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-l from-purple-600/20 to-indigo-600/20 hover:from-purple-600/40 hover:to-indigo-600/40 border border-purple-500/30 backdrop-blur-md rounded-2xl transition-all shadow-lg group"
        >
          <div className="bg-purple-500 rounded-lg p-1 group-hover:rotate-90 transition-transform duration-300">
            <Plus size={16} className="text-white" />
          </div>
          <span className="text-sm font-bold text-purple-100">ذكر خاص</span>
        </motion.button>
      </div>

      {/* منطقة عرض الذكر الرئيسية */}
      <div className="relative flex items-center justify-center min-h-[140px] mb-4">
        {/* سهم التنقل اليمين */}
        <button
          onClick={() =>
            selectedIndex > 0 && changeZikrByIndex(selectedIndex - 1)
          }
          className={`absolute right-0 z-10 w-10 h-10 flex items-center justify-center bg-slate-800/40 border border-white/5 rounded-full text-white/50 transition-all hover:bg-purple-600/20 hover:text-white ${selectedIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <span className="text-2xl mt-1">‹</span>
        </button>

        {/* محتوى الذكر مع الأنيميشن */}
        <div
          className="w-full flex justify-center items-center overflow-hidden touch-none"
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX)}
        >
          <AnimatePresence mode="wait">
            {azkar.map(
              (zikr, index) =>
                index === selectedIndex && (
                  <motion.div
                    key={zikr.id}
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                    className="flex flex-col items-center px-8"
                  >
                    <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-center leading-relaxed drop-shadow-xl max-w-[300px] line-clamp-3">
                      {zikr.text}
                    </p>

                    {!zikr.isDefault && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => deleteZikr(index)}
                        className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 size={12} /> حذف من أذكاري
                      </motion.button>
                    )}
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>

        {/* سهم التنقل الشمال */}
        <button
          onClick={() =>
            selectedIndex < azkar.length - 1 &&
            changeZikrByIndex(selectedIndex + 1)
          }
          className={`absolute left-0 z-10 w-10 h-10 flex items-center justify-center bg-slate-800/40 border border-white/5 rounded-full text-white/50 transition-all hover:bg-purple-600/20 hover:text-white ${selectedIndex === azkar.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <span className="text-2xl mt-1">›</span>
        </button>
      </div>

      {/* مؤشر النقاط (Pagination) بتصميم عصري */}
      <div className="flex justify-center gap-2 mt-2 mb-6">
        {azkar.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === selectedIndex ? 24 : 6,
              backgroundColor:
                i === selectedIndex ? "#a855f7" : "rgba(255,255,255,0.1)",
            }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>

      {/* Modal إضافة ذكر جديد: نفس روح تعديل الاسم */}
      <AnimatePresence>
        {showInput && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
            {/* الخلفية المعتمة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInput(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />

            {/* الكارت */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-slate-900 border border-white/10 p-8 rounded-[35px] shadow-2xl overflow-hidden"
            >
              {/* لمسة جمالية في الخلفية */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

              <h3 className="text-xl font-black text-center mb-6 text-white tracking-tight">
                أضف ذكراً <span className="text-purple-500">قلبياً</span>
              </h3>

              <div className="relative">
                <textarea
                  autoFocus
                  maxLength={150}
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="مثال: سبحان الله وبحمده..."
                  className="w-full bg-slate-800/50 border-2 border-white/5 focus:border-purple-500/50 rounded-3xl p-5 text-white text-center text-lg outline-none transition-all resize-none placeholder:text-white/20"
                />
                <div className="text-[10px] font-bold text-purple-400/50 absolute bottom-4 right-5">
                  {newText.length} / 150
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    if (newText.trim()) {
                      addZikr(newText.trim());
                      setNewText("");
                      setShowInput(false);
                    }
                  }}
                  className="flex-[2] bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Check size={20} /> تأكيد الإضافة
                </button>

                <button
                  onClick={() => {
                    setShowInput(false);
                    setNewText("");
                  }}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white/70 font-bold py-4 rounded-2xl transition-all"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
