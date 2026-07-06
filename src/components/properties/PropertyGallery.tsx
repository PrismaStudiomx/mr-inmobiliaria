"use client";

import Image from "next/image";
import { useState } from "react";
import { Home } from "lucide-react";

import type { Property } from "@/types/property";
import { cn } from "@/lib/utils";

type PropertyGalleryProps = {
  property: Property;
};

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const fallbackImages = property.images.length > 0 ? property.images : [];
  const images = property.mainImage
    ? [property.mainImage, ...fallbackImages.filter((img) => img !== property.mainImage)]
    : fallbackImages;

  const [activeImage, setActiveImage] = useState(images[0] || "");

  if (!activeImage) {
    return (
      <div className="overflow-hidden rounded-[2rem] bg-[#0B0B0B]">
        <div className="flex aspect-[4/3] items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(201,162,74,0.35),transparent_35%),linear-gradient(135deg,#252525,#0B0B0B)]">
          <div className="text-center text-[#F7F3EA]">
            <Home className="mx-auto mb-4 text-[#C9A24A]" size={54} />
            <p className="text-sm font-medium">Galería de la propiedad</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#0B0B0B]">
        <div className="relative aspect-[4/3]">
          <Image
            src={activeImage}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority
          />
        </div>

        <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
          {Math.max(images.indexOf(activeImage) + 1, 1)} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(image)}
              className={cn(
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border transition",
                activeImage === image
                  ? "border-[#C9A24A]"
                  : "border-black/10 hover:border-[#C9A24A]/70"
              )}
            >
              <Image
                src={image}
                alt={`${property.title} imagen ${index + 1}`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}