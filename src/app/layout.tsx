import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

import { AppChrome } from "@/components/layout/AppChrome";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} | Compra, venta y renta de propiedades`,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  openGraph: {
    title: `${siteConfig.name} | Compra, venta y renta de propiedades`,
    description: "¿Quieres comprar, vender o rentar? Estamos a tus órdenes.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og/mr-inmobiliaria-og.png",
        width: 1200,
        height: 630,
        alt: "MR Inmobiliaria | Compra, venta y renta de propiedades",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Compra, venta y renta de propiedades`,
    description: "¿Quieres comprar, vender o rentar? Estamos a tus órdenes.",
    images: ["/og/mr-inmobiliaria-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#FFFDF8] font-sans text-[#252525] antialiased">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}