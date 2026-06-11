import React from "react";
import { ProfileCMS } from "@/components/admin/ProfileCMS";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  return (
    <div className="w-full">
      <ProfileCMS />
    </div>
  );
}
