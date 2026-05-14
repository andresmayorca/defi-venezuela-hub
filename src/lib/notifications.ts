/**
 * Cliente para enviar notificaciones desde el admin panel
 */

interface SendNotificationParams {
  section: "blog" | "herramientas" | "eventos" | "agentic" | "aprende" | "empleos" | "newsletter";
  title: string;
  url?: string;
}

interface SendNotificationResponse {
  success?: boolean;
  sent?: number;
  message?: string;
  error?: string;
}

export async function sendNotification(
  params: SendNotificationParams
): Promise<SendNotificationResponse> {
  try {
    const response = await fetch("/api/admin/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET || "",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.error || "Error al enviar notificación",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending notification:", error);
    return {
      error: "Error al conectar con el servidor",
    };
  }
}

/**
 * Obtener historial de notificaciones enviadas
 */
export async function getNotificationHistory(limit: number = 10) {
  try {
    const response = await fetch(`/api/admin/notification-history?limit=${limit}`);
    if (!response.ok) throw new Error("Error fetching history");
    return await response.json();
  } catch (error) {
    console.error("Error fetching notification history:", error);
    return [];
  }
}
