import { Skeleton } from "./skeleton";

export const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 w-full h-full">
      <Skeleton className="h-60 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
    </div>
  );
};
