"use client";

import React, { useState } from "react";
import { Mail, MailOpen, Trash2, Calendar, User, Phone, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { markSubmissionAsRead, deleteSubmission } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface SubmissionsCMSProps {
  initialSubmissions: ContactSubmission[];
}

export function SubmissionsCMS({ initialSubmissions }: SubmissionsCMSProps) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(initialSubmissions);
  const [selectedSub, setSelectedSub] = useState<ContactSubmission | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(submissions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSubmissions = submissions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleMarkRead = async (sub: ContactSubmission) => {
    if (sub.isRead) return;

    const res = await markSubmissionAsRead(sub.id);
    if (res.success) {
      const updated = { ...sub, isRead: true };
      setSubmissions(submissions.map((s) => (s.id === sub.id ? updated : s)));
      if (selectedSub?.id === sub.id) {
        setSelectedSub(updated);
      }
    } else {
      toast.error(res.error || "Güncelleme hatası oluştu.");
    }
  };

  const triggerDelete = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent opening the details pane
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    setIsLoading(true);
    const res = await deleteSubmission(deleteId);
    if (res.success) {
      const updated = submissions.filter((s) => s.id !== deleteId);
      setSubmissions(updated);
      const maxPage = Math.max(1, Math.ceil(updated.length / ITEMS_PER_PAGE));
      if (currentPage > maxPage) {
        setCurrentPage(maxPage);
      }
      if (selectedSub?.id === deleteId) {
        setSelectedSub(null);
      }
      toast.success("Mesaj başarıyla silindi.");
    } else {
      toast.error(res.error || "Silme hatası oluştu.");
    }
    setIsLoading(false);
    setIsDeleteOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Gelen Mesajlar</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          İletişim formundan müşteriler tarafından gönderilen talepleri inceleyin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Inbox List */}
        <div className={`lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm ${selectedSub ? "hidden lg:block" : "block"}`}>
          <div className="px-6 py-4 border-b border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-800/50 font-bold text-xs text-zinc-500 uppercase tracking-wider">
            Gelen Kutusu ({submissions.filter((s) => !s.isRead).length} Okunmamış)
          </div>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800 max-h-[70vh] overflow-y-auto">
            {submissions.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-sm">
                Gelen kutusu boş.
              </div>
            ) : (
              paginatedSubmissions.map((sub) => {
                const isSelected = selectedSub?.id === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setSelectedSub(sub);
                      handleMarkRead(sub);
                    }}
                    className={`p-4 cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 transition-colors flex items-start gap-3 relative ${
                      isSelected
                        ? "bg-brand-primary/5 dark:bg-brand-primary/10 border-l-4 border-brand-primary"
                        : "border-l-4 border-transparent"
                    }`}
                  >
                    {/* Unread dot */}
                    {!sub.isRead && (
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-primary absolute top-4.5 right-4" />
                    )}

                    <div className="shrink-0 mt-1">
                      {sub.isRead ? (
                        <MailOpen className="w-4 h-4 text-zinc-400" />
                      ) : (
                        <Mail className="w-4 h-4 text-brand-primary font-bold" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs truncate ${!sub.isRead ? "font-bold text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>
                          {sub.name}
                        </span>
                        <span className="text-[10px] text-zinc-400 shrink-0 font-mono">
                          {new Date(sub.createdAt).toLocaleDateString("tr-TR")}
                        </span>
                      </div>
                      <p className={`text-xs truncate ${!sub.isRead ? "font-semibold text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>
                        {sub.subject}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-zinc-150 dark:border-zinc-850 bg-zinc-50/30 dark:bg-zinc-800/30">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 hover:text-brand-primary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                aria-label="Önceki Sayfa"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-bold text-zinc-550 dark:text-zinc-400">
                Sayfa {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 hover:text-brand-primary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                aria-label="Sonraki Sayfa"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Message Details Viewer */}
        <div className={`lg:col-span-2 space-y-4 ${selectedSub ? "block" : "hidden lg:block"}`}>
          {selectedSub ? (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
              {/* Mobile Back Button */}
              <button
                onClick={() => setSelectedSub(null)}
                className="lg:hidden flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-primary-hover mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Listeye Geri Dön
              </button>

              {/* Message Header info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Konu</span>
                  <h2 className="text-xl font-extrabold leading-snug">{selectedSub.subject}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => triggerDelete(selectedSub.id, e)}
                    className="w-9 h-9 rounded-full text-zinc-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                    aria-label="Mesajı Sil"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </Button>
                </div>
              </div>

              {/* Sender Details card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl text-xs space-y-0.5">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-brand-primary shrink-0" />
                  <div>
                    <p className="text-zinc-400 font-semibold">Gönderen</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-50">{selectedSub.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                  <div>
                    <p className="text-zinc-400 font-semibold">E-posta</p>
                    <a href={`mailto:${selectedSub.email}`} className="font-bold text-brand-primary hover:underline truncate">
                      {selectedSub.email}
                    </a>
                  </div>
                </div>
                {selectedSub.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                    <div>
                      <p className="text-zinc-400 font-semibold">Telefon</p>
                      <a href={`tel:${selectedSub.phone}`} className="font-bold text-zinc-900 dark:text-zinc-50 hover:underline">
                        {selectedSub.phone}
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                  <div>
                    <p className="text-zinc-400 font-semibold">Tarih</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-50">
                      {new Date(selectedSub.createdAt).toLocaleString("tr-TR")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Mesaj İçeriği</span>
                <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed bg-zinc-50/50 dark:bg-zinc-800/10 p-6 rounded-2xl border border-zinc-150 dark:border-zinc-850 whitespace-pre-wrap">
                  {selectedSub.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-16 text-center text-zinc-400 shadow-sm flex flex-col items-center justify-center space-y-4">
              <Mail className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
              <p className="text-sm">Detaylarını okumak için soldaki listeden bir mesaj seçin.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        title="Mesajı Sil"
        description="Bu mesajı gelen kutusundan silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        confirmText="Sil"
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
