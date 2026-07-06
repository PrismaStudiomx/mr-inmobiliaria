import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Panel privado | MR Inmobiliaria",
  description: "Panel privado para administrar propiedades de MR Inmobiliaria.",
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}