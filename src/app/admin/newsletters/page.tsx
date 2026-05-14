import { createClient } from "@/lib/supabase/server";
import NewslettersClient from "./NewslettersClient";

export const metadata = {
  title: "Gestionar Newsletters",
  robots: "noindex",
};

export default async function NewslettersPage() {
  const supabase = await createClient();

  // Fetch pending drafts
  const { data: draftsData } = await supabase
    .from("newsletter_drafts")
    .select("*")
    .order("generated_at", { ascending: false });

  const drafts = draftsData || [];

  // Fetch published issues
  const { data: publishedData } = await supabase
    .from("newsletter_issues")
    .select("*")
    .order("sent_at", { ascending: false });

  const published = publishedData || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#F0F1F5] mb-2">
          Gestionar Newsletters
        </h1>
        <p className="text-[#9DA5B4]/70">
          Revisa y aprueba borradores antes de enviar
        </p>
      </div>

      {/* Pending Drafts Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#F0F1F5] mb-4 flex items-center gap-2">
          <span className="text-[#00FF88]">●</span>
          Borradores Pendientes ({drafts.length})
        </h2>

        {drafts.length === 0 ? (
          <div className="p-6 rounded-lg border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#9DA5B4]">
            No hay borradores pendientes en este momento.
          </div>
        ) : (
          <NewslettersClient initialDrafts={drafts} />
        )}
      </div>

      {/* Published Issues Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#F0F1F5] mb-4 flex items-center gap-2">
          <span className="text-[#00FF88]">●</span>
          Newsletters Publicados ({published.length})
        </h2>

        {published.length === 0 ? (
          <div className="p-6 rounded-lg border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#9DA5B4]">
            No hay newsletters publicados aún.
          </div>
        ) : (
          <div className="space-y-3">
            {published.map((issue) => (
              <div
                key={issue.id}
                className="p-4 rounded-lg border border-[#00FF88]/30 bg-[#0D1117]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded bg-[#00FF88]/20 text-[#00FF88] text-xs font-semibold">
                        #{issue.issue_number}
                      </span>
                      <h3 className="text-lg font-semibold text-[#F0F1F5] truncate">
                        {issue.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#9DA5B4]/60">
                      <span>
                        Enviado:{" "}
                        {new Date(issue.sent_at).toLocaleString("es-VE")}
                      </span>
                      <span>
                        Suscriptores: <span className="text-[#00FF88]">{issue.sent_to}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
