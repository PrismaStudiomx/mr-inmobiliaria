import { Building2, Home, Map, Store } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const categories = [
  {
    title: "Casas",
    text: "Propiedades residenciales para vivir, invertir, vender o rentar.",
    href: "/propiedades?categoria=Casa",
    icon: Home,
  },
  {
    title: "Departamentos",
    text: "Opciones funcionales para quienes buscan comodidad, ubicación y practicidad.",
    href: "/propiedades?categoria=Departamento",
    icon: Building2,
  },
  {
    title: "Terrenos",
    text: "Espacios ideales para construcción, inversión o desarrollo.",
    href: "/propiedades?categoria=Terreno",
    icon: Map,
  },
  {
    title: "Comerciales",
    text: "Locales, oficinas y espacios para negocio o inversión.",
    href: "/propiedades?categoria=Comercial",
    icon: Store,
  },
];

export function PropertyCategories() {
  return (
    <section className="bg-[#FFFDF8] py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
              Categorías
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0B0B0B]">
              Explora por tipo de propiedad
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#6F6A60]">
              Encuentra casas, departamentos, terrenos y espacios comerciales
              según lo que estás buscando.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Reveal key={category.title} delay={index * 0.06}>
                <a
                  href={category.href}
                  className="group block h-full rounded-[2rem] border border-black/10 bg-[#F7F3EA] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C9A24A]/60 hover:bg-[#0B0B0B]"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFFDF8] text-[#C9A24A] transition group-hover:bg-[#C9A24A] group-hover:text-[#0B0B0B]">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[#0B0B0B] transition group-hover:text-white">
                    {category.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#6F6A60] transition group-hover:text-[#F7F3EA]/75">
                    {category.text}
                  </p>

                  <p className="mt-6 text-sm font-semibold text-[#C9A24A]">
                    Ver categoría →
                  </p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}