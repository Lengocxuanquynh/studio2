import { prisma } from "@/lib/prisma";

export async function listPublishedPosts() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true, seoMeta: true, tags: { include: { tag: true } } },
    orderBy: { publishedAt: "desc" },
  });
}

export async function createDraftPost(input: {
  title: string;
  slug: string;
  content: string;
  authorId?: string;
}) {
  return prisma.post.create({
    data: {
      title: input.title,
      slug: input.slug,
      content: input.content,
      authorId: input.authorId,
      status: "DRAFT",
    },
  });
}
