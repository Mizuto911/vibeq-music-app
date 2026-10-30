import Image from "next/image";
import Icons from "@/utils/icons";

interface SongItemProps {
  coverSrc?: string;
  name: string;
  artist: string;
}

export default function SongItem({ coverSrc, name, artist }: SongItemProps) {
  return (
    <div className="mt-4 flex flex-col gap-2 w-50 cursor-pointer relative group">
      <div className="w-full h-full absolute inset-0 opacity-0 place-self-center scale-80 bg-background-lighter rounded-xl group-hover:opacity-100 group-hover:scale-110 transition-all"></div>
      <div className="w-50 h-50 relative">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={`${name} Song Cover`}
            width={500}
            height={500}
            className="w-full h-full rounded-md object-cover z-2"
          />
        ) : (
          <div className="w-full aspect-square rounded-md grid place-content-center text-4xl bg-background">
            <Icons.Note className="opacity-60" />
          </div>
        )}
        <button className="w-12 h-12 translate-y-2 cursor-pointer opacity-0 rounded-full bg-accent absolute mb-2 me-2 right-0 bottom-0 grid place-content-center shadow-xl group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 transition-all">
          <Icons.Play className="text-background text-lg" />
        </button>
      </div>
      <div className="z-2">
        <h3 className="text-lg font-bold line-clamp-1">{name}</h3>
        <p className="text-sm opacity-75 line-clamp-1">Artist: {artist}</p>
      </div>
    </div>
  );
}
