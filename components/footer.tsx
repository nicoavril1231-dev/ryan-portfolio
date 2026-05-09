import Link from "next/link";
import { siGithub, siX } from "simple-icons";

import { BrandIcon } from "@/components/brand-icon";
import { linkedinIcon } from "@/lib/brand-paths";
import { site } from "@/lib/site";

const socials = [
  { label: "GitHub", url: site.social.github, icon: siGithub },
  { label: "LinkedIn", url: site.social.linkedin, icon: linkedinIcon },
  { label: "X", url: site.social.twitter, icon: siX },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-(--border) py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="text-center text-xs text-(--muted-foreground) sm:text-left">
          © {new Date().getFullYear()} {site.name} — Built with Next.js & ☕ from Nice.
        </p>

        <ul className="flex items-center gap-1">
          {socials.map((s) => (
            <li key={s.label}>
              <Link
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex size-9 items-center justify-center rounded-full text-(--muted-foreground) transition-colors hover:bg-(--foreground)/[0.04] hover:text-(--foreground) dark:hover:bg-white/[0.04]"
              >
                <BrandIcon icon={s.icon} className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
