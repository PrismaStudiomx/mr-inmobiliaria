import { siteConfig } from "@/config/site";
import { formatPhoneForWhatsApp } from "@/lib/utils";

type WhatsAppMessageType =
  | "general"
  | "comprar"
  | "rentar"
  | "vender-rentar"
  | "publicar"
  | "propiedad"
  | "propiedad-venta-renta"
  | "propiedad-sin-precio";

type BuildWhatsAppUrlParams = {
  type?: WhatsAppMessageType;
  propertyName?: string;
  phone?: string;
};

const messages: Record<Exclude<WhatsAppMessageType, "propiedad" | "propiedad-venta-renta" | "propiedad-sin-precio">, string> = {
  general:
    "Hola, me gustaría recibir información de MR Inmobiliaria. Estoy interesado en comprar, vender o rentar una propiedad.",
  comprar:
    "Hola, estoy buscando comprar una propiedad y me gustaría conocer las opciones que tienen disponibles.",
  rentar:
    "Hola, estoy buscando rentar una propiedad y me gustaría conocer las opciones disponibles.",
  "vender-rentar":
    "Hola, tengo una propiedad que me gustaría vender o rentar con MR Inmobiliaria. Me gustaría platicarles los detalles.",
  publicar:
    "Hola, quiero compartirles una propiedad para venta o renta. Me gustaría saber cómo podemos trabajarla con MR Inmobiliaria.",
};

export function buildWhatsAppUrl({
  type = "general",
  propertyName,
  phone = siteConfig.whatsappPrincipal,
}: BuildWhatsAppUrlParams = {}) {
  const cleanPhone = formatPhoneForWhatsApp(phone);

  let message = messages.general;

  if (type in messages) {
    message = messages[type as keyof typeof messages];
  }

  if (type === "propiedad") {
    message = `Hola, me interesa esta propiedad de MR Inmobiliaria: ${propertyName}. Me gustaría recibir más información.`;
  }

  if (type === "propiedad-venta-renta") {
    message = `Hola, me interesa esta propiedad de MR Inmobiliaria: ${propertyName}. Me gustaría platicar si está disponible para venta o renta.`;
  }

  if (type === "propiedad-sin-precio") {
    message = `Hola, me interesa esta propiedad de MR Inmobiliaria: ${propertyName}. Me gustaría conocer más detalles.`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}