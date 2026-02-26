import React, { useState } from "react";
import OptionsPanel from "./OptionsPanel";
import Preview from "./Preview";
import AvatarUpload from "./AvatarUpload";

export default function EditorPage({ userImage }) {
  const [options, setOptions] = useState({
    lantern: false,
    moon: false,
    stars: false,
    cartoon: false,
    background: null,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [triesLeft, setTriesLeft] = useState(3);

  // إذا لم يتم تمرير صورة معتمدة بعد، لا تظهر اللوحة
  if (!userImage) return null;

  return (
    <div
      dir="rtl"
      className="w-full flex flex-col items-center animate-in fade-in duration-700"
    >
      {/* 1. لوحة الخيارات تظهر الآن فقط لأن userImage موجودة */}
      <OptionsPanel options={options} onChange={setOptions} />

      {/* 2. منطقة العرض */}
      <Preview result={result} loading={loading} />

      {/* 3. زر التوليد النهائي */}
      <AvatarUpload
        userImage={userImage}
        options={options}
        setResult={setResult}
        result={result}
        setLoading={setLoading}
        loading={loading}
        triesLeft={triesLeft}
        setTriesLeft={setTriesLeft}
      />
    </div>
  );
}
