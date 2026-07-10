"use client";

import Image from "next/image";
import { ImageIcon, Trash2, Upload } from "lucide-react";
import { useState } from "react";

type ImageItem = {
  url: string;
  file?: File;
  isExisting?: boolean;
};

type ImageUploaderProps = {
  initialImages?: string[];
  onFilesChange?: (files: File[]) => void;
};

export function ImageUploader({
  initialImages = [],
  onFilesChange,
}: ImageUploaderProps) {
  const [images, setImages] = useState<ImageItem[]>(
    initialImages.slice(0, 6).map((url) => ({
      url,
      isExisting: true,
    }))
  );

  function handleImages(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    const availableSlots = 6 - images.length;

    if (availableSlots <= 0) return;

    const selectedFiles = files.slice(0, availableSlots);

    const newImages: ImageItem[] = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isExisting: false,
    }));

    const nextImages = [...images, ...newImages];

    setImages(nextImages);

    onFilesChange?.(
      nextImages
        .filter((image) => !image.isExisting && image.file)
        .map((image) => image.file as File)
    );
  }

  function removeImage(imageUrl: string) {
    const nextImages = images.filter((item) => item.url !== imageUrl);

    setImages(nextImages);

    onFilesChange?.(
      nextImages
        .filter((image) => !image.isExisting && image.file)
        .map((image) => image.file as File)
    );
  }

  return (
    <div className="rounded-[2rem] border border-black/10 bg-[#F7F3EA] p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-serif text-3xl font-semibold text-[#0B0B0B]">
            Fotografías
          </h3>

          <p className="mt-2 text-sm leading-7 text-[#6F6A60]">
            Puedes cargar hasta 6 fotografías. Usa imágenes claras y bien
            iluminadas.
          </p>
        </div>

        <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#C9A24A] px-5 py-3 text-sm font-semibold text-[#0B0B0B] transition hover:bg-[#E6C875]">
          <Upload size={18} />
          Subir fotos
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImages}
            className="hidden"
          />
        </label>
      </div>

      {images.length === 0 ? (
        <div className="mt-6 flex min-h-52 items-center justify-center rounded-[1.5rem] border border-dashed border-black/20 bg-white text-center">
          <div>
            <ImageIcon className="mx-auto text-[#C9A24A]" size={42} />
            <p className="mt-3 text-sm font-semibold text-[#252525]">
              Aún no hay fotografías cargadas.
            </p>
            <p className="mt-2 text-xs text-[#6F6A60]">
              Agrega al menos una fotografía para publicar la propiedad.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-white"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.url}
                  alt={`Fotografía ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, 100vw"
                />

                {index === 0 && (
                  <div className="absolute left-3 top-3 rounded-full bg-[#C9A24A] px-3 py-1 text-xs font-bold text-[#0B0B0B]">
                    Principal
                  </div>
                )}
              </div>

              <div className="p-3">
                <button
                  type="button"
                  onClick={() => removeImage(image.url)}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-black/10 px-3 py-2 text-xs font-semibold text-[#252525] transition hover:border-red-500 hover:text-red-600"
                >
                  <Trash2 size={14} />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-[#6F6A60]">
        Las fotografías nuevas se guardarán al guardar la propiedad.
      </p>
    </div>
  );
}