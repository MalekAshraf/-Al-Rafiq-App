/* eslint-env node */
const { HfInference } = require("@huggingface/inference");

module.exports = async (req, res) => {
  // السماح بـ CORS يدوياً
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;
    const hf = new HfInference(process.env.HF_TOKEN);

    console.log("🌙 Generating image for Al-Rafiq...");

    const response = await hf.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt || "Ramadan atmosphere",
      parameters: { num_inference_steps: 4 },
    });

    const arrayBuffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/png");
    return res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("🔥 AI Error:", error.message);
    return res.status(500).json({ error: "سيرفر الـ AI تعطل، جرب مرة أخرى" });
  }
};
