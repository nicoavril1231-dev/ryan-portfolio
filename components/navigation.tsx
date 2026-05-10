"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { NAV_ICONS, type NavIconKey } from "@/components/nav-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

// Navigation à deux modes :
// - Desktop (md+) : sidebar fixe à gauche, w-16 → w-52 au hover.
//   Icônes SVG animées (motion variants), labels qui se déroulent.
//   La section couramment lue est mise en évidence (bg + icône en accent).
// - Mobile : pill flottante en bas, icônes seules + theme toggle.
// Pas de logo "RA" — la sidebar parle d'elle-même.

export function Navigation() {
  // useMemo : garde une référence stable pour la liste des sectionIds afin
  // que useActiveSection ne recrée pas son observer à chaque render.
  const sectionIds = useMemo(
    () => navLinks.map((l) => l.href.slice(1)),
    [],
  );
  const activeSection = useActiveSection(sectionIds);

  return (
    <>
      <DesktopSidebar activeSection={activeSection} />
      <MobileBottomBar activeSection={activeSection} />
    </>
  );
}

// -----------------------------------------------------------------------------
// Desktop : sidebar fixe à gauche
// -----------------------------------------------------------------------------
function DesktopSidebar({ activeSection }: { activeSection: string | null }) {
  return (
    <motion.aside
      initial={{ x: -64, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group fixed inset-y-0 left-0 z-50 hidden md:flex",
        "w-16 hover:w-52 flex-col justify-between py-6",
        "border-r border-(--border) bg-(--background)/70 backdrop-blur-2xl",
        "transition-[width] duration-300 ease-out",
      )}
      aria-label="Navigation principale"
    >
      <div className="flex flex-col gap-1 px-3">
        {navLinks.map((link) => (
          <SidebarLink
            key={link.href}
            {...link}
            active={activeSection === link.href.slice(1)}
          />
        ))}
      </div>

      {/* Bas : theme toggle + indicator */}
      <div className="flex flex-col items-center gap-3 px-3">
        <ThemeToggle />
        <div
          aria-hidden
          className="h-8 w-px bg-(--border-strong) opacity-60"
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-(--muted-foreground) opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          v 1.0
        </span>
      </div>
    </motion.aside>
  );
}

interface SidebarLinkProps {
  href: string;
  label: string;
  iconKey: NavIconKey;
  active?: boolean;
}

function SidebarLink({ href, label, iconKey, active }: SidebarLinkProps) {
  const Icon = NAV_ICONS[iconKey];
  return (
    // Wrapper motion : `whileHover` propage la variante "hover" aux enfants
    // motion.* via le variants tree → l'icône joue son anim sans state local.
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="rounded-lg"
    >
      <Link
        href={href}
        aria-current={active ? "true" : undefined}
        className={cn(
          "relative flex items-center gap-3 rounded-lg px-2.5 py-3 text-sm font-medium",
          "transition-colors",
          active
            ? "bg-(--foreground)/[0.06] text-(--foreground) dark:bg-white/[0.06]"
            : "text-(--muted-foreground) hover:bg-(--foreground)/[0.05] hover:text-(--foreground) dark:hover:bg-white/[0.05]",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "flex size-6 shrink-0 items-center justify-center transition-colors",
            active && "text-(--accent-from)",
          )}
        >
          <Icon />
        </span>
        {/* Label révélé en fade + translate quand la sidebar s'élargit */}
        <span
          className={cn(
            "whitespace-nowrap opacity-0 -translate-x-2",
            "transition-[opacity,transform] duration-300 ease-out",
            "group-hover:opacity-100 group-hover:translate-x-0",
          )}
        >
          {label}
        </span>
      </Link>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Mobile : pill flottante en bas
// -----------------------------------------------------------------------------
function MobileBottomBar({ activeSection }: { activeSection: string | null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <motion.nav
      aria-label="Navigation principale"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: mounted ? 0 : 80, opacity: mounted ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn(
        "fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 md:hidden",
        "rounded-full border border-(--border) bg-(--background)/85 px-2 py-2 shadow-2xl backdrop-blur-2xl",
      )}
    >
      {navLinks.map((link) => (
        <MobileNavItem
          key={link.href}
          {...link}
          active={activeSection === link.href.slice(1)}
        />
      ))}
      <span aria-hidden className="mx-1 h-6 w-px bg-(--border-strong)" />
      <ThemeToggle />
    </motion.nav>
  );
}

function MobileNavItem({ href, label, iconKey, active }: SidebarLinkProps) {
  const Icon = NAV_ICONS[iconKey];
  return (
    // whileTap pour donner du feedback au tap mobile (pas de hover sur touch).
    <motion.div
      initial="rest"
      animate="rest"
      whileTap="hover"
      whileHover="hover"
    >
      <Link
        href={href}
        aria-label={label}
        aria-current={active ? "true" : undefined}
        className={cn(
          "flex size-10 items-center justify-center rounded-full",
          "transition-colors",
          active
            ? "bg-(--foreground)/[0.06] text-(--accent-from) dark:bg-white/[0.08]"
            : "text-(--muted-foreground) hover:bg-(--foreground)/[0.06] hover:text-(--foreground) dark:hover:bg-white/[0.08]",
        )}
      >
        <Icon />
      </Link>
    </motion.div>
  );
}
