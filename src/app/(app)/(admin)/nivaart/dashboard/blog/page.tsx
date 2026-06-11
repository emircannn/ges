import React from "react";
import { redirect } from "next/navigation";
import { getBlogPosts, checkUserPermissions } from "@/app/actions";
import { BlogCMS } from "@/components/admin/BlogCMS";
import { UnauthorizedView } from "@/components/admin/UnauthorizedView";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const user = await checkUserPermissions();
  if (!user) {
    redirect("/nivaart/login");
  }

  const isAdmin = user.role === "ADMIN";
  if (!isAdmin && !user.manageBlogs) {
    return <UnauthorizedView sectionName="Blog Yönetimi" />;
  }

  const posts = await getBlogPosts();
  return <BlogCMS initialPosts={posts} />;
}
