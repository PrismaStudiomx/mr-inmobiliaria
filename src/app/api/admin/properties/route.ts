import { NextResponse } from "next/server";

import { createSlug } from "@/lib/slug";
import { createClient } from "@/lib/supabase/server";

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

function cleanText(value?: string | null) {
  if (!value) return null;
  const cleaned = value.trim();
  return cleaned.length > 0 ? cleaned : null;
}

async function getUniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  title: string
) {
  const baseSlug = createSlug(title);
  let slug = baseSlug;

  const { data } = await supabase
    .from("properties")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (data) {
    slug = `${baseSlug}-${Date.now().toString().slice(-5)}`;
  }

  return slug;
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "No autorizado." },
      { status: 401 }
    );
  }

  const payload = (await request.json()) as PropertyPayload;

  if (!payload.title || !payload.cityZone || !payload.description) {
    return NextResponse.json(
      { error: "Faltan datos obligatorios." },
      { status: 400 }
    );
  }

  const slug = await getUniqueSlug(supabase, payload.title);

  const { data, error } = await supabase
    .from("properties")
    .insert({
      title: payload.title.trim(),
      slug,

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

      created_by: user.id,
    })
    .select("id")
    .single();

  if (error) {
    console.log("CREATE PROPERTY ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: data.id });
}