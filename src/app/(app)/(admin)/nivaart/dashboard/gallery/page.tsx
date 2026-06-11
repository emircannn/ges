import React from "react";
import { redirect } from "next/navigation";
import { getGalleryItems, checkUserPermissions } from "@/app/actions";
import { GalleryCMS } from "@/components/admin/GalleryCMS";
import { UnauthorizedView } from "@/components/admin/UnauthorizedView";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const user = await checkUserPermissions();
  if (!user) {
    redirect("/nivaart/login");
  }

  const isAdmin = user.role === "ADMIN";
  if (!isAdmin && !user.manageGallery) {
    return <UnauthorizedView sectionName="Galeri Yönetimi" />;
  }

  const items = await getGalleryItems();
  return <GalleryCMS initialItems={items} />;
}
