"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save } from "lucide-react";

import { AdminSelectButtons } from "@/components/admin/AdminSelectButtons";
import { CounterControl } from "@/components/admin/CounterControl";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/Button";
import {
  propertyCategories,
  propertyFeatures,
  propertyOperations,
  propertyStates,
  publicationStatuses,
  suggestedUses,
} from "@/data/property-options";
import { cn } from "@/lib/utils";
import type {
  Property,
  PropertyCategory,
  PropertyOperation,
  PropertyState,
  PublicationStatus,
} from "@/types/property";

type PropertyFormProps = {
  mode: "create" | "edit";
  initialProperty?: Property;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getNumber(formData: FormData, key: string) {
  const value = getString(formData, key);
  if (!value) return null;

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function PropertyForm({ mode, initialProperty }: PropertyFormProps) {
  const router = useRouter();

  const [category, setCategory] = useState<PropertyCategory>(
    initialProperty?.category || "Casa"
  );

  const [operation, setOperation] = useState<PropertyOperation>(
    initialProperty?.operation || "Venta"
  );

  const [state, setState] = useState<PropertyState>(
    initialProperty?.state || "Nuevo León"
  );

  const [publicationStatus, setPublicationStatus] =
    useState<PublicationStatus>(initialProperty?.publicationStatus || "Pausada");

  const [featured, setFeatured] = useState(initialProperty?.featured || false);
  const [showExactAddress, setShowExactAddress] = useState(
    initialProperty?.showExactAddress || false
  );

  const [showSalePrice, setShowSalePrice] = useState(
    initialProperty?.showSalePrice ?? true
  );

  const [showRentPrice, setShowRentPrice] = useState(
    initialProperty?.showRentPrice ?? true
  );

  const [bedrooms, setBedrooms] = useState(initialProperty?.bedrooms || 0);
  const [bathrooms, setBathrooms] = useState(initialProperty?.bathrooms || 0);
  const [halfBathrooms, setHalfBathrooms] = useState(
    initialProperty?.halfBathrooms || 0
  );
  const [parkingSpaces, setParkingSpaces] = useState(
    initialProperty?.parkingSpaces || 0
  );
  const [levels, setLevels] = useState(initialProperty?.levels || 0);

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    initialProperty?.features || []
  );
  
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showSaleFields = operation === "Venta" || operation === "Venta y renta";
  const showRentFields = operation === "Renta" || operation === "Venta y renta";
  const isLand = category === "Terreno";
  const isCommercial = category === "Comercial";

  function toggleFeature(feature: string) {
    setSelectedFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature]
    );
  }

  function useSuggestedDescription() {
    const textarea = document.querySelector<HTMLTextAreaElement>(
      "#property-description"
    );

    if (!textarea) return;

    const descriptions: Record<PropertyCategory, string> = {
      Casa: "Casa ubicada en una zona con acceso a servicios y vialidades principales. Una opción ideal para quienes buscan comodidad, ubicación y atención personalizada durante el proceso.",
      Departamento:
        "Departamento con espacios funcionales y ubicación conveniente, ideal para quienes buscan una opción práctica para vivir o rentar.",
      Terreno:
        "Terreno con ubicación estratégica, ideal para inversión, construcción o desarrollo según las necesidades del comprador.",
      Comercial:
        "Propiedad comercial con ubicación conveniente para negocio, inversión o atención al público.",
    };

    textarea.value = descriptions[category];
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);
    setSuccess(false);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      title: getString(formData, "title"),
      category,
      operation,
      publicationStatus,
      featured,

      state,
      cityZone: getString(formData, "cityZone"),
      neighborhoodReference: getString(formData, "neighborhoodReference"),

      showExactAddress,
      exactAddress: getString(formData, "exactAddress"),

      showSalePrice: showSaleFields ? showSalePrice : false,
      salePrice:
        showSaleFields && showSalePrice ? getNumber(formData, "salePrice") : null,

      showRentPrice: showRentFields ? showRentPrice : false,
      rentPrice:
        showRentFields && showRentPrice ? getNumber(formData, "rentPrice") : null,

      bedrooms: isLand || isCommercial ? 0 : bedrooms,
      bathrooms: isLand ? 0 : bathrooms,
      halfBathrooms: isLand ? 0 : halfBathrooms,
      parkingSpaces: isLand ? 0 : parkingSpaces,
      levels: isLand ? 0 : levels,

      constructionM2: !isLand ? getNumber(formData, "constructionM2") : null,
      landM2: !isCommercial ? getNumber(formData, "landM2") : null,
      totalSurfaceM2:
        isLand || isCommercial ? getNumber(formData, "totalSurfaceM2") : null,

      suggestedUse: getString(formData, "suggestedUse"),
      services: [],
      features: selectedFeatures,

      shortDescription: getString(formData, "shortDescription"),
      description: getString(formData, "description"),
    };

    const endpoint =
      mode === "create"
        ? "/api/admin/properties"
        : `/api/admin/properties/${initialProperty?.id}`;

    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setIsSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setErrorMessage(
        data?.error || "No se pudo guardar la propiedad. Intenta nuevamente."
      );
      return;
    }

    const responseData = await response.json().catch(() => null);

const propertyId =
  mode === "create" ? responseData?.id : initialProperty?.id;

if (selectedImageFiles.length > 0 && propertyId) {
  const imageFormData = new FormData();

  selectedImageFiles.forEach((file) => {
    imageFormData.append("images", file);
  });

  const imageResponse = await fetch(
    `/api/admin/properties/${propertyId}/images`,
    {
      method: "POST",
      body: imageFormData,
    }
  );

  if (!imageResponse.ok) {
    const imageData = await imageResponse.json().catch(() => null);

    setErrorMessage(
      imageData?.error ||
        "La propiedad se guardó, pero no se pudieron subir las fotografías."
    );

    return;
  }
}

setSuccess(true);
router.push("/admin/propiedades");
router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <section className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-5 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
          Información principal
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0B0B0B]">
          Datos básicos
        </h2>

        <div className="mt-6 grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252525]">
              Título de la propiedad
            </label>
            <input
              required
              name="title"
              type="text"
              defaultValue={initialProperty?.title}
              placeholder="Ejemplo: Casa residencial en Mérida"
              className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
            />
          </div>

          <AdminSelectButtons
            label="Categoría"
            options={propertyCategories}
            value={category}
            onChange={setCategory}
          />

          <AdminSelectButtons
            label="Operación"
            options={propertyOperations}
            value={operation}
            onChange={setOperation}
          />
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-5 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
          Ubicación
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0B0B0B]">
          Zona de la propiedad
        </h2>

        <div className="mt-6 grid gap-5">
          <AdminSelectButtons
            label="Estado"
            options={propertyStates}
            value={state}
            onChange={setState}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#252525]">
                Ciudad o zona
              </label>
              <input
                required
                name="cityZone"
                type="text"
                defaultValue={initialProperty?.cityZone}
                placeholder="Ejemplo: Mérida"
                className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#252525]">
                Colonia o referencia
              </label>
              <input
                name="neighborhoodReference"
                type="text"
                defaultValue={initialProperty?.neighborhoodReference}
                placeholder="Ejemplo: Zona norte"
                className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#F7F3EA] p-4 text-sm font-semibold text-[#252525]">
            <input
              type="checkbox"
              checked={showExactAddress}
              onChange={(event) => setShowExactAddress(event.target.checked)}
              className="h-4 w-4 accent-[#C9A24A]"
            />
            Mostrar dirección exacta en el sitio público
          </label>

          {showExactAddress && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#252525]">
                Dirección exacta
              </label>
              <input
                name="exactAddress"
                type="text"
                defaultValue={initialProperty?.exactAddress}
                placeholder="Calle, número, colonia..."
                className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
              />
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-5 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
          Precio
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0B0B0B]">
          Información de precio
        </h2>

        <div className="mt-6 grid gap-5">
          {showSaleFields && (
            <div className="rounded-[1.5rem] border border-black/10 bg-[#F7F3EA] p-5">
              <label className="flex items-center gap-3 text-sm font-semibold text-[#252525]">
                <input
                  type="checkbox"
                  checked={showSalePrice}
                  onChange={(event) => setShowSalePrice(event.target.checked)}
                  className="h-4 w-4 accent-[#C9A24A]"
                />
                Mostrar precio de venta
              </label>

              {showSalePrice && (
                <input
                  name="salePrice"
                  type="number"
                  defaultValue={initialProperty?.salePrice}
                  placeholder="Ejemplo: 2850000"
                  className="mt-4 min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
                />
              )}
            </div>
          )}

          {showRentFields && (
            <div className="rounded-[1.5rem] border border-black/10 bg-[#F7F3EA] p-5">
              <label className="flex items-center gap-3 text-sm font-semibold text-[#252525]">
                <input
                  type="checkbox"
                  checked={showRentPrice}
                  onChange={(event) => setShowRentPrice(event.target.checked)}
                  className="h-4 w-4 accent-[#C9A24A]"
                />
                Mostrar precio de renta
              </label>

              {showRentPrice && (
                <input
                  name="rentPrice"
                  type="number"
                  defaultValue={initialProperty?.rentPrice}
                  placeholder="Ejemplo: 18000"
                  className="mt-4 min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
                />
              )}
            </div>
          )}

          <p className="rounded-2xl border border-black/10 bg-white p-4 text-sm leading-7 text-[#6F6A60]">
            Si no se muestra precio, en el sitio aparecerá “Solicitar
            información” o “Información disponible con asesoría”.
          </p>
        </div>
      </section>

      {!isLand && (
        <section className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-5 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
            Características
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0B0B0B]">
            Distribución de la propiedad
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {!isCommercial && (
              <CounterControl
                label="Recámaras"
                value={bedrooms}
                onChange={setBedrooms}
              />
            )}

            <CounterControl
              label="Baños"
              value={bathrooms}
              onChange={setBathrooms}
            />

            <CounterControl
              label="Medios baños"
              value={halfBathrooms}
              onChange={setHalfBathrooms}
            />

            <CounterControl
              label="Estacionamientos"
              value={parkingSpaces}
              onChange={setParkingSpaces}
            />

            <CounterControl label="Niveles" value={levels} onChange={setLevels} />
          </div>
        </section>
      )}

      <section className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-5 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
          Medidas
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0B0B0B]">
          Superficie y construcción
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {!isLand && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#252525]">
                Construcción m²
              </label>
              <input
                name="constructionM2"
                type="number"
                defaultValue={initialProperty?.constructionM2}
                placeholder="180"
                className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
              />
            </div>
          )}

          {!isCommercial && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#252525]">
                Terreno m²
              </label>
              <input
                name="landM2"
                type="number"
                defaultValue={initialProperty?.landM2}
                placeholder="240"
                className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
              />
            </div>
          )}

          {(isLand || isCommercial) && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#252525]">
                Superficie total m²
              </label>
              <input
                name="totalSurfaceM2"
                type="number"
                defaultValue={initialProperty?.totalSurfaceM2}
                placeholder="450"
                className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252525]">
              Uso sugerido
            </label>
            <select
              name="suggestedUse"
              defaultValue={initialProperty?.suggestedUse || "No especificado"}
              className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
            >
              {suggestedUses.map((use) => (
                <option key={use} value={use}>
                  {use}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-5 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
          Detalles
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0B0B0B]">
          Características adicionales
        </h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {propertyFeatures.map((feature) => {
            const active = selectedFeatures.includes(feature);

            return (
              <button
                key={feature}
                type="button"
                onClick={() => toggleFeature(feature)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "border-[#0B0B0B] bg-[#0B0B0B] text-[#FFFDF8]"
                    : "border-black/10 bg-[#F7F3EA] text-[#252525] hover:border-[#C9A24A]"
                )}
              >
                {feature}
              </button>
            );
          })}
        </div>
      </section>

      <ImageUploader
  initialImages={initialProperty?.images || []}
  onFilesChange={setSelectedImageFiles}
/>

      <section className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-5 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
          Descripción
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0B0B0B]">
          Texto de la propiedad
        </h2>

        <div className="mt-6 grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252525]">
              Descripción corta
            </label>
            <input
              name="shortDescription"
              type="text"
              defaultValue={initialProperty?.shortDescription}
              placeholder="Resumen breve para tarjetas o SEO"
              className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
            />
          </div>

          <div>
            <div className="mb-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <label className="block text-sm font-semibold text-[#252525]">
                Descripción completa
              </label>

              <button
                type="button"
                onClick={useSuggestedDescription}
                className="text-left text-sm font-semibold text-[#C9A24A] transition hover:text-[#0B0B0B]"
              >
                Usar descripción sugerida
              </button>
            </div>

            <textarea
              required
              id="property-description"
              name="description"
              rows={7}
              defaultValue={initialProperty?.description}
              placeholder="Describe la propiedad, su ubicación general, ventajas y características principales."
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#C9A24A]"
            />
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-5 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
          Publicación
        </p>

        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0B0B0B]">
          Estado en el sitio
        </h2>

        <div className="mt-6 grid gap-5">
          <AdminSelectButtons
            label="Estado de publicación"
            options={publicationStatuses}
            value={publicationStatus}
            onChange={setPublicationStatus}
          />

          <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#F7F3EA] p-4 text-sm font-semibold text-[#252525]">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="h-4 w-4 accent-[#C9A24A]"
            />
            Marcar como propiedad destacada
          </label>

          <p className="rounded-2xl border border-black/10 bg-white p-4 text-sm leading-7 text-[#6F6A60]">
            Solo las propiedades con estado “Disponible” aparecerán en el sitio
            público. Para quitar una propiedad sin eliminarla, usa “Pausada”.
          </p>
        </div>
      </section>

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700">
          {errorMessage}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-[#C9A24A]/40 bg-[#FFFDF8] p-5 text-sm font-semibold text-[#252525]">
          Propiedad guardada correctamente.
        </div>
      )}

      <div className="sticky bottom-20 z-30 rounded-[2rem] border border-black/10 bg-[#FFFDF8]/95 p-4 shadow-xl shadow-black/10 backdrop-blur lg:bottom-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button href="/admin/propiedades" variant="secondary">
            Cancelar
          </Button>

          <Button type="submit">
            <Save size={18} />
            {isSaving
              ? "Guardando..."
              : mode === "create"
                ? "Guardar propiedad"
                : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </form>
  );
}