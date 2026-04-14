import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Ivy Bridal Studio",
    template: "%s | Ivy Bridal Studio",
  },
  description:
    "Nền tảng quản lý gallery, nội dung và SEO với Next.js, Neon Prisma và Cloudinary.",
  openGraph: {
    title: "Ivy Bridal Studio",
    description:
      "Nền tảng quản lý gallery, nội dung và SEO với Next.js, Neon Prisma và Cloudinary.",
    type: "website",
    url: "https://example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
