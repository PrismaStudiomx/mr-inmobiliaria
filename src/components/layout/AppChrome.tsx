"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { MobileWhatsAppButton } from "@/components/layout/MobileWhatsAppButton";
import { Navbar } from "@/components/layout/Navbar";

type AppChromeProps = {
  children: React.ReactNode;
};

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileWhatsAppButton />
    </>
  );
}