import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const BASE = "https://arabictools.online";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,              priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE}/blog`,    priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/privacy`, priority: 0.2, changeFrequency: "yearly" },
    { url: `${BASE}/about`,   priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE}/contact`, priority: 0.3, changeFrequency: "yearly" },
    ...TOOLS.map(t => ({
      url: `${BASE}/tools/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: t.popular ? 0.9 : 0.7,
    })),
  ];
}
