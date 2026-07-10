import { demoProperties } from "@/data/demo-properties";
import { createClient } from "@/lib/supabase/server";
import type { Property } from "@/types/property";

type PropertyImageRow = {
  url: string;
  alt: string | null;
  is_main: boolean;
  sort_order: number;
};

type PropertyRow = {
  id: string;
  title: string;
  slug: string;

  category: Property["category"];
  operation: Property["operation"];
  publication_status: Property["publicationStatus"];
  featured: boolean;

  state: Property["state"];
  city_zone: string;
  neighborhood_reference: string | null;

  show_exact_address: boolean;
  exact_address: string | null;

  show_sale_price: boolean;
  sale_price: number | null;

  show_rent_price: boolean;
  rent_price: number | null;

  bedrooms: number;
  bathrooms: number;
  half_bathrooms: number;
  parking_spaces: number;
  levels: number;

  construction_m2: number | null;
  land_m2: number | null;
  total_surface_m2: number | null;

  suggested_use: string | null;
  services: string[] | null;
  features: string[] | null;

  short_description: string | null;
  description: string;

  main_image_url: string | null;

  created_at: string;
  updated_at: string;

  property_images?: PropertyImageRow[] | null;
};

const propertySelect = `
  *,
  property_images (
    url,
    alt,
    is_main,
    sort_order
  )
`;

function mapProperty(row: PropertyRow): Property {
  const imageRows = [...(row.property_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const images = imageRows.map((image) => image.url);
  const mainFromImages = imageRows.find((image) => image.is_main)?.url;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,

    category: row.category,
    operation: row.operation,
    publicationStatus: row.publication_status,
    featured: row.featured,

    state: row.state,
    cityZone: row.city_zone,
    neighborhoodReference: row.neighborhood_reference || undefined,

    showExactAddress: row.show_exact_address,
    exactAddress: row.exact_address || undefined,

    showSalePrice: row.show_sale_price,
    salePrice: row.sale_price || undefined,

    showRentPrice: row.show_rent_price,
    rentPrice: row.rent_price || undefined,

    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    halfBathrooms: row.half_bathrooms,
    parkingSpaces: row.parking_spaces,
    levels: row.levels,

    constructionM2: row.construction_m2 || undefined,
    landM2: row.land_m2 || undefined,
    totalSurfaceM2: row.total_surface_m2 || undefined,

    suggestedUse: row.suggested_use || undefined,
    services: row.services || [],
    features: row.features || [],

    shortDescription: row.short_description || undefined,
    description: row.description,

    images,
    mainImage: row.main_image_url || mainFromImages || images[0] || "",

    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAvailableProperties({
  useFallback = true,
}: {
  useFallback?: boolean;
} = {}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select(propertySelect)
    .eq("publication_status", "Disponible")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("GET AVAILABLE PROPERTIES ERROR:", error.message);
    return useFallback
      ? demoProperties.filter(
          (property) => property.publicationStatus === "Disponible"
        )
      : [];
  }

  const properties = ((data || []) as PropertyRow[]).map(mapProperty);

  if (properties.length === 0 && useFallback) {
    return demoProperties.filter(
      (property) => property.publicationStatus === "Disponible"
    );
  }

  return properties;
}

export async function getAvailablePropertyBySlug(
  slug: string,
  {
    useFallback = true,
  }: {
    useFallback?: boolean;
  } = {}
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select(propertySelect)
    .eq("slug", slug)
    .eq("publication_status", "Disponible")
    .maybeSingle();

  if (error) {
    console.log("GET PROPERTY BY SLUG ERROR:", error.message);
    return useFallback
      ? demoProperties.find(
          (property) =>
            property.slug === slug &&
            property.publicationStatus === "Disponible"
        ) || null
      : null;
  }

  if (!data && useFallback) {
    return (
      demoProperties.find(
        (property) =>
          property.slug === slug &&
          property.publicationStatus === "Disponible"
      ) || null
    );
  }

  return data ? mapProperty(data as PropertyRow) : null;
}

export async function getAdminProperties({
  useFallback = true,
}: {
  useFallback?: boolean;
} = {}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select(propertySelect)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("GET ADMIN PROPERTIES ERROR:", error.message);
    return useFallback ? demoProperties : [];
  }

  const properties = ((data || []) as PropertyRow[]).map(mapProperty);

  if (properties.length === 0 && useFallback) {
    return demoProperties;
  }

  return properties;
}

export async function getAdminPropertyById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select(propertySelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.log("GET ADMIN PROPERTY BY ID ERROR:", error.message);
    return demoProperties.find((property) => property.id === id) || null;
  }

  if (!data) {
    return demoProperties.find((property) => property.id === id) || null;
  }

  return mapProperty(data as PropertyRow);
}