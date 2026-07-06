export type PropertyCategory =
  | "Casa"
  | "Departamento"
  | "Terreno"
  | "Comercial";

export type PropertyOperation =
  | "Venta"
  | "Renta"
  | "Venta y renta";

export type PropertyState =
  | "Nuevo León"
  | "Tamaulipas"
  | "Yucatán"
  | "Campeche"
  | "Quintana Roo";

export type PublicationStatus =
  | "Disponible"
  | "Pausada"
  | "Vendida"
  | "Rentada";

export type Property = {
  id: string;
  title: string;
  slug: string;

  category: PropertyCategory;
  operation: PropertyOperation;
  publicationStatus: PublicationStatus;
  featured: boolean;

  state: PropertyState;
  cityZone: string;
  neighborhoodReference?: string;
  showExactAddress: boolean;
  exactAddress?: string;

  showSalePrice: boolean;
  salePrice?: number;

  showRentPrice: boolean;
  rentPrice?: number;

  bedrooms: number;
  bathrooms: number;
  halfBathrooms: number;
  parkingSpaces: number;
  levels: number;

  constructionM2?: number;
  landM2?: number;
  totalSurfaceM2?: number;

  suggestedUse?: string;
  services?: string[];
  features: string[];

  shortDescription?: string;
  description: string;

  images: string[];
  mainImage?: string;

  createdAt: string;
  updatedAt: string;
};