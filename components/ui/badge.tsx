import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "rounded-full border px-3 py-1 text-xs font-medium tracking-tight",
    "transition-colors",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-(--border) bg-(--muted)/60 text-(--muted-foreground) backdrop-blur",
        outline:
          "border-(--border-strong) bg-transparent text-(--foreground)",
        // Statut "Disponible" — vert subtle avec dot pulsant.
        status:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/[0.08]",
        gradient:
          "border-transparent bg-(--muted)/40 text-(--foreground) backdrop-blur",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
