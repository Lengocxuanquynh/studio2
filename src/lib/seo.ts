import { env } from "@/lib/env";
import type { Post } from "@/lib/mock-posts";

export function absoluteUrl(path: string): string {
  return new URL(path, env.NEXT_PUBLIC_SITE_URL).toString();
}

export function buildArticleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Ivy Bridal Studio" },
    image: [post.coverImage],
    mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`),
  };
}
