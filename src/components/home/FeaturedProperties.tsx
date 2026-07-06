import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PropertyCard } from "@/components/properties/PropertyCard";
import type { Property } from "@/types/property";

type FeaturedPropertiesProps = {
  properties: Property[];
};

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const featured = properties
    .filter(
      (property) =>
        property.publicationStatus === "Disponible" && property.featured
    )
    .slice(0, 4);

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F7F3EA] py-16 sm:py-20">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                Selección MR
              </p>

              <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
                Propiedades destacadas
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                Opciones seleccionadas por MR Inmobiliaria para quienes buscan
                comprar, rentar o invertir con mayor claridad.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Button href="/propiedades" variant="secondary">
              Ver catálogo completo
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((property, index) => (
            <Reveal key={property.id} delay={index * 0.06}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}