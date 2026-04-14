import { posts } from "@/lib/mock-posts";

type SearchProps = {
  searchParams: Promise<{ q?: string }>;
};

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: SearchProps) {
  const params = await searchParams;
  const keyword = params.q?.toLowerCase() ?? "";
  const filtered = keyword
    ? posts.filter((post) => `${post.title} ${post.excerpt}`.toLowerCase().includes(keyword))
    : posts;

  return (
    <main className="min-h-screen bg-[#1A2424] text-[#EAE6D8] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
          Tìm kiếm
        </h1>
        <p className="text-[#8A9E9E] mb-8">Từ khóa: {params.q ?? "Tất cả"}</p>
        <div className="space-y-4">
          {filtered.map((post) => (
            <article key={post.slug} className="border border-white/10 p-5">
              <h2>{post.title}</h2>
              <p className="text-[#B4B8AA] text-sm mt-2">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
