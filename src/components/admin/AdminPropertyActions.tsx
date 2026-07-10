"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Edit,
  Eye,
  PauseCircle,
  PlayCircle,
  Star,
  StarOff,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

import type { Property } from "@/types/property";

type AdminPropertyActionsProps = {
  property: Property;
};

export function AdminPropertyActions({ property }: AdminPropertyActionsProps) {
  const router = useRouter();

  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const isPaused = property.publicationStatus === "Pausada";
  const isFeatured = property.featured;
  const canDelete = confirmText.trim().toUpperCase() === "ELIMINAR";

  async function handleToggleStatus() {
    setIsStatusLoading(true);

    const nextStatus = isPaused ? "Disponible" : "Pausada";

    const response = await fetch(`/api/admin/properties/${property.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicationStatus: nextStatus,
      }),
    });

    setIsStatusLoading(false);

    if (!response.ok) {
      alert("No se pudo cambiar el estado de la propiedad.");
      return;
    }

    router.refresh();
  }

  async function handleToggleFeatured() {
    setIsFeaturedLoading(true);

    const response = await fetch(`/api/admin/properties/${property.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        featured: !isFeatured,
      }),
    });

    setIsFeaturedLoading(false);

    if (!response.ok) {
      alert("No se pudo cambiar si la propiedad es destacada.");
      return;
    }

    router.refresh();
  }

  async function handleDeleteProperty() {
    if (!canDelete) return;

    setIsDeleteLoading(true);

    const response = await fetch(`/api/admin/properties/${property.id}`, {
      method: "DELETE",
    });

    setIsDeleteLoading(false);

    if (!response.ok) {
      alert("No se pudo eliminar la propiedad.");
      return;
    }

    setShowDeleteConfirm(false);
    router.refresh();
  }

  return (
    <>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Link
          href={`/admin/propiedades/${property.id}/editar`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#C9A24A] px-5 py-3 text-sm font-semibold text-[#0B0B0B] transition hover:bg-[#E6C875]"
        >
          <Edit size={17} />
          Editar
        </Link>

        <Link
          href={`/propiedades/${property.slug}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0B0B0B] px-5 py-3 text-sm font-semibold text-[#0B0B0B] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
        >
          <Eye size={17} />
          Ver ficha
        </Link>

        <button
          type="button"
          onClick={handleToggleStatus}
          disabled={isStatusLoading}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#252525] transition hover:border-[#C9A24A] hover:text-[#C9A24A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPaused ? <PlayCircle size={17} /> : <PauseCircle size={17} />}
          {isStatusLoading ? "Guardando..." : isPaused ? "Activar" : "Pausar"}
        </button>

        <button
          type="button"
          onClick={handleToggleFeatured}
          disabled={isFeaturedLoading}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#252525] transition hover:border-[#C9A24A] hover:text-[#C9A24A] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isFeatured ? <StarOff size={17} /> : <Star size={17} />}
          {isFeaturedLoading
            ? "Guardando..."
            : isFeatured
              ? "Quitar destacada"
              : "Destacar"}
        </button>

        <button
          type="button"
          onClick={() => {
            setConfirmText("");
            setShowDeleteConfirm(true);
          }}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:border-red-500 hover:bg-red-50"
        >
          <Trash2 size={17} />
          Eliminar
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-5">
          <div className="w-full max-w-lg rounded-[2rem] bg-[#FFFDF8] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-600">
                  Acción irreversible
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0B0B0B]">
                  Eliminar propiedad
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#252525] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-5 text-sm leading-7 text-[#6F6A60]">
              Vas a eliminar esta propiedad del panel, del catálogo público y sus
              imágenes guardadas. Esta acción no se puede deshacer.
            </p>

            <div className="mt-5 rounded-2xl border border-black/10 bg-[#F7F3EA] p-4">
              <p className="text-sm font-semibold text-[#0B0B0B]">
                {property.title}
              </p>
              <p className="mt-1 text-xs text-[#6F6A60]">
                Para confirmar, escribe:{" "}
                <span className="font-bold text-red-600">ELIMINAR</span>
              </p>
            </div>

            <input
              value={confirmText}
              onChange={(event) => setConfirmText(event.target.value)}
              placeholder="Escribe ELIMINAR"
              className="mt-5 min-h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-red-500"
            />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#252525] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDeleteProperty}
                disabled={!canDelete || isDeleteLoading}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={17} />
                {isDeleteLoading ? "Eliminando..." : "Eliminar definitivamente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}