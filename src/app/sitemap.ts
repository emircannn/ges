import { MetadataRoute } from "next";
import { getBlogPosts, getProducts } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://solartemizlik.com.tr";

  // 1. Static Routes
  const staticRoutes = [
    "",
    "/hakkimizda",
    "/hizmetler",
    "/danismanlik",
    "/blog",
    "/urunler",
    "/galeri",
    "/iletisim",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Blog Routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const publishedBlogs = await getBlogPosts();
    blogRoutes = publishedBlogs
      .filter((blog) => blog.published)
      .map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch (error) {
    console.error("Error generating blog routes for sitemap:", error);
  }

  // 3. Dynamic Product Routes
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productRoutes = products.map((prod) => ({
      url: `${baseUrl}/urunler/${prod.slug}`,
      lastModified: new Date(prod.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error generating product routes for sitemap:", error);
  }

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
