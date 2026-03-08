import { notFound }      from "next/navigation";
import type { Metadata } from "next";
import Link              from "next/link";
import {
  getToolBySlug,
  generateStaticParams,
} from "@/lib/tools";
import ToolRenderer      from "@/components/ToolRenderer";

export { generateStaticParams };
export const dynamic = "force-static";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title:       `${tool.nameAr} مجاناً`,
    description: `${tool.descriptionAr} — مجاناً، بدون تسجيل.`,
    keywords:    tool.keywords,
    alternates:  { canonical: `https://arabictools.online/tools/${slug}` },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary">الرئيسية</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{tool.nameAr}</span>
      </nav>

      {/* Tool header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{tool.nameAr}</h1>
        <p className="text-gray-600 dark:text-gray-400">{tool.descriptionAr}</p>
      </div>

      {/* Tool component (client-side) */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
        <ToolRenderer slug={slug} />
      </div>
    </div>
  );
}
