import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, PartyPopper } from "lucide-react";

const BadgeModal = ({ isOpen, onClose, badgeName, roundNumber }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          {/* الخلفية المظلمة الشفافة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm"
          />

          {/* جسم المودال */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            className="relative bg-white rounded-[3rem] p-8 shadow-2xl max-w-sm w-full text-center border-8 border-yellow-400"
          >
            {/* أيقونات الاحتفال الطائرة */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-400 p-5 rounded-full shadow-lg border-4 border-white"
            >
              <Trophy size={48} className="text-white" />
            </motion.div>

            <div className="mt-8 space-y-4">
              <h2 className="text-3xl font-black text-indigo-900">
                أحسنت يا بطل! 🥳
              </h2>
              <p className="text-slate-600 font-bold leading-relaxed">
                لقد أنهيت <span className="text-indigo-600">{badgeName}</span>{" "}
                بنجاح. أنت الآن تملك {roundNumber} أوسمة!
              </p>

              {/* شكل الوسام الحاصل عليه */}
              <div className="py-6 flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center border-4 border-dashed border-indigo-200"
                >
                  <Star size={40} className="text-yellow-500 fill-yellow-500" />
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-black text-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                <PartyPopper size={24} />
                استلم جائزتك
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BadgeModal;
