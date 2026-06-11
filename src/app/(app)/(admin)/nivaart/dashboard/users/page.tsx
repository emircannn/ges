import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUsers } from "@/app/actions";
import { UsersCMS } from "@/components/admin/UsersCMS";
import { ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/nivaart/login");
  }

  // Use session user directly for role check in static demo mode
  const currentUser = session.user as { role?: string } | undefined;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-xl mx-auto space-y-4 shadow-sm">
        <ShieldAlert className="w-12 h-12 text-rose-500 stroke-1 animate-pulse" />
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Yetkisiz Erişim</h2>
        <p className="text-zinc-550 dark:text-zinc-400 text-sm leading-relaxed">
          Kullanıcı yönetimi ve yetkilendirmeleri sadece <strong>Yönetici (Admin)</strong> seviyesindeki hesaplar tarafından görüntülenebilir.
        </p>
      </div>
    );
  }

  const usersList = await getUsers();

  return (
    <div className="w-full">
      <UsersCMS initialUsers={usersList} />
    </div>
  );
}
