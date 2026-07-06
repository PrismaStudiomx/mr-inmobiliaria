"use client";

import { Minus, Plus } from "lucide-react";

type CounterControlProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
};

export function CounterControl({
  label,
  value,
  onChange,
  min = 0,
}: CounterControlProps) {
  function decrease() {
    onChange(Math.max(min, value - 1));
  }

  function increase() {
    onChange(value + 1);
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <p className="mb-3 text-sm font-semibold text-[#252525]">{label}</p>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={decrease}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-[#0B0B0B] transition hover:border-[#C9A24A] hover:text-[#C9A24A]"
        >
          <Minus size={18} />
        </button>

        <span className="font-serif text-3xl font-semibold text-[#0B0B0B]">
          {value}
        </span>

        <button
          type="button"
          onClick={increase}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C9A24A] text-[#0B0B0B] transition hover:bg-[#E6C875]"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}