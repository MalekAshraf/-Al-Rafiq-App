export async function generateRamadanImage({
  userImage,
  options,
  startLoading,
  stopLoading,
  attemptNumber = 0, // ضفنا دي عشان نحدد الستايل
}) {
  try {
    if (startLoading) startLoading("✨ جاري ابتكار أجواء رمضانية لصورتك...");

    const userName = localStorage.getItem("userName") || "";
    const isFemale = userName.endsWith("ة") || userName.endsWith("ه");
    const genderTerm = isFemale ? "Egyptian woman" : "Egyptian man"; // تخصيص أكتر للموديل

    // 1. تجهيز الكانفاس (الصورة الأصلية)
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const userImg = await loadImage(userImage);

    canvas.width = 1024;
    canvas.height = 1024;

    const scale = Math.max(
      canvas.width / userImg.width,
      canvas.height / userImg.height,
    );
    const x = canvas.width / 2 - (userImg.width / 2) * scale;
    const y = canvas.height / 2 - (userImg.height / 2) * scale;
    ctx.drawImage(userImg, x, y, userImg.width * scale, userImg.height * scale);

    // 2. مصفوفة الستايلات (نفس اللي كتبناها)
    const attemptStyles = [
      {
        style:
          "Hyper-realistic photography, shot on 85mm lens, f/1.8, soft bokeh, cinematic lighting, high-end DSLR look",
      },
      {
        style:
          "Digital masterpiece illustration, glowing magical atmosphere, vibrant colors, fantasy art style, intricate ornaments",
      },
      {
        style:
          "Classic oil painting style, rich brushstrokes, warm candlelight glow, historical Islamic art aesthetic",
      },
    ];

    // 3. توليد البرومبت (تجميع الإضافات)
    let additions = [];
    if (options.lantern)
      additions.push("holding a glowing ornate bronze Ramadan lantern");
    if (options.moon)
      additions.push("a magnificent large golden crescent moon in the sky");
    if (options.cartoon) {
      additions.push(
        "3D Disney-Pixar style, cute stylized child character, big expressive eyes, smiling, vibrant joyful colors",
      );
    }
    if (options.mosque)
      additions.push("grand mosque with illuminated minarets in background");
    if (options.stars) additions.push("twinkling stars and magical night sky");

    const selectedStyle =
      attemptStyles[attemptNumber % attemptStyles.length].style;

    // المتغير ده هو اللي هيتبعت للسيرفر
    const finalPrompt =
      `A professional ${selectedStyle} of a ${genderTerm} in a Ramadan setting, ${additions.join(", ")}, highly detailed, 8k, masterpiece, cultural attire, warm festive atmosphere.`.trim();

    console.log("🚀 Prompt Sent:", finalPrompt);

    // 4. إرسال الطلب للسيرفر
    const response = await fetch("/api/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: canvas.toDataURL("image/png"),
        prompt: finalPrompt, // تأكدنا إننا بنبعت المتغير الصح
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "سيرفر الـ AI تعطل");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error in AI Generation:", error);
    throw error;
  } finally {
    if (stopLoading) stopLoading();
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}
