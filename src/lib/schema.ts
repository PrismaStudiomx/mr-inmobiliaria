import { siteConfig } from "@/config/site";
import {
  getPropertyLocation,
  getPropertyPriceLabel,
} from "@/lib/property-format";
import type { Property } from "@/types/property";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    description: siteConfig.description,
    email: siteConfig.email,
    url: siteConfig.url,
    areaServed: siteConfig.areas.map((area) => ({
      "@type": "State",
      name: area,
    })),
    slogan: siteConfig.slogan,
  };
}

export function propertySchema(property: Property) {
  const location = getPropertyLocation(property);
  const price = getPropertyPriceLabel(property);

  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: property.title,
    description: property.description,
    url: `${siteConfig.url}/propiedades/${property.slug}`,
    image: property.images.length > 0 ? property.images : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.cityZone,
      addressRegion: property.state,
      streetAddress:
        property.showExactAddress && property.exactAddress
          ? property.exactAddress
          : undefined,
    },
    floorSize:
      property.constructionM2 || property.totalSurfaceM2
        ? {
            "@type": "QuantitativeValue",
            value: property.constructionM2 || property.totalSurfaceM2,
            unitCode: "MTK",
          }
        : undefined,
    numberOfRooms: property.bedrooms || undefined,
    numberOfBathroomsTotal: property.bathrooms || undefined,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "MXN",
      price,
      businessFunction:
        property.operation === "Renta"
          ? "http://purl.org/goodrelations/v1#LeaseOut"
          : "http://purl.org/goodrelations/v1#Sell",
    },
    provider: {
      "@type": "RealEstateAgent",
      name: siteConfig.name,
      email: siteConfig.email,
    },
    areaServed: location,
  };
}