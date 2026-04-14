import { CloudinaryUploadCard } from "@/components/admin/cloudinary-upload-card";

export default function AdminMediaPage() {
  return (
    <main className="min-h-screen bg-[#1A2424] text-[#EAE6D8] px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
          Admin Media - Cloudinary
        </h1>
        <CloudinaryUploadCard />
      </div>
    </main>
  );
}
