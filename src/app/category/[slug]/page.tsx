import Link from "next/link";
import type { Metadata } from "next";
import { categories, posts } from "@/lib/mock-posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  return {
    title: category ? category.title : "Danh mục",
    description: `Danh mục ${category?.title ?? slug}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const filtered = posts.filter((post) => post.category === slug);

  return (
    <main className="min-h-screen bg-[#1A2424] text-[#EAE6D8] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
          Danh mục: {slug}
        </h1>
        <div className="space-y-4">
          {filtered.map((post) => (
            <div key={post.slug} className="border border-white/10 p-5">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
