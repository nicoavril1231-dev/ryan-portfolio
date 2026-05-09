import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

// Type minimal partagé avec simple-icons mais autorisant aussi les paths
// hardcodés (LinkedIn, VS Code… retirés de simple-icons).
export interface BrandPath {
  title: string;
  path: string;
  hex: string;
}

interface BrandIconProps extends Omit<SVGProps<SVGSVGElement>, "title"> {
  icon: BrandPath;
  // Si true, on applique la couleur native du logo via fill (utile pour les
  // social links). Sinon on hérite de currentColor.
  colored?: boolean;
}

export function BrandIcon({
  icon,
  colored = false,
  className,
  ...rest
}: BrandIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={colored ? `#${icon.hex}` : "currentColor"}
      aria-label={icon.title}
      className={cn("size-5", className)}
      {...rest}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
