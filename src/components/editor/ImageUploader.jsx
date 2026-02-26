// src/components/editor/ImageUploader.jsx

import { useState } from "react";

export default function ImageUploader({ onImageSelect }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("من فضلك اختار صورة صحيحة");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setError("");
    onImageSelect(imageUrl);
  }

  return (
    <div style={styles.container}>
      <label style={styles.uploadBox}>
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
        <span>📤 ارفع صورتك</span>
      </label>

      {error && <p style={styles.error}>{error}</p>}

      {preview && (
        <div style={styles.previewBox}>
          <img src={preview} alt="preview" style={styles.image} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginBottom: "20px",
  },
  uploadBox: {
    display: "inline-block",
    padding: "12px 20px",
    background: "#222",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
  previewBox: {
    marginTop: "15px",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "300px",
    borderRadius: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};
