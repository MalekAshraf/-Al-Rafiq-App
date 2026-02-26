import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, CheckCircle, XCircle } from "lucide-react";

const SimpleQuiz = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // لمعرفة الإجابة المختارة
  const [isLocked, setIsLocked] = useState(false); // لمنع الضغط المتكرر

  const questions = [
    {
      q: "ما هو الشهر الذي نصوم فيه؟",
      a: ["شوال", "رمضان", "رجب"],
      correct: 1,
    },
    {
      q: "ماذا نقول عند البدء في الأكل؟",
      a: ["الحمد لله", "بسم الله", "سبحان الله"],
      correct: 1,
    },
    {
      q: "كم عدد الصلوات في اليوم؟",
      a: ["3 صلوات", "5 صلوات", "4 صلوات"],
      correct: 1,
    },
    {
      q: "أين نذهب لأداء الحج؟",
      a: ["مصر", "مكة المكرمة", "المدينة"],
      correct: 1,
    },
    {
      q: "ما هو كتاب المسلمين؟",
      a: ["الإنجيل", "القرآن الكريم", "التوراة"],
      correct: 1,
    },
    {
      q: "من هو أول الأنبياء؟",
      a: ["محمد ﷺ", "نوح عليه السلام", "آدم عليه السلام"],
      correct: 2,
    },
  ];

  const handleAnswer = (index) => {
    if (isLocked) return;

    setSelectedAnswer(index);
    setIsLocked(true);

    if (index === questions[step].correct) {
      setScore(score + 1);
    }

    // تأخير بسيط لمشاهدة النتيجة (صح أو خطأ) قبل الانتقال
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
        setSelectedAnswer(null);
        setIsLocked(false);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-md px-4 py-10">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="bg-white rounded-[3rem] p-8 shadow-2xl border-b-8 border-yellow-400 text-center relative overflow-hidden"
          >
            <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-xs font-black">
              سؤال {step + 1} من {questions.length}
            </span>

            <h3 className="text-2xl font-black text-indigo-900 mt-6 mb-8">
              {questions[step].q}
            </h3>

            <div className="grid gap-3">
              {questions[step].a.map((opt, i) => {
                // منطق الألوان
                let btnStyle = "bg-indigo-50 text-indigo-900 shadow-sm";
                if (selectedAnswer !== null) {
                  if (i === questions[step].correct) {
                    btnStyle =
                      "bg-green-100 text-green-700 border-2 border-green-200";
                  } else if (i === selectedAnswer) {
                    btnStyle = "bg-red-50 text-red-400 border-2 border-red-100"; // أحمر خفيف جداً
                  }
                }

                return (
                  <motion.button
                    key={i}
                    whileTap={!isLocked ? { scale: 0.95 } : {}}
                    onClick={() => handleAnswer(i)}
                    className={`py-4 px-6 rounded-2xl font-black transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    {opt}
                    {selectedAnswer !== null &&
                      i === questions[step].correct && (
                        <CheckCircle size={20} />
                      )}
                    {selectedAnswer === i && i !== questions[step].correct && (
                      <XCircle size={20} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[3rem] p-10 shadow-2xl text-center border-b-8 border-green-400"
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-indigo-900">بطل متميز!</h2>
            <p className="text-slate-500 font-bold my-4 text-xl">
              أجبت على {score} من {questions.length}
            </p>
            <div className="flex justify-center gap-2 mb-8">
              {[...Array(questions.length)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${i < score ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`}
                />
              ))}
            </div>
            <button
              onClick={() => {
                setStep(0);
                setScore(0);
                setShowResult(false);
                setSelectedAnswer(null);
                setIsLocked(false);
              }}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xl shadow-lg"
            >
              العب مرة تانية 🔄
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SimpleQuiz;
