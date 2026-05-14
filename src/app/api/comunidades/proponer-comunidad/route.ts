import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, dedicacion, twitter, website, otras_redes } = body;

    // Validación de campos requeridos
    if (!nombre || !dedicacion || !twitter) {
      return NextResponse.json(
        {
          error:
            "Los campos: nombre, dedicacion y twitter son requeridos",
        },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "andresmayorcaa@gmail.com";

    // Preparar email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #161B24 0%, #0F1319 100%); color: #00FF88; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 24px; }
          .label { font-weight: 600; color: #00FF88; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
          .value { background: #f5f5f5; padding: 12px; border-radius: 6px; color: #333; }
          .optional { color: #999; font-size: 12px; font-style: italic; }
          .footer { border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #999; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🤝 Nueva propuesta de comunidad</h1>
          </div>

          <div class="section">
            <div class="label">Nombre de la comunidad</div>
            <div class="value">${nombre}</div>
          </div>

          <div class="section">
            <div class="label">¿A qué se dedica?</div>
            <div class="value" style="white-space: pre-wrap;">${dedicacion}</div>
          </div>

          <div class="section">
            <div class="label">Twitter</div>
            <div class="value">${twitter}</div>
          </div>

          ${
            website
              ? `
          <div class="section">
            <div class="label">Página web</div>
            <div class="value"><a href="${website}" style="color: #00FF88; text-decoration: none;">${website}</a></div>
          </div>
          `
              : ""
          }

          ${
            otras_redes
              ? `
          <div class="section">
            <div class="label">Otras redes</div>
            <div class="value" style="white-space: pre-wrap;">${otras_redes}</div>
          </div>
          `
              : ""
          }

          <div class="footer">
            <p>Propuesta recibida a través del formulario de DeFi Venezuela</p>
            <p>Responde a este correo o contacta directamente para validar y agregar la comunidad al directorio.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar email al admin
    const { error: sendError } = await getResend().emails.send({
      from: "DeFi Venezuela <test@resend.dev>",
      to: adminEmail,
      subject: `[COMUNIDAD] Nueva propuesta: ${nombre}`,
      html: emailHTML,
    });

    if (sendError) {
      console.error("Error enviando email:", JSON.stringify(sendError, null, 2));
      return NextResponse.json(
        {
          error: "Error al enviar el email",
          details: sendError?.message || "Error desconocido"
        },
        { status: 500 }
      );
    }

    // Enviar email de confirmación al usuario (si lo deseas)
    const confirmationHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #161B24 0%, #0F1319 100%); color: #00FF88; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
          .content { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .footer { border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #999; text-align: center; }
          a { color: #00FF88; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">✅ Propuesta recibida</h1>
          </div>

          <div class="content">
            <p>¡Gracias por proponer tu comunidad a DeFi Venezuela!</p>
            <p>Hemos recibido tu solicitud para agregar <strong>${nombre}</strong> al directorio de comunidades.</p>
            <p>Nos pondremos en contacto en los próximos días para validar la información y proceder con la inclusión.</p>
          </div>

          <div className="footer">
            <p>Si tienes dudas, puedes responder a este correo.</p>
            <p>DeFi Venezuela Hub Web3</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return NextResponse.json({
      success: true,
      message: "Propuesta enviada exitosamente",
    });
  } catch (error) {
    console.error("Error en proponer-comunidad:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
