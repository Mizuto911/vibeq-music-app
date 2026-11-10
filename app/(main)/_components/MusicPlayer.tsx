"use client";

import Image from "next/image";
import Icons from "@/utils/icons";
import { MouseEvent, useState } from "react";
import clsx from "clsx";

interface SliderProps {
  className?: string;
  defaultVal?: number;
}

export default function MusicPlayer() {
  return (
    <section className="flex h-30 w-full shrink-0 items-center justify-between p-4">
      <div className="flex gap-4 w-60 items-center">
        <Image
          src="https://br-billowing-rice-b3586edm.storage.c-4.ap-southeast-1.aws.neon.tech/song-covers/ece35847-5fec-4210-85f0-f82c66b6d29e.jpg"
          className="w-14 aspect-square rounded-md"
          alt="Current Song Cover"
          width={50}
          height={50}
        />
        <div className="flex flex-col justify-center">
          <h3 className="text-md font-bold">Resting Power</h3>
          <p className="opacity-75 text-xs">Mori Calliope</p>
        </div>
      </div>
      <div className="flex-1 flex gap-3 flex-col justify-center items-center">
        <div className="flex gap-4 justify-center items-center w-[50%]">
          <Icons.Shuffle className="text-xl" />
          <Icons.PreviousMusic className="text-xl" />
          <button className="p-3 rounded-full bg-foreground">
            <Icons.Play className="text-xl text-background" />
          </button>
          <Icons.NextMusic className="text-xl" />
          <Icons.Loop className="text-xl" />
        </div>
        <div className="w-full flex justify-center items-center gap-2 text-sm">
          <p>0:00</p>
          <Slider className="w-[50%]" />
          <p>0:00</p>
        </div>
      </div>
      <div className="w-60 flex items-center justify-end gap-4">
        <Icons.MusicQueue className="text-xl" />
        <Icons.VolumeHigh className="text-xl" />
        <Slider defaultVal={100} />
      </div>
    </section>
  );
}

function Slider({ className, defaultVal }: SliderProps) {
  const [percentage, setPercentage] = useState(
    defaultVal == null ? 0 : defaultVal,
  );
  const [hoverPercent, setHoverPercent] = useState<number | null>(null);

  function handleElementHover(
    e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>,
  ) {
    const elementRect = e.currentTarget.getBoundingClientRect();

    const width = Math.round(elementRect.width);
    const x = Math.round(e.clientX - elementRect.x);

    const hp = (x / width) * 100;
    setHoverPercent(hp > percentage ? hp : null);
  }

  return (
    <input
      min={0}
      max={100}
      value={percentage}
      onMouseLeave={() => setHoverPercent(null)}
      onMouseMove={handleElementHover}
      onChange={(e) => setPercentage(Number(e.target.value))}
      type="range"
      style={{
        background: `linear-gradient(to right, var(--accent) ${percentage}%, var(--background-lighter) ${percentage}%, var(--background-lighter) ${hoverPercent ?? percentage}%, var(--background-light) ${hoverPercent ?? percentage}%)`,
      }}
      className={clsx(
        className,
        `h-1.5 rounded-full appearance-none cursor-pointer 
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform
        [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:hover:scale-105 [&::-moz-range-thumb]:transition-transform`,
      )}
    />
  );
}
