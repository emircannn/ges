import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  User,
  Clock,
  ChevronRight,
  Eye
} from "lucide-react";
import type { Metadata } from "next";
import { getSettings, getBlogPosts } from "@/app/actions";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} | NivaArt Blog` : "Blog Yazısı",
    description: post?.summary || "Yazı detayları.",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post || !post.published) {
    notFound();
  }

  // Increment views in-memory
  try {
    post.views++;
  } catch (err) {
    console.error("Failed to increment blog view count:", err);
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Calculate approximate read time
  const wordCount = post.content.split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const settings = await getSettings();
  const showBlogViews = settings?.showBlogViews ?? true;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.summary,
    "image": post.imageUrl || "https://nivaart.com/logo.png",
    "datePublished": post.createdAt.toISOString(),
    "dateModified": post.updatedAt.toISOString(),
    "author": {
      "@type": "Organization",
      "name": "NivaArt"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NivaArt",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nivaart.com/logo.png"
      }
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. BREADCRUMBS & NAV BACK */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <nav className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-brand-primary">Anasayfa</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-brand-primary">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-500 truncate max-w-[200px]">{post.title}</span>
        </nav>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-primary hover:text-brand-primary-hover mb-8 group cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5 transition-transform group-hover:-translate-x-1" />
          <span>Tüm Yazılara Geri Dön</span>
        </Link>
      </div>

      {/* 2. MAIN CONTAINER */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fade-in-up">
        {/* Title and stats */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-zinc-950 dark:text-white">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-bold text-zinc-400 border-b border-zinc-200/60 dark:border-zinc-800 pb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-primary" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-primary" />
              Yazar: NivaArt
            </span>
            {showBlogViews && (
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-brand-primary" />
                Görüntülenme: {post.views + 1}
              </span>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden shadow-lg border border-zinc-200/50 dark:border-zinc-800 relative group">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-101"
            />
          </div>
        )}

        {/* Summary block */}
        <div className="p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200/60 dark:border-zinc-850 italic text-zinc-600 dark:text-zinc-350 text-sm sm:text-base leading-relaxed">
          {post.summary}
        </div>

        {/* Article Body */}
        <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-zinc-650 dark:prose-p:text-zinc-350 prose-headings:font-extrabold prose-a:text-brand-primary">
          {post.content.startsWith("<") ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="space-y-5 whitespace-pre-line text-sm sm:text-base text-zinc-750 dark:text-zinc-300 leading-relaxed">
              {post.content}
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
