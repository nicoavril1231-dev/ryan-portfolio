import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[120px] w-full rounded-lg border border-(--border) bg-(--muted)/40 px-4 py-3 text-sm leading-relaxed",
      "text-(--foreground) placeholder:text-(--muted-foreground)",
      "transition-colors",
      "hover:border-(--border-strong) focus-visible:border-transparent",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "resize-y",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
