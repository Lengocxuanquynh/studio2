"use client";

import { useState } from "react";

type SignPayload = {
  timestamp: number;
  folder: string;
  signature: string;
  apiKey: string;
  cloudName: string;
};

export function CloudinaryUploadCard() {
  const [result, setResult] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setResult("");

    try {
      const signRes = await fetch("/api/media/sign", { method: "POST" });
      const signed: SignPayload = await signRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signed.apiKey);
      formData.append("timestamp", signed.timestamp.toString());
      formData.append("signature", signed.signature);
      formData.append("folder", signed.folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadData = await uploadRes.json();
      setResult(uploadData.secure_url ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="border border-white/10 p-6 space-y-4">
      <p className="text-sm text-[#B4B8AA]">
        Upload ảnh signed trực tiếp lên Cloudinary từ trang admin.
      </p>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p>Đang upload...</p>}
      {result && (
        <a href={result} target="_blank" className="text-sm underline">
          {result}
        </a>
      )}
    </section>
  );
}
