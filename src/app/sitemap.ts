import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAvailableProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAvailableProperties({ useFallback: false });

  const staticRoutes = [
    "",
    "/propiedades",
    "/vende-tu-propiedad",
    "/perfil-de-mary",
    "/contacto",
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const propertyUrls = properties.map((property) => ({
    url: `${siteConfig.url}/propiedades/${property.slug}`,
    lastModified: new Date(property.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...propertyUrls];
}