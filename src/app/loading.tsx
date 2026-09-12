import SiteHeader from "@/components/SiteHeader";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen overflow-hidden">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-20 lg:pt-16">
        <div className="flex flex-col justify-center gap-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-12 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-4 w-2/3 max-w-lg" />
        </div>
        <div className="rounded-[2rem] bg-[var(--emerald-deep)] p-6 sm:p-9">
          <div className="h-6 w-32 animate-pulse rounded-xl bg-white/15" />
          <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-white/10" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
