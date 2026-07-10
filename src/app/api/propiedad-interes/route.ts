import { NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      message,
      propertyName,
      propertyUrl,
      operation,
      location,
    } = body as {
      name?: string;
      phone?: string;
      message?: string;
      propertyName?: string;
      propertyUrl?: string;
      operation?: string;
      location?: string;
    };

    if (!name || !phone || !message || !propertyName) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    await sendLeadEmail({
      subject: `Interés en propiedad — ${propertyName}`,
      title: "Interés en propiedad",
      fields: [
        { label: "Nombre", value: name },
        { label: "Teléfono", value: phone },
        { label: "Propiedad", value: propertyName },
        { label: "Operación", value: operation },
        { label: "Ubicación", value: location },
        { label: "URL", value: propertyUrl },
      ],
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("PROPERTY INTEREST FORM ERROR:", error);

    return NextResponse.json(
      { error: "No se pudo enviar la solicitud." },
      { status: 500 }
    );
  }
}