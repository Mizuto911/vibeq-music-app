import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function ItemLoading() {
  return (
    <div className="mt-4 flex flex-col gap-2 w-50">
      <div className="w-50 h-50 relative">
        <Skeleton
          className="w-full aspect-square"
          borderRadius={6}
          baseColor="var(--background-lighter)"
          highlightColor="var(--background-light)"
        />
      </div>
      <div className="z-2">
        <Skeleton
          className="w-full"
          height={18}
          borderRadius={12}
          count={2}
          baseColor="var(--background-lighter)"
          highlightColor="var(--background-light)"
        />
      </div>
    </div>
  );
}
