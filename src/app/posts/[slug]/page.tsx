import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { posts } from "@/lib/mock-posts";
import { buildArticleSchema } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) {
    return { title: "Không tìm thấy bài viết" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/posts/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
    },
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const schema = buildArticleSchema(post);

  return (
    <main className="min-h-screen bg-[#1A2424] text-[#EAE6D8] px-6 py-12">
      <article className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl" style={{ fontFamily: "Playfair Display, serif" }}>
          {post.title}
        </h1>
        <p className="text-[#B4B8AA]">{post.excerpt}</p>
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={700}
          className="w-full h-auto object-cover"
        />
        <p className="leading-8 text-[#CCD2C2]">{post.content}</p>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
