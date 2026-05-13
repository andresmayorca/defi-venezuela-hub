import { NextResponse } from "next/server";
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
  empleos: "una nueva Oferta de Empleo Web3",
};

export async function POST(request: Request) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const authHeader = request.headers.get("x-admin-secret");
  if (authHeader !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section, title, url } = await request.json();
  const label = sectionLabels[section] ?? "nuevo contenido";

  const supabase = await createClient();
  const column = `notify_${section}` as const;

  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("email")
    .eq(column as string, true);

  if (!subscribers?.length) {
    return NextResponse.json({ sent: 0 });
  }

  const emails = subscribers.map((s) => s.email);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://defivenezuela.com";

  const { data, error } = await getResend().emails.send({
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
          Recibiste este correo porque te suscribiste a notificaciones de DeFi Venezuela.
          <a href="${baseUrl}/user?tab=notificaciones" style="color:#00FF88;">Gestionar preferencias</a>
        </p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ sent: emails.length });
}
