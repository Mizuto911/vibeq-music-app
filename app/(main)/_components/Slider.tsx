"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import clsx from "clsx";

interface SliderProps {
  className?: string;
  step?: number;
  min: number;
  max: number;
  value: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function Slider({
  className,
  min,
  max,
  value,
  step,
  onChange,
  disabled,
}: SliderProps) {
  const percentage = (value / max) * 100;
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);

  function handleElementHover(e: MouseEvent<HTMLInputElement>) {
    const elementRect = e.currentTarget.getBoundingClientRect();

    const width = elementRect.width;
    const x = e.clientX - elementRect.x;

    const hp = (x / width) * 100;
    setHoverPercent(hp > percentage ? hp : null);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={className}
    >
      <input
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        disabled={disabled}
        onMouseLeave={() => setHoverPercent(null)}
        onMouseMove={handleElementHover}
        onChange={onChange}
        type="range"
        style={{
          background: `linear-gradient(to right, var(--accent) ${percentage}%, var(--background-lighter) ${percentage}%, var(--background-lighter) ${hoverPercent ?? percentage}%, var(--background-light) ${hoverPercent ?? percentage}%)`,
        }}
        className={clsx(
          !disabled &&
            "cursor-pointer [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:hover:scale-105",
          `w-full h-1.5 rounded-full appearance-none
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:transition-transform
          [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:transition-transform`,
        )}
      />
    </div>
  );
}
