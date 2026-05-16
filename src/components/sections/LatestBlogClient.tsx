"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
}

const tagColorMap: Record<string, string> = {
  DeFi: "bg-green-500/10 text-green-400 border-green-500/20",
  Web3: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  IA: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Blockchain: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Trading: "bg-red-500/10 text-red-400 border-red-500/20",
  Seguridad: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const getTagColor = (tag: string) => tagColorMap[tag] || "bg-white/5 text-white/40 border-white/10";

export function LatestBlogClient() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, tag, excerpt, cover_image, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-display text-white">Lo último del hub</h2>
          <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1">
            Ver más <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <GlassCard key={i} className="overflow-hidden group">
                <div className="h-36 bg-white/[0.02] flex items-center justify-center animate-pulse">
                  <BookOpen className="text-white/10" size={40} />
                </div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-4 bg-white/10 rounded animate-pulse w-3/4"></div>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <GlassCard className="overflow-hidden group h-full hover:scale-105 transition-transform">
                  {post.cover_image ? (
                    <div className="w-full h-36 overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-36 bg-gradient-to-br from-[#00FF88]/10 to-[#161B24] flex items-center justify-center">
                      <BookOpen className="text-white/10" size={40} />
                    </div>
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={`border text-[10px] ${getTagColor(post.tag || "Blog")}`}>
                        {post.tag || "Blog"}
                      </Badge>
                      <span className="text-[10px] text-white/20">
                        {new Date(post.created_at).toLocaleDateString("es-VE", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-base font-display text-white group-hover:text-[#00FF88] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/40 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/40">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay artículos publicados aún</p>
          </div>
        )}
      </div>
    </section>
  );
}
