"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { LocaleToggle } from "@/components/locale-toggle";
import { useDictionary } from "@/components/locale-provider";
import { NAV_ICONS, type NavIconKey } from "@/components/nav-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { navLinks, type NavLinkLabelKey } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const dict = useDictionary();
  const sectionIds = useMemo(
    () => navLinks.map((l) => l.href.slice(1)),
    [],
  );
  const activeSection = useActiveSection(sectionIds);

  return (
    <>
      <DesktopSidebar dict={dict} activeSection={activeSection} />
      <MobileBottomBar dict={dict} activeSection={activeSection} />
    </>
  );
}

// -----------------------------------------------------------------------------
// Desktop : sidebar fixe à gauche
// -----------------------------------------------------------------------------
function DesktopSidebar({
  dict,
  activeSection,
}: {
  dict: Dictionary;
  activeSection: string | null;
}) {
  // Sync de l'état hover avec mouseEnter/Leave : nécessaire pour que
  // motion détecte le changement d'orientation des segmented toggles
  // (les changements pure CSS ne déclenchent pas les layout effects).
  const [hovered, setHovered] = useState(false);

  return (
    <motion.aside
      initial={{ x: -64, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group fixed inset-y-0 left-0 z-50 hidden md:flex",
        "w-16 hover:w-52 flex-col justify-between py-6",
        "border-r border-(--border) bg-(--background)/70 backdrop-blur-2xl",
        "transition-[width] duration-300 ease-out",
      )}
      aria-label="Navigation"
    >
      {/* `items-center` permet aux <Link> de garder leur largeur explicite
          (w-10 → w-full) au lieu d'être stretched par défaut. */}
      <div className="flex flex-col items-center gap-1 px-3">
        {navLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            label={dict.nav[link.labelKey]}
            iconKey={link.iconKey}
            active={activeSection === link.href.slice(1)}
          />
        ))}
      </div>

      {/* Bas : segmented toggles. Verticaux quand sidebar repliée, ils
          rotent en horizontal au hover (motion layout). */}
      <div className="flex flex-col items-center gap-3 px-3">
        <ThemeToggle orientation={hovered ? "horizontal" : "vertical"} />
        <LocaleToggle orientation={hovered ? "horizontal" : "vertical"} />
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
          "relative flex h-10 items-center rounded-lg text-sm font-medium",
          // Square 40×40 quand replié → full width quand sidebar étendue.
          "w-10 group-hover:w-full",
          // Layout flex : icône centrée quand replié, icône+label à gauche
          // quand étendue (avec padding et gap qui apparaissent).
          "justify-center group-hover:justify-start",
          "px-0 group-hover:px-2.5",
          "gap-0 group-hover:gap-3",
          // Toutes ces propriétés transitionnent en parallèle pour un
          // changement d'état fluide.
          "transition-[width,padding,gap,background-color,color] duration-300 ease-out",
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
        {/* Label : largeur 0 quand replié (overflow-hidden cache le texte),
            grandit jusqu'à sa taille naturelle quand étendu. */}
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap",
            "max-w-0 opacity-0",
            "transition-[max-width,opacity] duration-300 ease-out",
            "group-hover:max-w-[160px] group-hover:opacity-100",
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
function MobileBottomBar({
  dict,
  activeSection,
}: {
  dict: Dictionary;
  activeSection: string | null;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <motion.nav
      aria-label="Navigation"
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
          href={link.href}
          label={dict.nav[link.labelKey]}
          iconKey={link.iconKey}
          active={activeSection === link.href.slice(1)}
        />
      ))}
      <span aria-hidden className="mx-1 h-6 w-px bg-(--border-strong)" />
      <ThemeToggle orientation="horizontal" />
      <LocaleToggle orientation="horizontal" />
    </motion.nav>
  );
}

function MobileNavItem({ href, label, iconKey, active }: SidebarLinkProps) {
  const Icon = NAV_ICONS[iconKey];
  return (
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

export type { NavLinkLabelKey };
