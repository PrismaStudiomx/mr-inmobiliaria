"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/Button";

type PropertyInterestFormProps = {
  propertyName: string;
  operation: string;
  location: string;
};

export function PropertyInterestForm({
  propertyName,
  operation,
  location,
}: PropertyInterestFormProps) {
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
      message: String(formData.get("message") || ""),
      propertyName,
      operation,
      location,
      propertyUrl: window.location.href,
    };

    const response = await fetch("/api/propiedad-interes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setIsSending(false);

    if (!response.ok) {
      setErrorMessage(
        "No se pudo enviar la solicitud. Intenta nuevamente o contáctanos por WhatsApp."
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
          Solicitud
        </p>

        <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
          Solicita información de esta propiedad
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
          Déjanos tus datos y MR Inmobiliaria podrá contactarte para compartir
          más detalles sobre esta propiedad.
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
            Mensaje
          </label>
          <textarea
            required
            name="message"
            rows={4}
            defaultValue="Me interesa esta propiedad. Me gustaría recibir más información."
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#C9A24A]"
          />
        </div>
      </div>

      {success && (
        <div className="mt-6 rounded-2xl border border-[#C9A24A]/40 bg-[#F7F3EA] p-4 text-sm font-medium text-[#252525]">
          Tu solicitud fue enviada correctamente. MR Inmobiliaria se pondrá en
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
          {isSending ? "Enviando..." : "Enviar solicitud"}
        </Button>
      </div>

      <p className="mt-5 text-center text-xs leading-6 text-[#6F6A60]">
        Si prefieres atención más rápida, también puedes escribir por WhatsApp.
      </p>
    </form>
  );
}