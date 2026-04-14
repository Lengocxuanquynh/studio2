import { posts } from "@/lib/mock-posts";

export const dynamic = "force-dynamic";

export default function AdminPostsPage() {
  return (
    <main className="min-h-screen bg-[#1A2424] text-[#EAE6D8] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
          Admin CMS - Bài viết
        </h1>
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.slug} className="border border-white/10 p-4">
              <h2>{post.title}</h2>
              <p className="text-xs tracking-[0.15em] text-[#8A9E9E] mt-1">{post.slug}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
