export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
};

export const posts: Post[] = [
  {
    slug: "anh-cuoi-da-lat-phong-cach-dien-anh",
    title: "Ảnh cưới Đà Lạt phong cách điện ảnh: checklist đầy đủ",
    excerpt:
      "Hướng dẫn lên concept, timeline và chuẩn bị trang phục để có bộ ảnh cưới điện ảnh tại Đà Lạt.",
    content:
      "Bài viết pillar mô tả toàn bộ quy trình chụp ảnh cưới theo phong cách điện ảnh tại Đà Lạt...",
    category: "anh-cuoi-da-lat",
    tags: ["ảnh cưới", "đà lạt", "concept"],
    coverImage:
      "https://images.unsplash.com/photo-1770301312795-abdc6deee5a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    publishedAt: "2026-04-10T10:00:00.000Z",
  },
  {
    slug: "bao-gia-chup-anh-cuoi-2026",
    title: "Báo giá chụp ảnh cưới 2026 và các yếu tố ảnh hưởng",
    excerpt:
      "So sánh các gói chụp ảnh cưới phổ biến và cách tối ưu ngân sách theo nhu cầu.",
    content:
      "Bài viết cluster giải thích cách xây gói chụp, số lượng outfit, địa điểm và timeline...",
    category: "bao-gia",
    tags: ["báo giá", "dịch vụ", "chụp ảnh cưới"],
    coverImage:
      "https://images.unsplash.com/photo-1769650795858-cb89b7d41271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    publishedAt: "2026-04-12T10:00:00.000Z",
  },
];

export const categories = [
  { slug: "anh-cuoi-da-lat", title: "Ảnh cưới Đà Lạt" },
  { slug: "bao-gia", title: "Báo giá" },
];
