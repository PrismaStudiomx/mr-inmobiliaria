import type { Property } from "@/types/property";
import { formatCurrency } from "@/lib/utils";

function money(value?: number) {
  if (!value) return "";
  return `${formatCurrency(value)} MXN`;
}

export function getPropertyLocation(property: Property) {
  const base = `${property.cityZone}, ${property.state}`;

  if (property.neighborhoodReference) {
    return `${property.neighborhoodReference} · ${base}`;
  }

  return base;
}

export function getPropertyPriceLabel(property: Property) {
  const isSale = property.operation === "Venta";
  const isRent = property.operation === "Renta";
  const isBoth = property.operation === "Venta y renta";

  if (isSale) {
    return property.showSalePrice && property.salePrice
      ? money(property.salePrice)
      : "Solicitar información";
  }

  if (isRent) {
    return property.showRentPrice && property.rentPrice
      ? `${money(property.rentPrice)} / mes`
      : "Solicitar información";
  }

  if (isBoth) {
    const sale = property.showSalePrice && property.salePrice
      ? `Venta ${money(property.salePrice)}`
      : "Venta: solicitar información";

    const rent = property.showRentPrice && property.rentPrice
      ? `Renta ${money(property.rentPrice)} / mes`
      : "Renta: solicitar información";

    if (!property.showSalePrice && !property.showRentPrice) {
      return "Venta y renta disponibles";
    }

    return `${sale} · ${rent}`;
  }

  return "Solicitar información";
}

export function getPropertyWhatsAppType(property: Property) {
  if (property.operation === "Venta y renta") {
    return "propiedad-venta-renta" as const;
  }

  const hidesPrice =
    (property.operation === "Venta" && !property.showSalePrice) ||
    (property.operation === "Renta" && !property.showRentPrice);

  if (hidesPrice) {
    return "propiedad-sin-precio" as const;
  }

  return "propiedad" as const;
}

export function getPropertyFeaturesForCard(property: Property) {
  if (property.category === "Terreno") {
    return [
      property.totalSurfaceM2 ? `${property.totalSurfaceM2} m²` : null,
      property.suggestedUse || null,
      property.services?.[0] || null,
    ].filter(Boolean) as string[];
  }

  if (property.category === "Comercial") {
    return [
      property.totalSurfaceM2 ? `${property.totalSurfaceM2} m²` : null,
      property.suggestedUse || "Comercial",
      property.bathrooms > 0 ? `${property.bathrooms} baños` : null,
      property.parkingSpaces > 0 ? `${property.parkingSpaces} est.` : null,
    ].filter(Boolean) as string[];
  }

  return [
    property.bedrooms > 0 ? `${property.bedrooms} rec.` : null,
    property.bathrooms > 0 ? `${property.bathrooms} baños` : null,
    property.constructionM2 ? `${property.constructionM2} m²` : null,
    property.parkingSpaces > 0 ? `${property.parkingSpaces} est.` : null,
  ].filter(Boolean) as string[];
}