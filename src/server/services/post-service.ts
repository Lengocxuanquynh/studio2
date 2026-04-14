import { createDraftPost, listPublishedPosts } from "@/server/repositories/post-repository";

export async function getPublishedPostCards() {
  const posts = await listPublishedPosts();
  return posts.map((post: (typeof posts)[number]) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    category: post.category?.name ?? "Uncategorized",
    publishedAt: post.publishedAt,
  }));
}

export async function draftPostFromTemplate(input: { title: string; slug: string; authorId?: string }) {
  return createDraftPost({
    title: input.title,
    slug: input.slug,
    authorId: input.authorId,
    content: "Nội dung bản nháp...",
  });
}
