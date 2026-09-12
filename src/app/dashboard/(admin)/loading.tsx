import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl">
      <Skeleton className="h-8 w-56" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <div className="mt-8 space-y-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    </div>
  );
}
