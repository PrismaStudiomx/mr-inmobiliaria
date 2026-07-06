"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { propertyCategories, propertyStates } from "@/data/property-options";

const operations = ["Venta", "Renta", "Venta y renta"];
const photoOptions = ["Sí", "No", "Algunas, pero faltan más"];

export function SellPropertyForm() {
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-black/10 bg-[#FFFDF8] p-6 shadow-xl shadow-black/5 sm:p-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
          Formulario
        </p>

        <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
          Comparte los datos de tu propiedad
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
          Déjanos la información principal y MR Inmobiliaria podrá contactarte
          para revisar los detalles.
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#252525]">
            Nombre completo
          </label>
          <input
            required
            name="name"
            type="text"
            placeholder="Escribe tu nombre completo"
            className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#252525]">
            Teléfono
          </label>
          <input
            required
            name="phone"
            type="tel"
            placeholder="Número de teléfono o WhatsApp"
            className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#252525]">
            Estado donde se ubica la propiedad
          </label>
          <select
            required
            name="state"
            className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
          >
            <option value="">Selecciona un estado</option>
            {propertyStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252525]">
              Ciudad o zona
            </label>
            <input
              required
              name="cityZone"
              type="text"
              placeholder="Mérida, Monterrey, Cancún..."
              className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252525]">
              Colonia o referencia
            </label>
            <input
              name="reference"
              type="text"
              placeholder="Zona norte, cerca de avenida..."
              className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252525]">
              Tipo de propiedad
            </label>
            <select
              required
              name="propertyType"
              className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
            >
              <option value="">Selecciona una opción</option>
              {propertyCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252525]">
              Operación
            </label>
            <select
              required
              name="operation"
              className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
            >
              <option value="">Selecciona una opción</option>
              {operations.map((operation) => (
                <option key={operation} value={operation}>
                  {operation}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#252525]">
            Precio estimado
          </label>
          <input
            name="estimatedPrice"
            type="text"
            placeholder="Ejemplo: $2,850,000 MXN o $18,000 MXN / mes"
            className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#252525]">
            ¿Ya cuentas con fotografías?
          </label>
          <select
            required
            name="hasPhotos"
            className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
          >
            <option value="">Selecciona una opción</option>
            {photoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#252525]">
            Mensaje
          </label>
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Cuéntanos detalles importantes de la propiedad: tamaño, características, disponibilidad o cualquier información relevante."
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#C9A24A]"
          />
        </div>
      </div>

      {success && (
        <div className="mt-6 rounded-2xl border border-[#C9A24A]/40 bg-[#F7F3EA] p-4 text-sm font-medium text-[#252525]">
          Recibimos la información de tu propiedad. MR Inmobiliaria se pondrá en
          contacto contigo para revisar los detalles.
        </div>
      )}

      <div className="mt-7">
        <Button type="submit" className="w-full">
          <Send size={18} />
          Enviar información de mi propiedad
        </Button>
      </div>

      <p className="mt-5 text-center text-xs leading-6 text-[#6F6A60]">
        También puedes escribir directamente por WhatsApp si prefieres platicar
        primero los detalles.
      </p>
    </form>
  );
}