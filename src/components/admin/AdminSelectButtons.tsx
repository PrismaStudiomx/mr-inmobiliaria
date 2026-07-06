"use client";

import { cn } from "@/lib/utils";

type AdminSelectButtonsProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

export function AdminSelectButtons<T extends string>({
  label,
  options,
  value,
  onChange,
}: AdminSelectButtonsProps<T>) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-[#252525]">{label}</p>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "min-h-12 rounded-2xl border px-4 py-3 text-sm font-semibold transition",
              value === option
                ? "border-[#0B0B0B] bg-[#0B0B0B] text-[#FFFDF8]"
                : "border-black/10 bg-white text-[#252525] hover:border-[#C9A24A]"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}