import React from "react";
import WelcomeGenerate from "./WelcomeGenerate";
import DecorationsWrapper from "../decorations/DecorationsWrapper";
import AvatarSection from "./AvatarSection";
import EditorPage from "./EditorPage";
import { motion } from "framer-motion";

const AllGenerate = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white flex flex-col items-center">
      <DecorationsWrapper />

      <div className="relative z-10 flex flex-col items-center px-4 pt-20 pb-28 w-full max-w-5xl">
        <div className="w-full max-w-md text-center">
          <WelcomeGenerate />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-gradient-to-r from-yellow-600/10 to-purple-600/10 border border-white/10 rounded-2xl p-4 my-3 text-center backdrop-blur-sm"
        >
          <p className="text-sm text-yellow-200/90 font-medium">
            🌙 <span className="text-white">هويتك الرمضانية:</span> صمم صورتك
            بالذكاء الاصطناعي وشارك الفرحة!
          </p>
        </motion.div>

        <AvatarSection />

        {/* حاوية العناصر:
            استخدمنا w-full لضمان أن المكونات بداخلها تقدر تفتح بعرض الصفحة
        */}
        <div className="w-full flex flex-col items-center gap-8 mt-2">
          <div className="w-full  flex justify-center">
            <EditorPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllGenerate;
