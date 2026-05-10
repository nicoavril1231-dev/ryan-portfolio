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
      {/* Pas de `items-center` : on veut que les Link soient stretchés à
          la largeur du contenu de la sidebar (qui change avec son hover).
          Comme ça leur largeur reste toujours synchronisée et il n'y a
          jamais de mismatch qui pousse les items à gauche. */}
      <div className="flex flex-col gap-1 px-3">
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
          rotent en horizontal au hover (motion layout).
          `instanceId="sidebar"` garde le layoutId de la bulle stable
          quand l'orientation change → animation de slide au lieu d'un
          unmount/remount. */}
      <div className="flex flex-col items-center gap-3 px-3">
        <ThemeToggle
          instanceId="sidebar"
          orientation={hovered ? "horizontal" : "vertical"}
        />
        <LocaleToggle
          instanceId="sidebar"
          orientation={hovered ? "horizontal" : "vertical"}
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
          // `overflow-hidden` clip le label hors champ quand la sidebar
          // est repliée — le label garde ses dimensions naturelles.
          "relative flex h-10 items-center overflow-hidden rounded-lg text-sm font-medium",
          // `w-full` toujours : le link suit pile la largeur de la
          // sidebar (40 px replié → 100 % étendu). Plus de transition
          // sur sa propre width → impossible d'être désynchronisé avec
          // le parent qui s'anime, donc plus de "rentre par la gauche".
          "w-full",
          "transition-[background-color,color] duration-300 ease-out",
          active
            ? "bg-(--foreground)/[0.06] text-(--foreground) dark:bg-white/[0.06]"
            : "text-(--muted-foreground) hover:bg-(--foreground)/[0.05] hover:text-(--foreground) dark:hover:bg-white/[0.05]",
        )}
      >
        {/* Icône dans un slot fixe `size-10` (40×40) en flex-start.
            - Quand le link est w-10 → le slot remplit tout le link →
              l'icône y est centrée (visuellement centrée dans le link).
            - Quand le link est w-full → le slot garde 40 px à gauche,
              le reste sert au label. L'icône reste à la gauche du link
              entier. */}
        <span
          aria-hidden
          className={cn(
            "flex size-10 shrink-0 items-center justify-center transition-colors",
            active && "text-(--accent-from)",
          )}
        >
          <Icon />
        </span>
        {/* Label : commence juste après le slot icône. Largeur naturelle ;
            quand le link est w-10, il dépasse à droite et est clippé par
            l'overflow-hidden. Fade + slide à l'apparition. */}
        <span
          className={cn(
            "whitespace-nowrap pr-3",
            "opacity-0 -translate-x-1",
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
      <ThemeToggle instanceId="mobile" orientation="horizontal" />
      <LocaleToggle instanceId="mobile" orientation="horizontal" />
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
