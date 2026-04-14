import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/mock-posts";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bài viết",
  description: "Kho bài viết SEO theo cụm chủ đề pillar/cluster.",
};

export default function PostsPage() {
  return (
    <main className="min-h-screen bg-[#1A2424] text-[#EAE6D8] px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl" style={{ fontFamily: "Playfair Display, serif" }}>
          Bài viết mới nhất
        </h1>
        {posts.map((post) => (
          <article key={post.slug} className="border border-white/10 p-6">
            <p className="text-xs tracking-[0.2em] text-[#8A9E9E]">{post.category.toUpperCase()}</p>
            <h2 className="mt-2 text-2xl" style={{ fontFamily: "Playfair Display, serif" }}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-3 text-sm text-[#B4B8AA]">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
