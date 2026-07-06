import {
  Bath,
  BedDouble,
  Building2,
  Car,
  Layers,
  MapPin,
  Ruler,
} from "lucide-react";

import type { Property } from "@/types/property";

type PropertyDetailsProps = {
  property: Property;
};

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-[#FFFDF8] p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F3EA] text-[#C9A24A]">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6F6A60]">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-[#0B0B0B]">{value}</p>
    </div>
  );
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const details = [];

  if (property.category !== "Terreno" && property.bedrooms > 0) {
    details.push({
      label: "Recámaras",
      value: `${property.bedrooms}`,
      icon: <BedDouble size={21} />,
    });
  }

  if (property.category !== "Terreno" && property.bathrooms > 0) {
    details.push({
      label: "Baños",
      value: `${property.bathrooms}`,
      icon: <Bath size={21} />,
    });
  }

  if (property.halfBathrooms > 0) {
    details.push({
      label: "Medios baños",
      value: `${property.halfBathrooms}`,
      icon: <Bath size={21} />,
    });
  }

  if (property.parkingSpaces > 0) {
    details.push({
      label: "Estacionamientos",
      value: `${property.parkingSpaces}`,
      icon: <Car size={21} />,
    });
  }

  if (property.constructionM2) {
    details.push({
      label: "Construcción",
      value: `${property.constructionM2} m²`,
      icon: <Building2 size={21} />,
    });
  }

  if (property.landM2) {
    details.push({
      label: "Terreno",
      value: `${property.landM2} m²`,
      icon: <Ruler size={21} />,
    });
  }

  if (property.totalSurfaceM2) {
    details.push({
      label: "Superficie",
      value: `${property.totalSurfaceM2} m²`,
      icon: <Ruler size={21} />,
    });
  }

  if (property.levels > 0) {
    details.push({
      label: "Niveles",
      value: `${property.levels}`,
      icon: <Layers size={21} />,
    });
  }

  if (property.suggestedUse && property.category !== "Casa") {
    details.push({
      label: "Uso sugerido",
      value: property.suggestedUse,
      icon: <MapPin size={21} />,
    });
  }

  return (
    <section className="bg-[#F7F3EA] py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
            Detalles
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
            Características principales
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((detail) => (
            <DetailItem
              key={`${detail.label}-${detail.value}`}
              icon={detail.icon}
              label={detail.label}
              value={detail.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
}