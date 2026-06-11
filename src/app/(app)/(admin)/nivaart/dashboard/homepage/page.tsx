import React from "react";
import { redirect } from "next/navigation";
import { getHomepageContents, checkUserPermissions } from "@/app/actions";
import { HomepageCMS } from "@/components/admin/HomepageCMS";
import { UnauthorizedView } from "@/components/admin/UnauthorizedView";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  const user = await checkUserPermissions();
  if (!user) {
    redirect("/nivaart/login");
  }

  const isAdmin = user.role === "ADMIN";
  if (!isAdmin && !user.manageSettings) {
    return <UnauthorizedView sectionName="Anasayfa İçerik Yönetimi" />;
  }

  const content = await getHomepageContents();
  return <HomepageCMS initialContent={content} />;
}
