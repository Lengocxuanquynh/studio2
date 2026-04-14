export type ProjectStatus = 'draft' | 'editing' | 'delivered' | 'expired';

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  section?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  imageCount: number;
  status: ProjectStatus;
  cover: string;
  downloadEnabled: boolean;
  password: string;
  description: string;
  expiresAt: string | null;
  storageSize: string;
  gallery: GalleryImage[];
}

export const GALLERY_IMAGES_1: GalleryImage[] = [
  { id: 'g1-1', url: 'https://images.unsplash.com/photo-1770301312795-abdc6deee5a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Khoảnh Khắc', caption: 'Khoảnh khắc thiêng liêng' },
  { id: 'g1-2', url: 'https://images.unsplash.com/photo-1702592162108-19f74aa4b4f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Khoảnh Khắc', caption: 'Chi tiết váy cưới' },
  { id: 'g1-3', url: 'https://images.unsplash.com/photo-1768488292627-7471f9881677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Khoảnh Khắc', caption: 'Không gian lễ cưới' },
  { id: 'g1-4', url: 'https://images.unsplash.com/photo-1770199780470-1e6e3d30f8f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Khoảnh Khắc', caption: 'Ánh nhìn đầu tiên' },
  { id: 'g1-5', url: 'https://images.unsplash.com/photo-1769650795858-cb89b7d41271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Chi Tiết', caption: 'Chân dung cô dâu' },
  { id: 'g1-6', url: 'https://images.unsplash.com/photo-1769650795970-89690d0f535a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Chi Tiết', caption: 'Khoảnh khắc vàng' },
  { id: 'g1-7', url: 'https://images.unsplash.com/photo-1764998113473-bae96c1c3072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Chi Tiết', caption: 'Vẻ đẹp tinh tế' },
  { id: 'g1-8', url: 'https://images.unsplash.com/photo-1770140304098-46700a5c45c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Chi Tiết', caption: 'Tiệc cưới xa hoa' },
];

export const GALLERY_IMAGES_2: GalleryImage[] = [
  { id: 'g2-1', url: 'https://images.unsplash.com/photo-1764998113473-bae96c1c3072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'BST Chính', caption: 'Sải bước mùa thu' },
  { id: 'g2-2', url: 'https://images.unsplash.com/photo-1764627511537-61f5fb030d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'BST Chính', caption: 'Phong cách thời thượng' },
  { id: 'g2-3', url: 'https://images.unsplash.com/photo-1769650795970-89690d0f535a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'BST Chính', caption: 'Vẻ đẹp điện ảnh' },
  { id: 'g2-4', url: 'https://images.unsplash.com/photo-1769650795858-cb89b7d41271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Chân Dung', caption: 'Chân dung nghệ thuật' },
  { id: 'g2-5', url: 'https://images.unsplash.com/photo-1764694071462-db50e50a3925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Chân Dung', caption: 'Nét thanh lịch' },
  { id: 'g2-6', url: 'https://images.unsplash.com/photo-1770199780470-1e6e3d30f8f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Chân Dung', caption: 'Tinh tế và hiện đại' },
];

export const GALLERY_IMAGES_3: GalleryImage[] = [
  { id: 'g3-1', url: 'https://images.unsplash.com/photo-1770140304098-46700a5c45c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Sự Kiện', caption: 'Đêm gala hoành tráng' },
  { id: 'g3-2', url: 'https://images.unsplash.com/photo-1768488292627-7471f9881677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Sự Kiện', caption: 'Không gian sang trọng' },
  { id: 'g3-3', url: 'https://images.unsplash.com/photo-1770199780470-1e6e3d30f8f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Sự Kiện', caption: 'Khoảnh khắc ý nghĩa' },
  { id: 'g3-4', url: 'https://images.unsplash.com/photo-1764627511537-61f5fb030d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Nhân Vật', caption: 'Gương mặt đêm gala' },
  { id: 'g3-5', url: 'https://images.unsplash.com/photo-1769650795858-cb89b7d41271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', section: 'Nhân Vật', caption: 'Vẻ đẹp rạng ngời' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Uyên & Minh',
    subtitle: 'Hôn Lễ Tại Đà Lạt',
    category: 'Đám Cưới',
    date: '14 Tháng 3, 2026',
    imageCount: 247,
    status: 'delivered',
    cover: 'https://images.unsplash.com/photo-1770301312795-abdc6deee5a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    downloadEnabled: true,
    password: '1234',
    description: 'Bộ sưu tập hình ảnh được tuyển chọn từ ngày hôn lễ tại Đà Lạt mộng mơ.',
    expiresAt: '14 Tháng 6, 2026',
    storageSize: '12.4 GB',
    gallery: GALLERY_IMAGES_1,
  },
  {
    id: '2',
    title: 'BST Thu Đông',
    subtitle: 'Lan Khuê Studio',
    category: 'Thời Trang',
    date: '28 Tháng 2, 2026',
    imageCount: 89,
    status: 'editing',
    cover: 'https://images.unsplash.com/photo-1764998113473-bae96c1c3072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    downloadEnabled: false,
    password: '5678',
    description: 'Bộ sưu tập thời trang thu đông — được ghi lại trong ánh sáng và thời gian.',
    expiresAt: null,
    storageSize: '6.1 GB',
    gallery: GALLERY_IMAGES_2,
  },
  {
    id: '3',
    title: 'Gala Từ Thiện',
    subtitle: 'Metropole Hà Nội',
    category: 'Sự Kiện',
    date: '5 Tháng 2, 2026',
    imageCount: 312,
    status: 'draft',
    cover: 'https://images.unsplash.com/photo-1770140304098-46700a5c45c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    downloadEnabled: false,
    password: '9012',
    description: 'Kho lưu trữ riêng tư — Đêm gala từ thiện tại khách sạn Metropole Hà Nội.',
    expiresAt: null,
    storageSize: '18.7 GB',
    gallery: GALLERY_IMAGES_3,
  },
  {
    id: '4',
    title: 'Chiến Dịch Thương Mại',
    subtitle: 'Hermès Vietnam 2026',
    category: 'Thương Mại',
    date: '20 Tháng 1, 2026',
    imageCount: 156,
    status: 'delivered',
    cover: 'https://images.unsplash.com/photo-1764694071462-db50e50a3925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    downloadEnabled: true,
    password: '3456',
    description: 'Bộ hình ảnh thương mại cao cấp cho chiến dịch thương hiệu Hermès tại Việt Nam.',
    expiresAt: '20 Tháng 4, 2026',
    storageSize: '9.3 GB',
    gallery: GALLERY_IMAGES_2,
  },
  {
    id: '5',
    title: 'Chân Dung Nghệ Thuật',
    subtitle: 'Bộ Sưu Tập I — Hà Nội',
    category: 'Chân Dung',
    date: '3 Tháng 1, 2026',
    imageCount: 78,
    status: 'expired',
    cover: 'https://images.unsplash.com/photo-1769650795858-cb89b7d41271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    downloadEnabled: false,
    password: '7890',
    description: 'Kho lưu trữ riêng tư — Bộ chân dung nghệ thuật tại studio Hà Nội.',
    expiresAt: '3 Tháng 4, 2026',
    storageSize: '4.8 GB',
    gallery: GALLERY_IMAGES_3,
  },
  {
    id: '6',
    title: 'Linh & Tuấn',
    subtitle: 'Lễ Thành Hôn Sài Gòn',
    category: 'Đám Cưới',
    date: '10 Tháng 4, 2026',
    imageCount: 31,
    status: 'draft',
    cover: 'https://images.unsplash.com/photo-1702592162108-19f74aa4b4f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    downloadEnabled: false,
    password: '2024',
    description: 'Bộ sưu tập hình ảnh hôn lễ tại Sài Gòn — đang xử lý.',
    expiresAt: null,
    storageSize: '2.1 GB',
    gallery: GALLERY_IMAGES_1,
  },
];

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: 'Bản Nháp',
  editing: 'Đang Chỉnh Sửa',
  delivered: 'Đã Giao',
  expired: 'Hết Hạn',
};
