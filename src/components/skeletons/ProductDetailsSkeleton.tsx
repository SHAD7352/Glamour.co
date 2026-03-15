"use client";

export default function ProductDetailsSkeleton() {
  return (
    <section className="bg-gray-100 py-12 text-gray-900 dark:bg-gray-900 dark:text-white md:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-dark lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Image Skeleton */}
          <div className="h-80 w-full animate-pulse bg-gray-200 dark:bg-gray-700 md:h-96 lg:h-auto" />

          {/* Content Skeleton */}
          <div className="flex flex-col p-6 sm:p-8">
            {/* Title Skeleton */}
            <div className="mb-3 h-10 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

            {/* Price Skeleton */}
            <div className="mb-6 h-8 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

            {/* Description Skeleton */}
            <div className="mb-8 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Button Skeleton */}
            <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-6 dark:border-gray-700 sm:flex-row">
              <div className="h-12 flex-1 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-12 flex-1 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
