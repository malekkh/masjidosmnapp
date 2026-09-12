import { toEasternArabicNumerals } from "@/lib/fonts";

const DOT_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AyahMarker({ number }: { number: number }) {
  return (
    <span
      className="relative mx-1 inline-flex h-8 w-8 shrink-0 translate-y-1.5 items-center justify-center align-middle"
      aria-label={`نهاية الآية ${number}`}
    >
      <svg viewBox="0 0 32 32" className="absolute inset-0 h-full w-full text-[var(--amber)]">
        <circle cx="16" cy="16" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
        {DOT_ANGLES.map((angle) => {
          const radians = (angle * Math.PI) / 180;
          const x = 16 + 14 * Math.cos(radians);
          const y = 16 + 14 * Math.sin(radians);
          return <circle key={angle} cx={x} cy={y} r="1.4" fill="currentColor" />;
        })}
      </svg>
      <span className="relative font-sans text-[11px] font-bold leading-none text-[var(--emerald-deep)]">
        {toEasternArabicNumerals(number)}
      </span>
    </span>
  );
}
