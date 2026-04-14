import type { Metadata } from "next";
import { AuthScreen } from "@/app/components/AuthScreen";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Xác thực truy cập ${id}`,
    robots: { index: false, follow: false },
  };
}

export default function AuthPage() {
  return <AuthScreen />;
}
