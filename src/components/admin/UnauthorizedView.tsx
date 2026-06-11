import React from "react";
import { ShieldAlert } from "lucide-react";

interface UnauthorizedViewProps {
  sectionName: string;
}

export function UnauthorizedView({ sectionName }: UnauthorizedViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-xl mx-auto space-y-4 shadow-sm">
      <ShieldAlert className="w-12 h-12 text-rose-500 stroke-1 animate-pulse" />
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Yetkisiz Erişim</h2>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
        <strong>{sectionName}</strong> bölümünü görüntülemek veya yönetmek için yetkiniz bulunmamaktadır. Lütfen sistem yöneticinizle iletişime geçin.
      </p>
    </div>
  );
}
export default UnauthorizedView;
