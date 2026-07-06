import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  Home,
  MapPin,
  MessageCircle,
  Ruler,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  getPropertyFeaturesForCard,
  getPropertyLocation,
  getPropertyPriceLabel,
  getPropertyWhatsAppType,
} from "@/lib/property-format";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Property } from "@/types/property";

type PropertyCardProps = {
  property: Property;
};

function getIcon(index: number) {
  const icons = [
    <BedDouble key="bed" size={17} />,
    <Bath key="bath" size={17} />,
    <Ruler key="ruler" size={17} />,
    <Car key="car" size={17} />,
  ];

  return icons[index] || <Building2 size={17} />;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const location = getPropertyLocation(property);
  const price = getPropertyPriceLabel(property);
  const features = getPropertyFeaturesForCard(property);
  const whatsappType = getPropertyWhatsAppType(property);

  const whatsappUrl = buildWhatsAppUrl({
    type: whatsappType,
    propertyName: property.title,
  });

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-black/10 bg-[#FFFDF8] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#C9A24A]/60 hover:shadow-xl hover:shadow-black/10">
      <Link href={`/propiedades/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0B0B0B]">
          {property.mainImage ? (
            <Image
              src={property.mainImage}
              alt={property.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(201,162,74,0.35),transparent_35%),linear-gradient(135deg,#252525,#0B0B0B)]">
              <div className="text-center text-[#F7F3EA]">
                <Home className="mx-auto mb-3 text-[#C9A24A]" size={42} />
                <p className="text-sm font-medium">Imagen de propiedad</p>
              </div>
            </div>
          )}

          <div className="absolute left-4 top-4 flex gap-2">
            <Badge variant="dark">{property.operation}</Badge>
          </div>

          {property.featured && (
            <div className="absolute right-4 top-4">
              <Badge variant="gold">Destacada</Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-start gap-2 text-sm text-[#6F6A60]">
          <MapPin className="mt-0.5 shrink-0 text-[#C9A24A]" size={17} />
          <span>{location}</span>
        </div>

        <Link href={`/propiedades/${property.slug}`}>
          <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[#0B0B0B] transition group-hover:text-[#C9A24A]">
            {property.title}
          </h2>
        </Link>

        <p className="mt-4 text-lg font-bold text-[#252525]">{price}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-black/10 py-5 text-sm text-[#6F6A60]">
          {features.slice(0, 4).map((feature, index) => (
            <div key={`${property.id}-${feature}`} className="flex items-center gap-2">
              <span className="text-[#C9A24A]">{getIcon(index)}</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href={`/propiedades/${property.slug}`} className="w-full">
            Ver detalles
          </Button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[#0B0B0B] px-5 py-3 text-sm font-semibold text-[#0B0B0B] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>

        <Link
          href={`/propiedades/${property.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C9A24A] transition hover:text-[#0B0B0B]"
        >
          Ver ficha completa
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}