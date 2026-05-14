import { NextResponse, type NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-admin-secret");
    if (authHeader !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, context } = await request.json();

    if (!type || !context) {
      return NextResponse.json(
        { error: "type y context son requeridos" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY no está configurado" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let prompt = "";

    if (type === "blog") {
      prompt = `Eres un escritor de contenido para DeFi Venezuela, una plataforma educativa sobre criptomonedas y Web3 para venezolanos. Escribe un artículo de blog basado en estas instrucciones: "${context}"

Reglas:
- Tono amigable, cercano, como explicándole a un amigo
- Nada de jerga técnica sin explicar primero qué significa
- Incluye emojis relevantes
- Usa ejemplos prácticos con contexto venezolano (remesas, bolívares, dólares)
- Longitud: 600-900 palabras
- El contenido debe estar en HTML con etiquetas <h2>, <p>, <ul>, <li>, <strong> etc
- NO incluyas <html>, <body>, <head> — solo el contenido

Responde ÚNICAMENTE con JSON válido en esta estructura exacta (sin markdown, sin código blocks, solo JSON puro):
{
  "title": "Título del artículo",
  "description": "Una descripción corta del artículo (máx 160 caracteres)",
  "category": "DeFi",
  "tags": ["tag1", "tag2", "tag3"],
  "readTime": "8 min",
  "content": "HTML del artículo"
}`;
    } else if (type === "newsletter") {
      prompt = `Eres el editor del newsletter semanal de DeFi Venezuela. Escribe una edición basada en estas instrucciones: "${context}"

Reglas:
- Tono conversacional, como una carta de un amigo
- Simple y fácil de entender para alguien que no sabe de crypto
- Incluye emojis relevantes
- Secciones: introducción, contenido principal, tips o recursos, cierre motivador
- El HTML debe ser email-compatible con estilos inline

Responde ÚNICAMENTE con JSON válido en esta estructura exacta:
{
  "title": "Newsletter #1 — Tema principal",
  "content_html": "HTML completo del email con estilos inline"
}

El HTML debe usar colores: fondo #0D1117, texto #F0F1F5, acento #00FF88, texto secundario #9DA5B4
Incluir el logo "DefiVenezuela" al inicio y un footer al final.`;
    } else {
      return NextResponse.json(
        { error: 'type debe ser "blog" o "newsletter"' },
        { status: 400 }
      );
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Intentar parsear el JSON de la respuesta
    let parsedContent: any;

    try {
      parsedContent = JSON.parse(responseText);
    } catch {
      // Si no es JSON válido, intentar extraer JSON del texto
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No se pudo parsear la respuesta de IA como JSON");
      }
      parsedContent = JSON.parse(jsonMatch[0]);
    }

    return NextResponse.json({
      success: true,
      content: parsedContent,
    });
  } catch (error) {
    console.error("Error en ai-generate:", error);
    return NextResponse.json(
      {
        error: "Error al generar contenido",
        details: (error as Error)?.message,
      },
      { status: 500 }
    );
  }
}
