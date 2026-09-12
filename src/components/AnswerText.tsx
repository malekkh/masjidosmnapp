import Link from "next/link";

export default function AnswerText({ text, className }: { text: string; className?: string }) {
  const pattern = /\[([^\]]+)\]\((\/fatawa\/[a-zA-Z0-9-]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <Link
        key={key++}
        href={match[2]}
        className="font-bold text-[var(--emerald)] underline underline-offset-2"
      >
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <p className={className}>{parts}</p>;
}
