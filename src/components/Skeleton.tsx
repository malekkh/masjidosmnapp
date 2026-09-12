export default function Skeleton({ className = "" }: { className?: string }) {
  return <div role="presentation" className={`animate-pulse rounded-xl bg-[var(--line)]/70 ${className}`} />;
}
