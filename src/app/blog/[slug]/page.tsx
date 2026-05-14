import Link from "next/link";
import { ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Button from "@/components/ui/Button";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "Post no encontrado" };

  return {
    title: `${post.title} — DefiVenezuela`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, tag, excerpt")
    .eq("published", true)
    .neq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(2);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF88]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-[#00FF88] transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4] truncate max-w-[200px]">{post.title}</span>
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-xs font-medium mb-4">
              {post.tag}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#9DA5B4]/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00FF88]" />
                {new Date(post.created_at).toLocaleDateString("es-VE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              {post.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00FF88]" />
                  {post.read_time}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Banner image */}
      {post.cover_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161B24]/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 border border-[#00FF88]/20 bg-[#161B24]/50">
            <h3 className="text-2xl font-bold text-[#F0F1F5] mb-3">¿Quieres aprender más?</h3>
            <p className="text-[#9DA5B4]/60 mb-6">
              Este artículo es solo el comienzo. Únete a nuestros tracks educativos gratuitos
              para convertirte en experto en DeFi, Web3 e IA agéntica.
            </p>
            <Button variant="primary" asChild>
              <Link href="/aprende" className="flex items-center gap-2">
                Ver todos los tracks
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-8">Artículos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="group">
                  <div className="p-6 rounded-xl border border-white/5 bg-[#161B24]/30 hover:border-[#00FF88]/20 transition-all duration-300 h-full">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-xs font-medium mb-3">
                      {related.tag}
                    </div>
                    <h3 className="text-lg font-semibold text-[#F0F1F5] mb-2 group-hover:text-[#00FF88] transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-[#9DA5B4]/60 text-sm line-clamp-2">{related.excerpt}</p>
                    <div className="mt-4 text-xs text-[#00FF88]">Leer →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="p-8 rounded-3xl border border-[#00FF88]/20"
            style={{ background: "linear-gradient(135deg, rgba(22,27,36,0.5) 0%, rgba(13,17,23,0.8) 100%)" }}
          >
            <div className="text-4xl mb-4">📧</div>
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-3">Artículos nuevos cada semana</h2>
            <p className="text-[#9DA5B4]/60 mb-6 text-sm leading-relaxed">
              Suscríbete a nuestro newsletter para recibir lo último en DeFi, Web3 e IA directamente en tu inbox.
            </p>
            <Button variant="primary" asChild>
              <Link href="/newsletter" className="flex items-center gap-2 justify-center">
                Suscribirse
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
