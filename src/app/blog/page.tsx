import Link from "next/link";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — DefiVenezuela",
  description: "Artículos sobre DeFi, Web3, IA agéntica y finanzas descentralizadas para venezolanos.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, tag, excerpt, cover_image, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-4">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Blog</span>
          </div>
          <h1 className="text-4xl font-bold text-[#F0F1F5] mb-3">Blog</h1>
          <p className="text-[#9DA5B4]/60 text-lg">
            Artículos sobre DeFi, Web3, IA agéntica y finanzas descentralizadas para venezolanos.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!posts || posts.length === 0 ? (
          <div className="text-center py-24 text-[#9DA5B4]/40">
            <p className="text-5xl mb-4">✍️</p>
            <p className="text-lg">Próximamente el primer artículo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article className="h-full rounded-2xl border border-white/5 bg-[#161B24]/30 hover:border-[#00FF88]/20 hover:bg-[#161B24]/60 transition-all duration-300 flex flex-col overflow-hidden">
                  {post.cover_image ? (
                    <div className="w-full h-44 overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-44 bg-gradient-to-br from-[#00FF88]/10 to-[#161B24] flex items-center justify-center">
                      <span className="text-4xl opacity-30">📝</span>
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-xs font-medium">
                        {post.tag}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[#F0F1F5] mb-2 group-hover:text-[#00FF88] transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-[#9DA5B4]/60 text-sm leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 text-xs text-[#9DA5B4]/40">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.created_at).toLocaleDateString("es-VE", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <span className="text-[#00FF88] font-medium">Leer →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
