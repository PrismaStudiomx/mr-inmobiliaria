"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { propertyCategories, propertyStates } from "@/data/property-options";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { Property, PropertyCategory, PropertyState } from "@/types/property";

type CategoryFilter = "Todas" | PropertyCategory;
type StateFilter = "Todos los estados" | PropertyState;

type PropertiesCatalogProps = {
  properties: Property[];
};

export function PropertiesCatalog({ properties }: PropertiesCatalogProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Todas");
  const [selectedState, setSelectedState] =
    useState<StateFilter>("Todos los estados");

  const categoryOptions: CategoryFilter[] = ["Todas", ...propertyCategories];
  const stateOptions: StateFilter[] = ["Todos los estados", ...propertyStates];

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesCategory =
        selectedCategory === "Todas" || property.category === selectedCategory;

      const matchesState =
        selectedState === "Todos los estados" || property.state === selectedState;

      return (
        property.publicationStatus === "Disponible" &&
        matchesCategory &&
        matchesState
      );
    });
  }, [properties, selectedCategory, selectedState]);

  const resultText = useMemo(() => {
    const categoryText =
      selectedCategory === "Todas"
        ? "propiedades"
        : selectedCategory.toLowerCase() + "s";

    const stateText =
      selectedState === "Todos los estados"
        ? "en todos los estados"
        : `en ${selectedState}`;

    return `Mostrando ${categoryText} disponibles ${stateText}.`;
  }, [selectedCategory, selectedState]);

  const emptyWhatsAppUrl = buildWhatsAppUrl({ type: "general" });

  return (
    <section className="bg-[#FFFDF8] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="w-full max-w-full overflow-hidden rounded-[2rem] border border-black/10 bg-[#F7F3EA] p-5 sm:p-8">
  <div className="grid min-w-0 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
                Catálogo
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0B0B0B] sm:text-4xl">
                Encuentra propiedades por tipo y ubicación
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
                Filtra el catálogo por categoría y estado para encontrar opciones
                disponibles según lo que estás buscando.
              </p>
            </div>

            <div className="min-w-0 space-y-5 overflow-hidden">
              <div>
                <p className="mb-3 text-sm font-semibold text-[#252525]">
                  Tipo de propiedad
                </p>
                <div className="flex max-w-full gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {categoryOptions.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                        selectedCategory === category
                          ? "border-[#0B0B0B] bg-[#0B0B0B] text-[#FFFDF8]"
                          : "border-black/10 bg-[#FFFDF8] text-[#252525] hover:border-[#C9A24A]"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[#252525]">
                  Ubicación
                </p>
                <div className="flex max-w-full gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {stateOptions.map((state) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => setSelectedState(state)}
                      className={cn(
                        "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                        selectedState === state
                          ? "border-[#C9A24A] bg-[#C9A24A] text-[#0B0B0B]"
                          : "border-black/10 bg-[#FFFDF8] text-[#252525] hover:border-[#C9A24A]"
                      )}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm font-medium text-[#6F6A60]">
          {resultText}
        </p>

        {filteredProperties.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-black/10 bg-[#F7F3EA] p-8 text-center">
            <MessageCircle className="mx-auto text-[#C9A24A]" size={42} />

            <h3 className="mt-5 font-serif text-3xl font-semibold text-[#0B0B0B]">
              Por ahora no hay propiedades disponibles con estos filtros.
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6F6A60]">
              Escríbenos por WhatsApp y te compartimos opciones según lo que estás
              buscando.
            </p>

            <div className="mt-7">
              <Button href={emptyWhatsAppUrl} external>
                Consultar opciones por WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}