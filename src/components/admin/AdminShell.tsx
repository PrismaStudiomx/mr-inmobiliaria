"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  Building2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const adminNavigation = [
  {
    label: "Panel",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Propiedades",
    href: "/admin/propiedades",
    icon: Building2,
  },
  {
    label: "Agregar propiedad",
    href: "/admin/propiedades/nueva",
    icon: PlusCircle,
  },
];

type AdminShellProps = {
  children: React.ReactNode;
};

function isAdminNavActive(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  if (href === "/admin/propiedades/nueva") {
    return pathname === "/admin/propiedades/nueva";
  }

  if (href === "/admin/propiedades") {
    return (
      pathname === "/admin/propiedades" ||
      (pathname.startsWith("/admin/propiedades/") &&
        !pathname.startsWith("/admin/propiedades/nueva"))
    );
  }

  return pathname === href;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#FFFDF8]/95 backdrop-blur-xl lg:hidden">
        <div className="flex h-16 items-center justify-between px-5">
          <Link href="/admin" className="leading-none">
            <p className="font-serif text-xl font-semibold text-[#0B0B0B]">
              MR Admin
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A24A]">
              Inmobiliaria
            </p>
          </Link>

          <Link
            href="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#0B0B0B]"
            aria-label="Ver sitio"
          >
            <Home size={19} />
          </Link>
        </div>
      </header>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[290px] overflow-y-auto border-r border-black/10 bg-[#0B0B0B] p-6 text-[#FFFDF8] lg:block">
        <Link href="/admin" className="block">
          <p className="font-serif text-3xl font-semibold text-white">
            MR Admin
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#C9A24A]">
            Inmobiliaria
          </p>
        </Link>

        <p className="mt-8 border-l border-[#C9A24A] pl-4 text-sm leading-7 text-[#F7F3EA]/75">
          Administra propiedades, fotografías, precios y disponibilidad desde un
          panel simple.
        </p>

        <nav className="mt-10 space-y-2">
          {adminNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = isAdminNavActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  isActive
                    ? "bg-[#C9A24A] text-[#0B0B0B]"
                    : "text-[#F7F3EA]/75 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 space-y-2 border-t border-white/10 pt-6">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#F7F3EA]/75 transition hover:bg-white/10 hover:text-white"
          >
            <Home size={19} />
            Ver sitio público
          </Link>

          <Link
            href="/admin/configuracion"
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
              pathname === "/admin/configuracion"
                ? "bg-[#C9A24A] text-[#0B0B0B]"
                : "text-[#F7F3EA]/75 hover:bg-white/10 hover:text-white"
            )}
          >
            <Settings size={19} />
            Configuración
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-[#F7F3EA]/75 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={19} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="min-w-0 px-5 py-6 pb-28 sm:px-6 lg:ml-[290px] lg:px-10 lg:py-10 lg:pb-10">
        <div className="mx-auto max-w-[1210px]">{children}</div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-[#FFFDF8] px-3 py-2 lg:hidden">
        <div className="grid grid-cols-3 gap-2">
          {adminNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = isAdminNavActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition",
                  isActive
                    ? "bg-[#0B0B0B] text-[#C9A24A]"
                    : "text-[#6F6A60]"
                )}
              >
                <Icon size={18} />
                {item.label === "Agregar propiedad" ? "Agregar" : item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}