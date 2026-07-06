"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = buildWhatsAppUrl({ type: "general" });

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FFFDF8]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl font-semibold tracking-wide text-[#0B0B0B]">
            MR
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A24A]">
            Inmobiliaria
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-[#252525] transition hover:text-[#C9A24A]",
                  isActive && "text-[#C9A24A]"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#C9A24A] px-5 py-3 text-sm font-semibold text-[#0B0B0B] transition hover:bg-[#E6C875]"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[#0B0B0B] lg:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-black/10 bg-[#FFFDF8] px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-[#252525] transition hover:bg-[#F7F3EA]"
              >
                {item.label}
              </Link>
            ))}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A24A] px-5 py-4 text-base font-semibold text-[#0B0B0B]"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>

            <p className="px-1 text-sm text-[#6F6A60]">
              {siteConfig.slogan}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}