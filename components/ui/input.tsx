import * as React from "react";

import { cn } from "@/lib/utils";

// Input simple, glassmorphic. Hover/focus → ring accent.
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-lg border border-(--border) bg-(--muted)/40 px-4 py-2 text-sm",
      "text-(--foreground) placeholder:text-(--muted-foreground)",
      "transition-colors",
      "hover:border-(--border-strong) focus-visible:border-transparent",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
