import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAvatar } from "../../context/AvatarContext";
import EditorPage from "../editor/EditorPage";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const AVATAR_SIZE = 176;
const IMAGE_DISPLAY_SIZE = 220;

const AvatarSection = () => {
  const fileInputRef = useRef(null);
  const { image, setImage, setIsEdited } = useAvatar();

  const [scale, setScale] = useState(1.2);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [editMode, setEditMode] = useState(false);
  const [approvedImage, setApprovedImage] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setScale(1.2);
      setPosition({ x: 0, y: 0 });
      setEditMode(true);
      setIsEdited(true);
      setApprovedImage(null);
    };
    reader.readAsDataURL(file);
  };

  // الحساب الدقيق لحدود السحب بناءً على الزووم الحالي
  const maxOffset = Math.max(0, (IMAGE_DISPLAY_SIZE * scale - AVATAR_SIZE) / 2);

  const saveEdit = async () => {
    const finalImage = await exportToCanvas();
    setApprovedImage(finalImage);
    setEditMode(false);
    setIsEdited(false);
    localStorage.setItem("finalAvatar", finalImage);
  };

  const exportToCanvas = () => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = image;

      img.onload = () => {
        ctx.clearRect(0, 0, 1080, 1080);
        ctx.fillStyle = "#020617";
        ctx.fillRect(0, 0, 1080, 1080);

        const ratio = 1080 / AVATAR_SIZE;
        const drawSize = IMAGE_DISPLAY_SIZE * scale * ratio;
        const offsetX = 1080 / 2 - drawSize / 2 + position.x * ratio;
        const offsetY = 1080 / 2 - drawSize / 2 + position.y * ratio;

        ctx.drawImage(img, offsetX, offsetY, drawSize, drawSize);

        // العلامة المائية
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 960, 1080, 120);
        ctx.fillStyle = "#eab308";
        ctx.font = "bold 34px Arial";
        ctx.textAlign = "center";
        ctx.fillText("صنعت بواسطة تطبيق الرفيق 🌙 | al-rafiq.com", 540, 1035);

        resolve(canvas.toDataURL("image/png"));
      };
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full mt-3">
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileSelect}
      />

      <div className="relative">
        <motion.div
          className={`w-44 h-44 rounded-[32px] overflow-hidden border-2 bg-slate-800/50 flex items-center justify-center relative ${
            editMode
              ? "border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)]"
              : "border-white/10"
          }`}
        >
          {image ? (
            <motion.img
              src={image}
              style={{ x: position.x, y: position.y, scale: scale }}
              drag={editMode}
              dragMomentum={false} // تعطيل الاندفاع لجعل الحركة دقيقة تحت يدك
              dragConstraints={{
                left: -maxOffset,
                right: maxOffset,
                top: -maxOffset,
                bottom: maxOffset,
              }}
              onDrag={(event, info) => {
                // تحديث الـ State لحظياً أثناء السحب
                setPosition({ x: info.point.x, y: info.point.y });
              }}
              className="w-[220px] h-[220px] max-w-none object-cover cursor-grab active:cursor-grabbing touch-none"
            />
          ) : (
            <div
              className="flex flex-col items-center justify-center w-full h-full group cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src="/images/avatar-placeholder.png"
                alt="Placeholder"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="text-[10px] text-white font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  اضغط لرفع صورتك
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {!editMode && (
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-slate-900 flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-4 border-[#020617]"
          >
            📷
          </button>
        )}
      </div>

      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col items-center gap-4 bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-full max-w-[280px]"
          >
            <div className="flex items-center justify-between w-full px-2">
              <span className="text-[10px] text-gray-400 uppercase font-bold">
                Zoom
              </span>
              <div className="flex gap-4">
                <button
                  onClick={() => setScale((s) => clamp(s - 0.1, 1, 3))}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"
                >
                  ➖
                </button>
                <button
                  onClick={() => setScale((s) => clamp(s + 0.1, 1, 3))}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"
                >
                  ➕
                </button>
              </div>
            </div>
            <button
              onClick={saveEdit}
              className="w-full py-4 rounded-2xl bg-yellow-500 text-black text-base font-black shadow-xl shadow-yellow-500/20 active:scale-95 transition-all uppercase tracking-wider"
            >
              حفظ وضعية الصورة ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {approvedImage && !editMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full"
        >
          <EditorPage userImage={approvedImage} />
        </motion.div>
      )}
    </div>
  );
};

export default AvatarSection;
