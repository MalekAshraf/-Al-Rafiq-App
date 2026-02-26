import React, { useState } from "react";
import { motion } from "framer-motion";
import { generateRamadanImage } from "../../services/canvasService";

const AvatarUpload = ({
  options,
  userImage,
  setResult,
  result,
  setLoading,
  loading,
  triesLeft,
  setTriesLeft,
}) => {
  const [selectedRatio, setSelectedRatio] = useState("1:1");

  // إذا ظهرت النتيجة، نخفي هذا المكون تماماً لمنع التكرار
  if (result) return null;

  const handleAiGenerate = async () => {
    if (triesLeft <= 0 || loading) return;
    setLoading(true);
    try {
      const resultUrl = await generateRamadanImage({
        userImage,
        options,
        ratio: selectedRatio,
        // نمرر الـ Loader functions لو حابب تشغلهم من جوه الخدمة
      });
      setResult(resultUrl);
      setTriesLeft((t) => t - 1);
    } catch (err) {
      alert("حدث خطأ أثناء التوليد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-6 px-4 pb-10 flex flex-col items-center gap-6">
      {/* اختيار المقاسات */}
      <div className="w-full grid grid-cols-3 gap-3 max-w-lg">
        {["1:1", "4:5", "9:16"].map((ratio) => (
          <button
            key={ratio}
            onClick={() => setSelectedRatio(ratio)}
            className={`py-3 rounded-2xl border-2 transition-all font-black text-xs ${
              selectedRatio === ratio
                ? "border-yellow-500 text-yellow-500 bg-yellow-500/5"
                : "border-white/5 text-white/30"
            }`}
          >
            {ratio === "1:1" ? "PROFILE" : ratio === "4:5" ? "POST" : "STORY"}
          </button>
        ))}
      </div>

      {/* عداد المحاولات */}
      <div className="bg-slate-800/80 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
        <p className="text-xs font-bold text-white/80">
          المحاولات المتبقية: {triesLeft}
        </p>
      </div>

      {/* الزر الرئيسي */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleAiGenerate}
        disabled={loading || triesLeft <= 0}
        className={`w-full max-w-lg py-5 rounded-3xl font-black text-lg transition-all shadow-2xl ${
          loading
            ? "bg-slate-800 text-white/20"
            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-purple-900/20"
        }`}
      >
        {loading ? "⏳ جاري التحضير..." : "✨ ابدأ السحر الرمضاني"}
      </motion.button>
    </div>
  );
};

export default AvatarUpload;
