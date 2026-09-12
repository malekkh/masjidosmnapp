"use client";

import { useFormStatus } from "react-dom";
import Spinner from "@/components/Spinner";

type Props = {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
  disabled?: boolean;
};

export default function SubmitButton({ children, pendingText, className, disabled = false }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending || disabled} aria-busy={pending} className={className}>
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <Spinner size={16} />
          {pendingText ?? children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
