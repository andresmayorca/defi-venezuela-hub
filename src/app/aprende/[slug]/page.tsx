"use client";

export default function TrackPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="text-center">
        <div className="text-8xl mb-6 animate-bounce">🚀</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#F0F1F5] mb-4">
          Pronto...
        </h1>
        <p className="text-xl text-[#9DA5B4]/70 mb-8 max-w-md mx-auto">
          Este track está en producción. Estamos creando el mejor contenido para ti.
        </p>
        <a
          href="/aprende"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00FF88] text-[#0D1117] font-semibold text-sm hover:bg-[#00e67a] transition-colors"
        >
          ← Volver a tracks
        </a>
      </div>
    </div>
  );
}
