import { scheherazadeNew } from "@/lib/fonts";

export default function HonorificSuffix({
  className = "",
  sizeClassName = "text-[1.5em]",
}: {
  className?: string;
  sizeClassName?: string;
}) {
  return (
    <span
      lang="ar"
      title="رضي الله عنه"
      className={`${scheherazadeNew.className} mx-1 inline-block translate-y-[-0.05em] align-middle ${sizeClassName} font-bold leading-none text-[var(--amber)] ${className}`}
    >
      {"﵁"}
    </span>
  );
}
