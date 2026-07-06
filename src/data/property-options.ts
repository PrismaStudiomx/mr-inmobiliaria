import type {
  PropertyCategory,
  PropertyOperation,
  PropertyState,
  PublicationStatus,
} from "@/types/property";

export const propertyCategories: PropertyCategory[] = [
  "Casa",
  "Departamento",
  "Terreno",
  "Comercial",
];

export const propertyOperations: PropertyOperation[] = [
  "Venta",
  "Renta",
  "Venta y renta",
];

export const propertyStates: PropertyState[] = [
  "Nuevo León",
  "Tamaulipas",
  "Yucatán",
  "Campeche",
  "Quintana Roo",
];

export const publicationStatuses: PublicationStatus[] = [
  "Disponible",
  "Pausada",
  "Vendida",
  "Rentada",
];

export const suggestedUses = [
  "Habitacional",
  "Comercial",
  "Inversión",
  "Desarrollo",
  "Mixto",
  "No especificado",
] as const;

export const propertyFeatures = [
  "Sala",
  "Comedor",
  "Cocina",
  "Patio",
  "Área de lavado",
  "Cochera",
  "Jardín",
  "Terraza",
  "Balcón",
  "Alberca",
  "Seguridad",
  "Servicios disponibles",
  "Cerca de avenidas",
  "Zona residencial",
  "Zona comercial",
] as const;