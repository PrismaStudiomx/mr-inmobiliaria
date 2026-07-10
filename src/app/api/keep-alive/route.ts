import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!process.env.KEEP_ALIVE_SECRET) {
    return NextResponse.json(
      { error: "KEEP_ALIVE_SECRET no está configurado." },
      { status: 500 }
    );
  }

  if (secret !== process.env.KEEP_ALIVE_SECRET) {
    return NextResponse.json(
      { error: "No autorizado." },
      { status: 401 }
    );
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("keep_alive")
    .upsert({
      id: "main",
      last_ping: new Date().toISOString(),
    });

  if (error) {
    console.log("KEEP ALIVE ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Keep alive ejecutado correctamente.",
    lastPing: new Date().toISOString(),
  });
}