import Icons from "@/utils/icons";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="flex flex-col flex-1 items-center justify-between bg-background font-sans">
      <header className="flex justify-between items-center w-full p-3">
        <div className="flex gap-2 items-center">
          <Skeleton
            circle
            baseColor="var(--background-light)"
            highlightColor="var(--background-lighter)"
            width={32}
            height={32}
          />
          <h1 className="font-bold text-xl text-primary">
            <Skeleton
              className="mt-2"
              baseColor="var(--background-light)"
              highlightColor="var(--background-lighter)"
              borderRadius={12}
              width={200}
              height={20}
            />
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton
            circle
            baseColor="var(--background-light)"
            highlightColor="var(--background-lighter)"
            width={32}
            height={32}
          />
          <Skeleton
            borderRadius={100}
            baseColor="var(--background-light)"
            highlightColor="var(--background-lighter)"
            width={360}
            height={32}
          />
        </div>
        <div className="flex gap-4 items-center">
          <Skeleton
            borderRadius={100}
            baseColor="var(--background-light)"
            highlightColor="var(--background-lighter)"
            width={128}
            height={40}
          />
          <Skeleton
            borderRadius={100}
            baseColor="var(--background-light)"
            highlightColor="var(--background-lighter)"
            width={128}
            height={40}
          />
        </div>
      </header>
      <main className="flex justify-between gap-2 flex-1 w-full">
        <Skeleton
          className="h-full"
          width={240}
          borderRadius={6}
          baseColor="var(--background-light)"
          highlightColor="var(--background-lighter)"
        />
        <Skeleton
          containerClassName="flex-1"
          className="h-full"
          borderRadius={6}
          baseColor="var(--background-light)"
          highlightColor="var(--background-lighter)"
        />
        <Skeleton
          className="h-full"
          width={240}
          borderRadius={6}
          baseColor="var(--background-light)"
          highlightColor="var(--background-lighter)"
        />
      </main>
      <section className="h-30 w-full flex justify-center items-center">
        <Skeleton
          borderRadius={100}
          baseColor="var(--background-light)"
          highlightColor="var(--background-lighter)"
          width={500}
          height={32}
        />
      </section>
    </div>
  );
}
