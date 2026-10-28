"use client";

import Icons from "@/utils/icons";

export default function SearchBar() {
  return (
    <div className="flex gap-2 items-center">
      <button className="w-8 h-8 p-5 bg-background-light grid place-content-center rounded-full cursor-pointer hover:scale-110 transition-transform">
        <Icons.Home className="text-foreground text-xl" />
      </button>
      <div className="px-4 py-2 w-90 flex justify-between items-center bg-background-light rounded-full">
        <Icons.Search className="text-xl" />
        <input
          type="text"
          className="outline-none text-4 flex-1 px-3"
          placeholder="What music are you looking for?"
        />
        <button className="border-l-2 border-foreground ps-4 cursor-pointer">
          <Icons.Browse className="text-xl hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
