import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Cron job que se ejecuta cada lunes a las 9am
 * Genera un borrador de newsletter que debe ser aprobado por admin
 *
 * Para Vercel, agregar en vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/newsletter",
 *     "schedule": "0 9 * * 1"  // Lunes 9am UTC
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  // Validar que sea llamado desde Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = await createClient();

    // Obtener el número de la última edición publicada
    const { data: lastIssue } = await supabase
      .from("newsletter_issues")
      .select("issue_number")
      .order("issue_number", { ascending: false })
      .limit(1);

    const nextIssueNumber = (lastIssue?.[0]?.issue_number ?? 0) + 1;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://defivenezuela.com";
    const today = new Date().toLocaleDateString("es-VE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Generar contenido de prueba del newsletter
    // En producción, aquí iría:
    // 1. Obtener noticias de RSS feeds
    // 2. Procesar con Claude API para summarizar
    // 3. Crear HTML profesional
    const newsletterHTML = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#F0F1F5;padding:40px;border-radius:16px;">
        <div style="margin-bottom:32px;border-bottom:1px solid rgba(0,255,136,0.2);padding-bottom:24px;">
          <span style="font-size:28px;font-weight:bold;color:#F0F1F5;">DeFi<span style="color:#00FF88">Venezuela</span></span>
          <p style="color:#9DA5B4;font-size:12px;margin-top:8px;margin-bottom:0;">Edición #${nextIssueNumber} — ${today}</p>
        </div>

        <div style="margin-bottom:24px;">
          <h2 style="color:#F0F1F5;font-size:20px;margin-bottom:16px;">Esta semana en Web3 🚀</h2>
          <p style="color:#9DA5B4;line-height:1.8;margin-bottom:0;">
            Contenido de prueba. Este newsletter será generado automáticamente cada lunes con:
          </p>
          <ul style="color:#9DA5B4;line-height:1.8;margin-top:8px;">
            <li>📰 Top 3 noticias de la semana en crypto</li>
            <li>🇻🇪 Oportunidades específicas para Venezuela</li>
            <li>📈 Análisis de mercado semanal</li>
            <li>💡 Herramientas y recursos destacados</li>
            <li>🔗 Links curados de la comunidad</li>
          </ul>
        </div>

        <div style="background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.2);border-radius:12px;padding:16px;margin-bottom:24px;">
          <p style="color:#00FF88;font-weight:bold;margin-bottom:8px;margin-top:0;">ℹ️ Estado: Pendiente de aprobación</p>
          <p style="color:#9DA5B4;font-size:12px;margin:0;">
            Este es un borrador automático. El admin debe revisar y aprobar en el dashboard antes de enviarlo a los suscriptores.
          </p>
        </div>

        <div style="text-align:center;margin-bottom:24px;">
          <a href="${baseUrl}/admin/newsletters" style="display:inline-block;background:#00FF88;color:#0D1117;font-weight:bold;padding:12px 24px;border-radius:12px;text-decoration:none;font-size:14px;">
            Revisar en Admin
          </a>
        </div>

        <p style="color:#9DA5B4;font-size:12px;border-top:1px solid rgba(255,255,255,0.05);padding-top:16px;margin:0;">
          Recibiste este email porque te suscribiste al newsletter de DeFi Venezuela.
          <a href="${baseUrl}/user?tab=notificaciones" style="color:#00FF88;text-decoration:none;">Gestionar preferencias</a>
        </p>
      </div>
    `;

    // Crear draft en la base de datos
    const { data: draft, error: draftError } = await supabase
      .from("newsletter_drafts")
      .insert({
        title: `Newsletter #${nextIssueNumber} — ${today}`,
        content_html: newsletterHTML,
      })
      .select()
      .single();

    if (draftError) {
      console.error("Error creating draft:", draftError);
      return NextResponse.json(
        { error: "Error al crear draft del newsletter" },
        { status: 500 }
      );
    }

    // Notificar al admin por email que hay un nuevo draft
    const adminEmail = process.env.ADMIN_EMAIL || "admin@defivenezuela.com";
    const { error: emailError } = await getResend().emails.send({
      from: "DeFi Venezuela <noreply@defivenezuela.com>",
      to: adminEmail,
      subject: `[ADMIN] Newsletter #${nextIssueNumber} lista para revisar`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#F0F1F5;padding:40px;border-radius:16px;">
          <h2 style="color:#F0F1F5;">Newsletter automático generado ✅</h2>
          <p style="color:#9DA5B4;line-height:1.6;">
            Se ha generado automáticamente el borrador del newsletter #${nextIssueNumber}.
          </p>
          <p style="color:#9DA5B4;line-height:1.6;margin-bottom:24px;">
            <strong>Próximos pasos:</strong><br/>
            1. Revisar el contenido en el dashboard<br/>
            2. Hacer cambios si es necesario<br/>
            3. Aprobar y enviar a los suscriptores
          </p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/newsletters" style="display:inline-block;background:#00FF88;color:#0D1117;font-weight:bold;padding:12px 24px;border-radius:12px;text-decoration:none;">
            Ir al Admin
          </a>
          <p style="color:#9DA5B4;font-size:12px;margin-top:32px;border-top:1px solid rgba(255,255,255,0.05);padding-top:16px;margin-bottom:0;">
            Este es un email automático del sistema de notificaciones de DefiVenezuela.
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.warn("Warning: Email notification failed:", emailError);
      // No fallar si el email no se envía, solo advertir
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter #${nextIssueNumber} draft created`,
      draftId: draft?.id,
    });
  } catch (error) {
    console.error("Error in newsletter cron:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
