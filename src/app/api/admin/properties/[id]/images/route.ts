import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

function cleanFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: Request, { params }: RouteProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { data: adminUser, error: adminError } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (adminError || !adminUser) {
    return NextResponse.json(
      { error: "El usuario no tiene permisos de administrador." },
      { status: 403 }
    );
  }

  const adminSupabase = createAdminClient();

  const formData = await request.formData();

  const files = formData
    .getAll("images")
    .filter((item): item is File => item instanceof File);

  if (files.length === 0) {
    return NextResponse.json(
      { error: "No se recibieron imágenes." },
      { status: 400 }
    );
  }

  const { count, error: countError } = await adminSupabase
    .from("property_images")
    .select("id", { count: "exact", head: true })
    .eq("property_id", id);

  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }

  const { data: existingMain } = await adminSupabase
    .from("property_images")
    .select("id")
    .eq("property_id", id)
    .eq("is_main", true)
    .maybeSingle();

  const startOrder = count || 0;
  const uploadedImages: string[] = [];

  for (const [index, file] of files.slice(0, 6).entries()) {
    const fileName = cleanFileName(file.name);
    const filePath = `${id}/${crypto.randomUUID()}-${fileName}`;

    const { error: uploadError } = await adminSupabase.storage
      .from("property-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || "image/jpeg",
      });

    if (uploadError) {
      console.log("UPLOAD IMAGE ERROR:", uploadError);

      return NextResponse.json(
        { error: `Error al subir imagen: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = adminSupabase.storage.from("property-images").getPublicUrl(filePath);

    const isMain = !existingMain && index === 0 && startOrder === 0;

    const { error: insertError } = await adminSupabase
      .from("property_images")
      .insert({
        property_id: id,
        url: publicUrl,
        alt: file.name,
        is_main: isMain,
        sort_order: startOrder + index,
      });

    if (insertError) {
      console.log("INSERT IMAGE ERROR:", insertError);

      return NextResponse.json(
        { error: `Error al guardar imagen en base de datos: ${insertError.message}` },
        { status: 500 }
      );
    }

    if (isMain) {
      const { error: mainImageError } = await adminSupabase
        .from("properties")
        .update({
          main_image_url: publicUrl,
        })
        .eq("id", id);

      if (mainImageError) {
        console.log("MAIN IMAGE UPDATE ERROR:", mainImageError);

        return NextResponse.json(
          { error: `Error al asignar imagen principal: ${mainImageError.message}` },
          { status: 500 }
        );
      }
    }

    uploadedImages.push(publicUrl);
  }

  return NextResponse.json({
    ok: true,
    images: uploadedImages,
  });
}