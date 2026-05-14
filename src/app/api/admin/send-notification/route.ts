import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const sectionLabels: Record<string, string> = {
  blog: "un nuevo artículo en el Blog",
  herramientas: "una nueva Herramienta",
  eventos: "un nuevo Evento",
  agentic: "nuevo contenido en Agentic World",
  aprende: "nuevo contenido en Aprende",
  empleos: "una nueva Oferta de Empleo",
  newsletter: "el nuevo Newsletter",
};

export async function POST(request: NextRequest) {
  // Autenticación con admin secret
  const authHeader = request.headers.get("x-admin-secret");
  if (authHeader !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { section, title, url } = await request.json();

    if (!section || !title) {
      return NextResponse.json(
        { error: "section y title son requeridos" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const label = sectionLabels[section] ?? "nuevo contenido";
    const column = `notify_${section}` as const;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://defivenezuela.com";

    // Obtener suscriptores que tengan habilitadas las notificaciones para esta sección
    const { data: subscribers, error: selectError } = await supabase
      .from("subscribers")
      .select("email")
      .eq(column as string, true);

    if (selectError) {
      return NextResponse.json({ error: selectError.message }, { status: 500 });
    }

    if (!subscribers?.length) {
      return NextResponse.json({
        sent: 0,
        message: "No hay suscriptores para esta sección",
      });
    }

    const emails = subscribers.map((s) => s.email);

    // Enviar emails con Resend
    const { data: sendData, error: sendError } = await getResend().emails.send({
      from: "DeFi Venezuela <noreply@defivenezuela.com>",
      to: emails,
      subject: `🇻🇪 Nuevo en DeFi Venezuela: ${title}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#F0F1F5;padding:40px;border-radius:16px;">
          <div style="margin-bottom:24px;">
            <span style="font-size:24px;font-weight:bold;color:#F0F1F5;">DeFi<span style="color:#00FF88">Venezuela</span></span>
          </div>
          <h2 style="color:#F0F1F5;margin-bottom:8px;">Hay ${label} 🚀</h2>
          <p style="color:#9DA5B4;font-size:16px;line-height:1.6;margin-bottom:24px;">
            <strong style="color:#F0F1F5;">${title}</strong> ya está disponible en DefiVenezuela.
          </p>
          <a href="${url ?? baseUrl}" style="display:inline-block;background:#00FF88;color:#0D1117;font-weight:bold;padding:14px 28px;border-radius:12px;text-decoration:none;font-size:15px;">
            Ver ahora →
          </a>
          <p style="color:#9DA5B4;font-size:12px;margin-top:32px;border-top:1px solid rgba(255,255,255,0.05);padding-top:16px;">
            Recibiste este correo porque te suscribiste a notificaciones de ${section === "newsletter" ? "nuestro newsletter" : `contenido de ${section}`} en DeFi Venezuela.
            <a href="${baseUrl}/user?tab=notificaciones" style="color:#00FF88;text-decoration:none;">Gestionar preferencias</a>
          </p>
        </div>
      `,
    });

    if (sendError) {
      return NextResponse.json({ error: sendError.message }, { status: 500 });
    }

    // Registrar en historial de notificaciones
    await supabase.from("notification_history").insert({
      section,
      title,
      url: url ?? null,
      recipients_count: emails.length,
    });

    return NextResponse.json({
      success: true,
      sent: emails.length,
      message: `Notificación enviada a ${emails.length} suscriptores`,
    });
  } catch (error) {
    console.error("Error en send-notification:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
