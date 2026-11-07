"use client";

import Image from "next/image";
import Icons from "@/utils/icons";

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
        <input type="range" className="w-[50%]" />
      </div>
      <div className="w-60 flex items-center justify-end gap-4">
        <Icons.MusicQueue className="text-xl" />
        <Icons.VolumeHigh className="text-xl" />
        <input type="range" />
      </div>
    </section>
  );
}
