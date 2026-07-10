import { NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      interest,
      state,
      message,
    } = body as {
      name?: string;
      phone?: string;
      email?: string;
      interest?: string;
      state?: string;
      message?: string;
    };

    if (!name || !phone || !interest || !state || !message) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    await sendLeadEmail({
      subject: "Nuevo mensaje desde MR Inmobiliaria",
      title: "Nuevo mensaje de contacto",
      fields: [
        { label: "Nombre", value: name },
        { label: "Teléfono", value: phone },
        { label: "Correo", value: email },
        { label: "Interés", value: interest },
        { label: "Estado de interés", value: state },
      ],
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("CONTACT FORM ERROR:", error);

    return NextResponse.json(
      { error: "No se pudo enviar el mensaje." },
      { status: 500 }
    );
  }
}