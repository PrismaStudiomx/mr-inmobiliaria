import { PlusCircle } from "lucide-react";

import { AdminPropertyCard } from "@/components/admin/AdminPropertyCard";
import { Button } from "@/components/ui/Button";
import { demoProperties } from "@/data/demo-properties";

export default function AdminPropertiesPage() {
  return (
    <div className="pb-24 lg:pb-0">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
            Propiedades
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B] sm:text-5xl">
            Lista de propiedades
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6F6A60]">
            Revisa las propiedades cargadas, cambia su disponibilidad o edita su
            información.
          </p>
        </div>

        <Button href="/admin/propiedades/nueva">
          <PlusCircle size={18} />
          Agregar propiedad
        </Button>
      </div>

      <div className="mt-8 grid gap-5">
        {demoProperties.map((property) => (
          <AdminPropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}