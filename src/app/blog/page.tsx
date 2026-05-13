import Link from "next/link";
import { ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Blog — DefiVenezuela",
  description: "Artículos sobre DeFi, Web3, IA agéntica y finanzas descentralizadas para venezolanos.",
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF88]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#161B24]/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-[#9DA5B4]/50 mb-6">
            <Link href="/" className="hover:text-[#00FF88] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#9DA5B4]">Blog</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-6 leading-tight">
              Blog de DefiVenezuela
            </h1>
            <p className="text-xl text-[#9DA5B4]/70 leading-relaxed">
              Artículos prácticos sobre DeFi, Web3, IA agéntica y cómo aplicarlo a la realidad venezolana.
            </p>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#00FF88] text-sm font-semibold tracking-widest uppercase mb-4">
              Destacado
            </p>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block"
            >
              <div className="rounded-2xl p-8 border border-[#00FF88]/30 bg-gradient-to-br from-[#161B24] to-[#0F1319] hover:border-[#00FF88]/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-xs font-medium mb-4">
                      {featuredPost.category}
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-[#F0F1F5] mb-4 group-hover:text-[#00FF88] transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-[#9DA5B4]/60 text-lg mb-6">
                      {featuredPost.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-[#9DA5B4]/50">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#00FF88]" />
                        {new Date(featuredPost.date).toLocaleDateString("es-VE", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#00FF88]" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
                      ✨
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Other posts grid */}
      {otherPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-8">
              Más artículos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="h-full p-6 rounded-2xl border border-white/5 bg-[#161B24]/30 hover:border-[#00FF88]/20 transition-all duration-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-xs font-medium mb-4">
                      {post.category}
                    </div>

                    <h3 className="text-xl font-semibold text-[#F0F1F5] mb-3 group-hover:text-[#00FF88] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-[#9DA5B4]/60 text-sm mb-6 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#9DA5B4]/50">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-[#00FF88]" />
                        {new Date(post.date).toLocaleDateString("es-VE", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-[#00FF88]" />
                        {post.readTime}
                      </div>
                      <span className="text-[#00FF88] group-hover:translate-x-1 transition-transform">
                        →
                      </span>
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
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-2xl font-bold text-[#F0F1F5] mb-3">
              Nuevo contenido cada semana
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
