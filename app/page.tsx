import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-background text-foreground">
        <p className="font-bold text-4xl">
          This is what things currently look like!
        </p>
        <button className="bg-accent w-12.5 h-12.5 rounded-full text-2xl p-1 text-center text-background align-middle">
          ▶︎
        </button>
        <button className="bg-secondary rounded-xl p-4">
          Listen to Us now!
        </button>
        <button className="bg-primary rounded-xl p-4">Another Button</button>
      </main>
    </div>
  );
}
