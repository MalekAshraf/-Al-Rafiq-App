// StoryCard.jsx
import React from "react";
import { kidsStories } from "./StoryContent"; // الربط هنا يا هندسة
import { motion } from "framer-motion";

const StoryCard = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl px-4 animate-in slide-in-from-bottom-5">
      <h2 className="text-3xl font-black text-indigo-900 text-center mb-4">
        حكايات الأبطال 📖
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {kidsStories.map((story) => (
          <motion.div
            key={story.id}
            whileHover={{ scale: 1.02 }}
            className={`${story.color} p-6 rounded-[2.5rem] shadow-sm border-4 border-white flex flex-col md:flex-row items-center gap-6`}
          >
            <div className="text-6xl bg-white/50 p-4 rounded-full shadow-inner">
              {story.icon}
            </div>

            <div className="text-right flex-1">
              <h3 className="text-2xl font-black text-slate-800 mb-2">
                {story.title}
              </h3>
              <p className="text-lg text-slate-700 font-bold leading-relaxed">
                {story.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryCard;
