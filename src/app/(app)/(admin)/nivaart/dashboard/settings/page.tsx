import React from "react";
import { redirect } from "next/navigation";
import { getSettings, checkUserPermissions } from "@/app/actions";
import { SettingsCMS } from "@/components/admin/SettingsCMS";
import { UnauthorizedView } from "@/components/admin/UnauthorizedView";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await checkUserPermissions();
  if (!user) {
    redirect("/nivaart/login");
  }

  const isAdmin = user.role === "ADMIN";
  if (!isAdmin && !user.manageSettings) {
    return <UnauthorizedView sectionName="Sistem Ayarları" />;
  }

  const settings = await getSettings();

  return (
    <div className="w-full">
      <SettingsCMS initialSettings={settings} />
    </div>
  );
}
