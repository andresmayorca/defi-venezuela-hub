import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY no está configurado" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const adminEmail = process.env.ADMIN_EMAIL || "andresmayorcaa@gmail.com";

    // Intentar enviar email de test
    const { data, error } = await resend.emails.send({
      from: "test@resend.dev",
      to: adminEmail,
      subject: "🧪 Email de prueba - DeFi Venezuela",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0D1117;color:#F0F1F5;padding:40px;border-radius:16px;">
          <h2 style="color:#00FF88;">✅ Email de prueba</h2>
          <p style="color:#9DA5B4;">
            Este es un email de prueba para verificar que tu configuración de Resend está funcionando correctamente.
          </p>
          <p style="color:#9DA5B4;">
            Si recibes este email, significa que todo está configurado correctamente.
          </p>
          <hr style="border:none;border-top:1px solid rgba(0,255,136,0.2);margin:24px 0;">
          <p style="color:#9DA5B4;font-size:12px;">
            API Key: ${apiKey.substring(0, 20)}...
            <br/>
            To: ${adminEmail}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        {
          success: false,
          error: "Error al enviar email de prueba",
          details: error?.message || JSON.stringify(error),
          apiKeyStart: apiKey.substring(0, 20),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "✅ Email de prueba enviado exitosamente",
      details: {
        to: adminEmail,
        from: "noreply@defivenezuela.com",
        messageId: data?.id,
      },
    });
  } catch (error) {
    console.error("Error en test-email:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
        details: (error as Error)?.message || String(error),
      },
      { status: 500 }
    );
  }
}
