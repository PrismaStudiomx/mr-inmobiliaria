import { PropertyForm } from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="pb-36 lg:pb-24">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
        Nueva propiedad
      </p>

      <h1 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B] sm:text-5xl">
        Agregar propiedad
      </h1>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6F6A60]">
        Completa la información principal de la propiedad. Puedes guardarla como
        pausada si todavía no está lista para publicarse.
      </p>

      <div className="mt-8">
        <PropertyForm mode="create" />
      </div>
    </div>
  );
}