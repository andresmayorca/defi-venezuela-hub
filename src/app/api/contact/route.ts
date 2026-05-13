import { NextResponse, type NextRequest } from "next/server";

function getResend() {
  const { Resend } = require("resend");
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const resend = getResend();

    // Send to admin
    await resend.emails.send({
      from: "contacto@defivenezuela.com",
      to: process.env.ADMIN_EMAIL || "contacto@defivenezuela.com",
      subject: `Nuevo contacto: ${subject}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: "contacto@defivenezuela.com",
      to: email,
      subject: "Hemos recibido tu mensaje — DefiVenezuela",
      html: `
        <h2>¡Gracias por contactarte!</h2>
        <p>Hola ${name},</p>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto en menos de 24 horas.</p>
        <p><strong>Tu mensaje:</strong></p>
        <p>${subject}</p>
        <hr />
        <p>Mientras tanto, puedes explorar nuestro contenido:</p>
        <ul>
          <li><a href="https://defivenezuela.com/aprende">Aprende</a> — Tracks educativos sobre DeFi y Web3</li>
          <li><a href="https://defivenezuela.com/agentic-world">Agentic World</a> — La frontera de IA + Blockchain</li>
          <li><a href="https://defivenezuela.com/comunidades">Comunidades</a> — Únete a la comunidad cripto venezolana</li>
        </ul>
        <p>¡Bienvenido al futuro descentralizado!</p>
        <p>El equipo de DefiVenezuela</p>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Mensaje enviado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar contacto:", error);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}
