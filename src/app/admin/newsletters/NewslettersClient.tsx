"use client";

import { useState } from "react";
import NewsletterPreview from "@/components/admin/NewsletterPreview";
import { Eye } from "lucide-react";

interface Newsletter {
  id: string;
  title: string;
  content_html: string;
  generated_at: string;
  approved_at?: string;
  approved_by?: string;
}

interface NewslettersClientProps {
  initialDrafts: Newsletter[];
}

export default function NewslettersClient({
  initialDrafts,
}: NewslettersClientProps) {
  const [selectedDraft, setSelectedDraft] = useState<Newsletter | null>(null);
  const [drafts, setDrafts] = useState(initialDrafts);

  const handleSuccess = () => {
    // Remove the draft from the list after successful approval/rejection
    setDrafts((prev) =>
      prev.filter((d) => d.id !== selectedDraft?.id)
    );
    setSelectedDraft(null);
  };

  return (
    <>
      <div className="space-y-3">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="p-4 rounded-lg border border-[#00FF88]/30 bg-[#0D1117] hover:bg-[#161B24] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-[#F0F1F5] truncate">
                  {draft.title}
                </h3>
                <p className="text-xs text-[#9DA5B4]/50 mt-1">
                  Generado:{" "}
                  {new Date(draft.generated_at).toLocaleString("es-VE")}
                </p>
              </div>
              <button
                onClick={() => setSelectedDraft(draft)}
                className="px-4 py-2 rounded-lg bg-[#00FF88]/10 text-[#00FF88] hover:bg-[#00FF88]/20 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
              >
                <Eye className="w-4 h-4" />
                Ver y Aprobar
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDraft && (
        <NewsletterPreview
          newsletter={selectedDraft}
          onClose={() => setSelectedDraft(null)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
