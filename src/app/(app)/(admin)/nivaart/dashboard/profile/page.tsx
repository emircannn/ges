import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProfileCMS } from "@/components/admin/ProfileCMS";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/nivaart/login");
  }

  return (
    <div className="w-full">
      <ProfileCMS />
    </div>
  );
}
