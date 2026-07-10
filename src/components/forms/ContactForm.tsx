"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { propertyStates } from "@/data/property-options";

const interestOptions = [
  "Comprar",
  "Vender",
  "Rentar",
  "Solicitar información de una propiedad",
];

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccess(false);
    setErrorMessage("");
    setIsSending(true);

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      interest: String(formData.get("interest") || ""),
      state: String(formData.get("state") || ""),
      message: String(formData.get("message") || ""),
    };

    const response = await fetch("/api/contacto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setIsSending(false);

    if (!response.ok) {
      setErrorMessage(
        "No se pudo enviar el mensaje. Intenta nuevamente o contáctanos por WhatsApp."
      );
      return;
    }

    event.currentTarget.reset();
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
          Envíanos un mensaje
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
          Déjanos tus datos y MR Inmobiliaria podrá contactarte para dar
          seguimiento a tu solicitud.
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

        <div className="grid gap-5 sm:grid-cols-2">
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
              Correo electrónico
            </label>
            <input
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#252525]">
            Estoy interesado en
          </label>
          <select
            required
            name="interest"
            className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
          >
            <option value="">Selecciona una opción</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#252525]">
            Estado de interés
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
            <option value="Aún no estoy seguro">Aún no estoy seguro</option>
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
            placeholder="Cuéntanos qué tipo de propiedad buscas o si quieres vender o rentar una propiedad."
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#C9A24A]"
          />
        </div>
      </div>

      {success && (
        <div className="mt-6 rounded-2xl border border-[#C9A24A]/40 bg-[#F7F3EA] p-4 text-sm font-medium text-[#252525]">
          Tu mensaje fue enviado correctamente. MR Inmobiliaria se pondrá en
          contacto contigo.
        </div>
      )}

      {errorMessage && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="mt-7">
        <Button type="submit" className="w-full">
          <Send size={18} />
          {isSending ? "Enviando..." : "Enviar mensaje"}
        </Button>
      </div>

      <p className="mt-5 text-center text-xs leading-6 text-[#6F6A60]">
        Si prefieres atención más rápida, también puedes escribirnos por WhatsApp.
      </p>
    </form>
  );
}