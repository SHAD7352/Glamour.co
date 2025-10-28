import { Skeleton } from "@mui/material";

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="relative h-56 w-full md:h-48 lg:h-56">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          className="rounded-t-2xl"
        />
      </div>
      <div className="p-4">
        <Skeleton variant="text" width="80%" height={24} className="mb-2" />
        <Skeleton variant="text" width="60%" height={20} className="mb-2" />
        <Skeleton variant="text" width="40%" height={16} />
      </div>
      <div className="mt-auto flex gap-3 p-4">
        <Skeleton variant="rectangular" width="48%" height={40} />
        <Skeleton variant="rectangular" width="48%" height={40} />
      </div>
    </div>
  );
}
