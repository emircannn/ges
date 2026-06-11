import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/nivaart/", "/nivaart/*"],
    },
    sitemap: "https://solartemizlik.com.tr/sitemap.xml", // Replace with production URL when live
  };
}
