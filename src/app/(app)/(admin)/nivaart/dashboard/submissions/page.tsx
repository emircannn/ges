import React from "react";
import { redirect } from "next/navigation";
import { getContactSubmissions, checkUserPermissions } from "@/app/actions";
import { SubmissionsCMS } from "@/components/admin/SubmissionsCMS";
import { UnauthorizedView } from "@/components/admin/UnauthorizedView";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  const user = await checkUserPermissions();
  if (!user) {
    redirect("/nivaart/login");
  }

  const isAdmin = user.role === "ADMIN";
  if (!isAdmin && !user.manageMessages) {
    return <UnauthorizedView sectionName="Gelen Mesajlar Yönetimi" />;
  }

  const submissions = await getContactSubmissions();
  return <SubmissionsCMS initialSubmissions={submissions} />;
}
