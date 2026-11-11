"use client";

import Image from "next/image";
import Icons from "@/utils/icons";
import timeFormatter from "@/utils/timeFormatter";
import { requestSongURL } from "@/server/actions/song";
import { ChangeEvent, MouseEvent, useState, useRef, useEffect } from "react";

interface SliderProps {
  className?: string;
  step?: number;
  min: number;
  max: number;
  value: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentSong, setCurrentSong] = useState<string>();
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    async function getCurrentSong() {
      const url = await requestSongURL(
        "4f96951e-0b4a-4512-9192-2fb6e8a33eee.mp3",
      );
      setCurrentSong(url);
    }
    getCurrentSong();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current)
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
      };
  }, [currentSong]);

  useEffect(() => {
    if (!audioRef.current) return;
    function handleTimeUpdate() {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
    }
    function pauseMusic() {
      if (audioRef.current) setIsPlaying(false);
    }
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("ended", pauseMusic);
    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current?.removeEventListener("ended", pauseMusic);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
    if (!currentSong) return;
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) audioRef.current.currentTime = time;
  }

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
        <audio src={currentSong} ref={audioRef} />
        <div className="flex gap-4 justify-center items-center w-[50%]">
          <Icons.Shuffle className="text-xl" />
          <Icons.PreviousMusic className="text-xl" />
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="p-3 rounded-full bg-foreground cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Icons.Pause className="text-xl text-background" />
            ) : (
              <Icons.Play className="text-xl text-background" />
            )}
          </button>
          <Icons.NextMusic className="text-xl" />
          <Icons.Loop className="text-xl" />
        </div>
        <div className="w-full flex justify-center items-center gap-2 text-sm">
          <p>{timeFormatter(currentTime)}</p>
          <Slider
            min={0}
            max={duration || 100}
            value={currentSong ? Math.round(currentTime) : 0}
            onChange={handleTimeChange}
            className="w-[50%]"
          />
          <p>{timeFormatter(duration)}</p>
        </div>
      </div>
      <div className="w-60 flex items-center justify-end gap-4">
        <Icons.MusicQueue className="text-xl" />
        <Icons.VolumeHigh className="text-xl" />
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </section>
  );
}

function Slider({ className, min, max, value, step, onChange }: SliderProps) {
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
        onMouseLeave={() => setHoverPercent(null)}
        onMouseMove={handleElementHover}
        onChange={onChange}
        type="range"
        style={{
          background: `linear-gradient(to right, var(--accent) ${percentage}%, var(--background-lighter) ${percentage}%, var(--background-lighter) ${hoverPercent ?? percentage}%, var(--background-light) ${hoverPercent ?? percentage}%)`,
        }}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer 
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform
          [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:hover:scale-105 [&::-moz-range-thumb]:transition-transform`,
        "
      />
    </div>
  );
}
