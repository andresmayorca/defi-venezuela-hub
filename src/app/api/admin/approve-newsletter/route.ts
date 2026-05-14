import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  // Autenticación
  const authHeader = request.headers.get("x-admin-secret");
  if (authHeader !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { draftId, action } = await request.json();

    if (!draftId || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "draftId y action son requeridos" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Obtener el draft
    const { data: draft, error: draftError } = await supabase
      .from("newsletter_drafts")
      .select("*")
      .eq("id", draftId)
      .single();

    if (draftError || !draft) {
      return NextResponse.json(
        { error: "Draft no encontrado" },
        { status: 404 }
      );
    }

    if (action === "reject") {
      // Eliminar el draft rechazado
      await supabase.from("newsletter_drafts").delete().eq("id", draftId);

      return NextResponse.json({
        success: true,
        message: "Newsletter rechazado y eliminado",
      });
    }

    // ACTION: APPROVE
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://defivenezuela.com";

    // Obtener último issue_number
    const { data: lastIssue } = await supabase
      .from("newsletter_issues")
      .select("issue_number")
      .order("issue_number", { ascending: false })
      .limit(1);

    const nextIssueNumber = (lastIssue?.[0]?.issue_number ?? 0) + 1;

    // Obtener subscribers para newsletter
    const { data: subscribers, error: subscribersError } = await supabase
      .from("subscribers")
      .select("email")
      .eq("notify_newsletter", true);

    if (subscribersError || !subscribers?.length) {
      return NextResponse.json(
        {
          error: subscribersError?.message || "No hay suscriptores al newsletter",
        },
        { status: 500 }
      );
    }

    const emails = subscribers.map((s) => s.email);

    // Enviar newsletter a los suscriptores
    const { error: sendError } = await getResend().emails.send({
      from: "DeFi Venezuela <test@resend.dev>",
      to: emails,
      subject: draft.title,
      html: draft.content_html,
    });

    if (sendError) {
      return NextResponse.json({ error: sendError.message }, { status: 500 });
    }

    // Crear issue publicado
    const { error: issueError } = await supabase
      .from("newsletter_issues")
      .insert({
        issue_number: nextIssueNumber,
        title: draft.title,
        content_html: draft.content_html,
        sent_at: new Date().toISOString(),
        sent_to: emails.length,
      });

    if (issueError) {
      return NextResponse.json({ error: issueError.message }, { status: 500 });
    }

    // Eliminar el draft
    await supabase.from("newsletter_drafts").delete().eq("id", draftId);

    // Registrar en notification_history
    await supabase.from("notification_history").insert({
      section: "newsletter",
      title: draft.title,
      recipients_count: emails.length,
    });

    return NextResponse.json({
      success: true,
      message: `Newsletter #${nextIssueNumber} enviado a ${emails.length} suscriptores`,
      issueNumber: nextIssueNumber,
      sentTo: emails.length,
    });
  } catch (error) {
    console.error("Error approving newsletter:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
