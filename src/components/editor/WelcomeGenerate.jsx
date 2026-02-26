import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Check, User } from "lucide-react"; // تأكد من تثبيت lucide-react

const WelcomeGenerate = () => {
  const [name, setName] = useState("ضيفنا الكريم");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
      setTempName(savedName);
    }
  }, []);

  const handleSave = () => {
    const cleanedName = tempName.trim().slice(0, 10) || "ضيفنا الكريم";
    setName(cleanedName);
    localStorage.setItem("userName", cleanedName);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative p-6 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-sm text-center overflow-hidden"
    >
      {/* تأثير ضوئي خفيف في الخلفية */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-600/10 blur-[50px] rounded-full" />

      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="display"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex items-center justify-center gap-3">
              {/* زر التعديل على الشمال */}
              <button
                onClick={() => setIsEditing(true)}
                className="order-first p-2 rounded-full bg-white/5 hover:bg-purple-500/20 text-purple-400 transition-all active:scale-90 border border-white/5"
                title="تعديل الاسم"
              >
                <Edit3 size={16} />
              </button>

              <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-purple-200">
                رمضان كريم أهـلا/
                <span n className="text-yellow-500">
                  {" "}
                  {name}
                </span>{" "}
                🌙
              </h1>
            </div>

            <p className="text-sm font-medium text-slate-400 tracking-wide mt-1">
              نسأل الله أن يتقبل منا ومنكم صالح الأعمال ✨
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="edit"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative group">
              <input
                type="text"
                value={tempName}
                maxLength={10}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-slate-800/80 border-2 border-purple-500/30 rounded-2xl px-6 py-3 text-white text-xl font-bold focus:outline-none focus:border-purple-500 w-64 text-center transition-all shadow-2xl"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <div className="absolute -bottom-2 -left-2 bg-purple-600 text-[10px] px-2 py-0.5 rounded-md font-bold text-white">
                {tempName.length}/10
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-2 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all active:scale-95 flex items-center gap-2"
              >
                <Check size={18} /> حفظ الاسم
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-white/5 text-white/60 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-all"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WelcomeGenerate;
