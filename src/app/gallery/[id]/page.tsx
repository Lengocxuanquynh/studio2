import type { Metadata } from "next";
import { ClientGallery } from "@/app/components/ClientGallery";
import { PROJECTS } from "@/app/data/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((item) => item.id === id);

  if (!project) {
    return { title: "Gallery không tồn tại" };
  }

  return {
    title: `${project.title} - Gallery`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Gallery`,
      description: project.description,
      images: [{ url: project.cover }],
    },
  };
}

export default function GalleryPage() {
  return <ClientGallery />;
}
