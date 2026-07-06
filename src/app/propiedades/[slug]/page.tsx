import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { PropertyContactCard } from "@/components/properties/PropertyContactCard";
import { PropertyDetails } from "@/components/properties/PropertyDetails";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { demoProperties } from "@/data/demo-properties";
import {
  getPropertyLocation,
  getPropertyPriceLabel,
  getPropertyWhatsAppType,
} from "@/lib/property-format";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

type PropertyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getProperty(slug: string) {
  return demoProperties.find(
    (property) =>
      property.slug === slug && property.publicationStatus === "Disponible"
  );
}

export function generateStaticParams() {
  return demoProperties
    .filter((property) => property.publicationStatus === "Disponible")
    .map((property) => ({
      slug: property.slug,
    }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);

  if (!property) {
    return {
      title: "Propiedad no encontrada",
    };
  }

  const location = getPropertyLocation(property);
  const price = getPropertyPriceLabel(property);

  return {
    title: property.title,
    description: `${property.title} en ${location}. ${price}. Consulta más información con MR Inmobiliaria.`,
    openGraph: {
      title: `${property.title} | MR Inmobiliaria`,
      description: `${location} · ${property.operation} · ${price}`,
      images: property.mainImage ? [property.mainImage] : undefined,
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = getProperty(slug);

  if (!property) {
    notFound();
  }

  const location = getPropertyLocation(property);
  const price = getPropertyPriceLabel(property);

  const whatsappUrl = buildWhatsAppUrl({
    type: getPropertyWhatsAppType(property),
    propertyName: property.title,
  });

  const relatedProperties = demoProperties
    .filter(
      (item) =>
        item.id !== property.id &&
        item.publicationStatus === "Disponible" &&
        (item.category === property.category || item.state === property.state)
    )
    .slice(0, 3);

  return (
    <>
      <section className="bg-[#0B0B0B] py-16 text-[#FFFDF8] sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <Badge variant="gold">{property.category}</Badge>
              <Badge variant="dark" className="border border-white/20">
                {property.operation}
              </Badge>
              <Badge variant="light">{property.publicationStatus}</Badge>
            </div>

            <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight sm:text-6xl">
              {property.title}
            </h1>

            <div className="mt-5 flex items-center gap-2 text-[#F7F3EA]/80">
              <MapPin size={19} className="text-[#C9A24A]" />
              <span>{location}</span>
            </div>

            <p className="mt-6 text-2xl font-bold text-[#E6C875] sm:text-3xl">
              {price}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={whatsappUrl} external>
                <MessageCircle size={18} />
                Consultar por WhatsApp
              </Button>

              <Button
                href="/propiedades"
                variant="secondary"
                className="border-[#F7F3EA] text-[#F7F3EA] hover:bg-white/10"
              >
                Ver más propiedades
              </Button>
            </div>

            <p className="mt-6 border-l border-[#C9A24A] pl-4 text-sm font-semibold text-white">
              {siteConfig.slogan}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#FFFDF8] py-10 sm:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <PropertyGallery property={property} />
            <PropertyContactCard property={property} />
          </div>
        </Container>
      </section>

      <PropertyDetails property={property} />

      <section className="bg-[#FFFDF8] py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                Descripción
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                Descripción de la propiedad
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#6F6A60]">
                {property.description}
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-[#F7F3EA] p-6">
              <p className="font-serif text-3xl font-semibold text-[#0B0B0B]">
                Detalles adicionales
              </p>

              {property.features.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-black/10 bg-[#FFFDF8] px-4 py-2 text-sm font-medium text-[#252525]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-[#6F6A60]">
                  No hay detalles adicionales registrados.
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#F7F3EA] py-16">
        <Container>
          <div className="rounded-[2rem] bg-[#FFFDF8] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
              Ubicación
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
              {location}
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#6F6A60]">
              {property.showExactAddress && property.exactAddress
                ? property.exactAddress
                : "La ubicación exacta puede compartirse al solicitar información."}
            </p>

            <div className="mt-7">
              <Button href={whatsappUrl} external>
                Preguntar por ubicación
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {relatedProperties.length > 0 && (
        <section className="bg-[#FFFDF8] py-16">
          <Container>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                  Recomendadas
                </p>
                <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                  También te puede interesar
                </h2>
              </div>

              <Button href="/propiedades" variant="secondary">
                Ver más propiedades
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProperties.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-[#0B0B0B] py-16 text-[#FFFDF8]">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-4xl font-semibold">
              ¿Quieres comprar, vender o rentar?
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#F7F3EA]/75">
              Estamos a tus órdenes para ayudarte a encontrar una propiedad o
              publicar la tuya con MR Inmobiliaria.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button href={buildWhatsAppUrl({ type: "general" })} external>
                Contactar por WhatsApp
              </Button>

              <Button
                href="/propiedades"
                variant="secondary"
                className="border-[#F7F3EA] text-[#F7F3EA] hover:bg-white/10"
              >
                Ver catálogo
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}