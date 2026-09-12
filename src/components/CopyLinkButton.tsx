"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

export default function CopyLinkButton({
  path,
  label = "نسخ الرابط",
  className,
}: {
  path: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      const url = `${window.location.origin}${path}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently no-op.
    }
  }

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? <Check size={14} /> : <LinkIcon size={14} />}
      {copied ? "تم نسخ الرابط" : label}
    </button>
  );
}
