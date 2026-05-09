import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

// Variantes de bouton inspirées de shadcn, mais avec une variante "gradient"
// custom pour les CTA primaires du portfolio.
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full font-medium tracking-tight transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--background)",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // Fond plein, accent gradient — le CTA principal.
        gradient: [
          "text-white shadow-lg shadow-[color:var(--accent-from)]/20",
          "bg-[length:200%_auto] bg-[linear-gradient(110deg,var(--accent-from),var(--accent-to),var(--accent-from))]",
          "hover:bg-[position:100%_50%] hover:shadow-[color:var(--accent-from)]/35",
        ].join(" "),
        // Couleur primaire opaque (noir en dark, blanc en light).
        primary:
          "bg-(--primary) text-(--primary-foreground) hover:bg-(--primary)/90",
        // Bordure fine + transparent → "ghost" élégant.
        ghost:
          "bg-transparent text-(--foreground) border border-(--border-strong) hover:bg-(--foreground)/[0.04] dark:hover:bg-white/[0.04]",
        // Pour les actions purement subtiles (footer, nav).
        link:
          "text-(--muted-foreground) hover:text-(--foreground) underline-offset-4 hover:underline",
        // Carré, transparent, juste pour les icônes.
        icon:
          "bg-transparent text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--foreground)/[0.04] dark:hover:bg-white/[0.05]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// asChild permet de "transformer" le bouton en n'importe quel élément
// (ex. <a>, <Link>) sans dupliquer les classes ni casser l'a11y.
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
