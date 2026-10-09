import Icons from "@/utils/icons";

export default function Home() {
  const user = null;
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <header className="flex justify-between items-center w-full p-3">
        <div className="flex gap-2 items-center">
          <Icons.TempLogo className="text-xl text-primary" />
          <h1 className="font-bold text-xl text-primary">VibeQ</h1>
        </div>
        <div className="flex gap-2 items-center">
          <button className="w-8 h-8 p-5 bg-background-light grid place-content-center rounded-full">
            <Icons.Home className="text-foreground text-xl" />
          </button>
          <div className="px-4 py-2 w-90 flex justify-between items-center bg-background-light rounded-full">
            <Icons.Search className="text-xl" />
            <input
              type="text"
              className="outline-none text-4 flex-1 px-3"
              placeholder="What music are you looking for?"
            />
            <div className="border-l-2 border-foreground ps-4">
              <Icons.Browse className="text-xl" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Icons.Notification className="text-xl" />
              <div className="w-8 h-8 bg-accent rounded-full grid place-content-center text-background font-bold">
                P
              </div>
            </>
          ) : (
            <>
              <button className="cursor-pointer hover:opacity-75 transition-all p-2">
                Sign Up
              </button>
              <button className="p-2 bg-accent rounded-full font-bold text-background w-32 cursor-pointer hover:opacity-75 transition-all">
                Log In
              </button>
            </>
          )}
        </div>
      </header>
      <main className="flex justify-between gap-2 flex-1 w-full">
        <section className="rounded-md bg-background-light p-4 w-60">
          <div className="flex justify-between items-center">
            <h2 className="text-md font-bold">Your Library</h2>
            <div className="flex gap-2">
              <button className="text-xl bg-background-lighter p-4 w-6 h-6 rounded-full grid place-content-center">
                +
              </button>
              <button className="grid place-content-center">
                <Icons.Expand className="text-xl" />
              </button>
            </div>
          </div>
        </section>
        <section className="rounded-md bg-background-light p-4 flex-1"></section>
        <section className="rounded-md bg-background-light p-4 w-60"></section>
      </main>
      <section className="h-30 w-full flex justify-center items-center">
        <p>This is where the music player goes.</p>
      </section>
    </div>
  );
}
