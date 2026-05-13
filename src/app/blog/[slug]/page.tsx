import Link from "next/link";
import { ChevronRight, Calendar, User, Clock, ArrowRight } from "lucide-react";
import { getBlogPost, getRelatedPosts, blogPosts } from "@/lib/blog";
import Button from "@/components/ui/Button";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);

  if (!post) return { title: "Post no encontrado" };

  return {
    title: `${post.title} — DefiVenezuela`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF88]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-[#00FF88] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">{post.title.substring(0, 30)}...</span>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-xs font-medium mb-4">
              {post.category}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#9DA5B4]/60">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#00FF88]" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00FF88]" />
                {new Date(post.date).toLocaleDateString("es-VE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00FF88]" />
                {post.readTime}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#00FF88]/10 text-[#9DA5B4]/60 text-xs font-medium border border-[#00FF88]/15"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <article className="prose-invert max-w-none">
            <div
              className="text-[#9DA5B4] leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split("\n")
                  .map((line: string) => {
                    if (line.startsWith("## ")) {
                      return `<h2 class="text-2xl font-bold text-[#F0F1F5] mt-8 mb-4">${line.substring(3)}</h2>`;
                    }
                    if (line.startsWith("### ")) {
                      return `<h3 class="text-xl font-semibold text-[#F0F1F5] mt-6 mb-3">${line.substring(4)}</h3>`;
                    }
                    if (line.startsWith("| ")) {
                      return `<table class="w-full border-collapse my-4 border border-white/10">${line}</table>`;
                    }
                    if (line.startsWith("- ")) {
                      return `<li class="ml-6">${line.substring(2)}</li>`;
                    }
                    if (line.startsWith("1. ")) {
                      return `<li class="ml-6 list-decimal">${line.substring(3)}</li>`;
                    }
                    if (line.trim() === "") {
                      return "<br />";
                    }
                    if (line.startsWith("```")) {
                      return `<pre class="bg-[#161B24] p-4 rounded-lg overflow-x-auto my-4"><code class="text-[#00FF88] text-sm font-mono">${line.substring(3)}</code></pre>`;
                    }
                    return `<p>${line}</p>`;
                  })
                  .join(""),
              }}
            />
          </article>
        </div>
      </section>

      {/* CTA - Next steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#161B24]/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 border border-[#00FF88]/20 bg-[#161B24]/50">
            <h3 className="text-2xl font-bold text-[#F0F1F5] mb-3">
              ¿Quieres aprender más?
            </h3>
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
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-8">
              Artículos relacionados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="p-6 rounded-xl border border-white/5 bg-[#161B24]/30 hover:border-[#00FF88]/20 transition-all duration-300 h-full">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-xs font-medium mb-3">
                      {relatedPost.category}
                    </div>

                    <h3 className="text-lg font-semibold text-[#F0F1F5] mb-2 group-hover:text-[#00FF88] transition-colors">
                      {relatedPost.title}
                    </h3>

                    <p className="text-[#9DA5B4]/60 text-sm mb-4 line-clamp-2">
                      {relatedPost.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#9DA5B4]/50">
                      <span>{relatedPost.readTime}</span>
                      <span className="text-[#00FF88]">Leer →</span>
                    </div>
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
          <div className="p-8 rounded-3xl border border-[#00FF88]/20"
            style={{ background: "linear-gradient(135deg, rgba(22,27,36,0.5) 0%, rgba(13,17,23,0.8) 100%)" }}>
            <div className="text-4xl mb-4">📧</div>
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-3">
              Artículos nuevos cada semana
            </h2>
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
