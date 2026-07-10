import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

import { createAdminClient } from "@/lib/supabase/admin";

type PropertyPayload = {
  title: string;
  category: string;
  operation: string;
  publicationStatus: string;
  featured: boolean;

  state: string;
  cityZone: string;
  neighborhoodReference?: string;

  showExactAddress: boolean;
  exactAddress?: string;

  showSalePrice: boolean;
  salePrice?: number | null;

  showRentPrice: boolean;
  rentPrice?: number | null;

  bedrooms: number;
  bathrooms: number;
  halfBathrooms: number;
  parkingSpaces: number;
  levels: number;

  constructionM2?: number | null;
  landM2?: number | null;
  totalSurfaceM2?: number | null;

  suggestedUse?: string;
  services: string[];
  features: string[];

  shortDescription?: string;
  description: string;
};

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

function cleanText(value?: string | null) {
  if (!value) return null;

  const cleaned = value.trim();

  return cleaned.length > 0 ? cleaned : null;
}

export async function PUT(request: Request, { params }: RouteProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const payload = (await request.json()) as PropertyPayload;

  if (!payload.title || !payload.cityZone || !payload.description) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios." },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("properties")
    .update({
      title: payload.title.trim(),

      category: payload.category,
      operation: payload.operation,
      publication_status: payload.publicationStatus,
      featured: payload.featured,

      state: payload.state,
      city_zone: payload.cityZone.trim(),
      neighborhood_reference: cleanText(payload.neighborhoodReference),

      show_exact_address: payload.showExactAddress,
      exact_address: cleanText(payload.exactAddress),

      show_sale_price: payload.showSalePrice,
      sale_price: payload.salePrice || null,

      show_rent_price: payload.showRentPrice,
      rent_price: payload.rentPrice || null,

      bedrooms: payload.bedrooms,
      bathrooms: payload.bathrooms,
      half_bathrooms: payload.halfBathrooms,
      parking_spaces: payload.parkingSpaces,
      levels: payload.levels,

      construction_m2: payload.constructionM2 || null,
      land_m2: payload.landM2 || null,
      total_surface_m2: payload.totalSurfaceM2 || null,

      suggested_use: cleanText(payload.suggestedUse),
      services: payload.services || [],
      features: payload.features || [],

      short_description: cleanText(payload.shortDescription),
      description: payload.description.trim(),
    })
    .eq("id", id);

  if (error) {
    console.log("UPDATE PROPERTY ERROR:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const payload = (await request.json()) as {
    publicationStatus?: "Disponible" | "Pausada" | "Vendida" | "Rentada";
    featured?: boolean;
  };

  const updateData: {
    publication_status?: string;
    featured?: boolean;
  } = {};

  if (payload.publicationStatus) {
    updateData.publication_status = payload.publicationStatus;
  }

  if (typeof payload.featured === "boolean") {
    updateData.featured = payload.featured;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { error: "No hay cambios para guardar." },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("properties")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.log("PATCH PROPERTY ERROR:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
export async function DELETE(_request: Request, { params }: RouteProps) {
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

  const { data: storageFiles } = await adminSupabase.storage
    .from("property-images")
    .list(id);

  if (storageFiles && storageFiles.length > 0) {
    const filesToRemove = storageFiles.map((file) => `${id}/${file.name}`);

    await adminSupabase.storage
      .from("property-images")
      .remove(filesToRemove);
  }

  const { error } = await adminSupabase
    .from("properties")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("DELETE PROPERTY ERROR:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}