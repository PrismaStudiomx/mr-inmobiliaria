import { notFound } from "next/navigation";

import { PropertyForm } from "@/components/admin/PropertyForm";
import { demoProperties } from "@/data/demo-properties";

type EditPropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params;
  const property = demoProperties.find((item) => item.id === id);

  if (!property) {
    notFound();
  }

  return (
    <div className="pb-36 lg:pb-24">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
        Editar propiedad
      </p>

      <h1 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B] sm:text-5xl">
        {property.title}
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6F6A60]">
        Actualiza la información, precio, fotografías o estado de publicación de
        esta propiedad.
      </p>

      <div className="mt-8">
        <PropertyForm mode="edit" initialProperty={property} />
      </div>
    </div>
  );
}