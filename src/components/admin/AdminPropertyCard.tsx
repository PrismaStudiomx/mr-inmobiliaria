import Link from "next/link";
import { Edit, Eye, ImageIcon, PauseCircle, Star } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import {
  getPropertyLocation,
  getPropertyPriceLabel,
} from "@/lib/property-format";
import type { Property } from "@/types/property";

type AdminPropertyCardProps = {
  property: Property;
};

export function AdminPropertyCard({ property }: AdminPropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#FFFDF8] shadow-sm">
      <div className="grid gap-0 md:grid-cols-[220px_1fr]">
        <div className="flex min-h-52 items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(201,162,74,0.3),transparent_35%),linear-gradient(135deg,#252525,#0B0B0B)] text-[#F7F3EA]">
          <div className="text-center">
            <ImageIcon className="mx-auto text-[#C9A24A]" size={36} />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em]">
              Foto
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="gold">{property.operation}</Badge>
            <Badge variant="light">{property.publicationStatus}</Badge>
            {property.featured && (
              <Badge variant="dark">
                <Star size={13} className="mr-1" />
                Destacada
              </Badge>
            )}
          </div>

          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#0B0B0B]">
            {property.title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#6F6A60]">
            {getPropertyLocation(property)}
          </p>

          <p className="mt-3 text-lg font-bold text-[#252525]">
            {getPropertyPriceLabel(property)}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link
              href={`/admin/propiedades/${property.id}/editar`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#C9A24A] px-5 py-3 text-sm font-semibold text-[#0B0B0B] transition hover:bg-[#E6C875]"
            >
              <Edit size={17} />
              Editar
            </Link>

            <Link
              href={`/propiedades/${property.slug}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0B0B0B] px-5 py-3 text-sm font-semibold text-[#0B0B0B] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
            >
              <Eye size={17} />
              Ver ficha
            </Link>

            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#252525] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
            >
              <PauseCircle size={17} />
              Pausar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}