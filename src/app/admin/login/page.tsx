import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Acceso al panel",
};

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen bg-[#FFFDF8] lg:grid-cols-[1fr_0.9fr]">
      <section className="relative hidden overflow-hidden bg-[#0B0B0B] p-12 text-[#FFFDF8] lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,74,0.25),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" />

        <div className="relative">
          <p className="font-serif text-4xl font-semibold">MR Inmobiliaria</p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
            Panel privado
          </p>
        </div>

        <div className="relative max-w-xl">
          <h1 className="font-serif text-6xl font-semibold leading-tight">
            Administra propiedades desde un espacio seguro.
          </h1>

          <p className="mt-6 text-base leading-8 text-[#F7F3EA]/75">
            Agrega propiedades, cambia precios, actualiza fotografías y controla
            qué aparece publicado en el sitio.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <p className="font-serif text-3xl font-semibold text-[#0B0B0B]">
              MR Inmobiliaria
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
              Panel privado
            </p>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-xl shadow-black/5 sm:p-8">
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#0B0B0B] text-[#C9A24A]">
              <LockKeyhole size={25} />
            </div>

            <h1 className="font-serif text-4xl font-semibold text-[#0B0B0B]">
              Entrar al panel
            </h1>

            <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
              Acceso privado para administrar propiedades de MR Inmobiliaria.
            </p>

            <form className="mt-8 grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#252525]">
                  Usuario
                </label>
                <input
                  type="text"
                  placeholder="Usuario"
                  className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#252525]">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-[#C9A24A]"
                />
              </div>

              <Button type="submit" className="w-full">
                Entrar al panel
              </Button>
            </form>

            <p className="mt-5 text-xs leading-6 text-[#6F6A60]">
              Más adelante conectaremos este acceso con Supabase Auth.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}