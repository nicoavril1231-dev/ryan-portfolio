"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/site";

// Nav sticky avec backdrop-blur qui s'intensifie au scroll.
// Mobile : panneau plein écran qui slide-in depuis le haut.
export function Navigation() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Au-delà de 40px de scroll : opacité de fond max, bordure visible.
  const blurOpacity = useTransform(scrollY, [0, 80], [0.4, 0.8]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  // Ferme le menu mobile sur resize → desktop pour éviter un état zombie.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Empêche le scroll sous le menu mobile ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Couche de fond glassmorphique animée */}
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-(--background) backdrop-blur-xl"
          style={{ opacity: blurOpacity }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-(--border)"
          style={{ opacity: borderOpacity }}
        />

        <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="group relative flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
            aria-label={`${site.name} — accueil`}
          >
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-md bg-(--foreground) text-(--background) text-xs font-bold transition-transform group-hover:scale-105"
            >
              {site.initials}
            </span>
            <span className="hidden text-(--foreground) sm:inline">
              {site.name}
            </span>
          </Link>

          {/* Liens desktop */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm",
                    "text-(--muted-foreground) transition-colors",
                    "hover:bg-(--foreground)/[0.04] hover:text-(--foreground)",
                    "dark:hover:bg-white/[0.04]",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Burger mobile */}
            <Button
              variant="icon"
              size="icon"
              className="md:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Panneau mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-(--background)/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-full flex-col items-start justify-center gap-6 px-8 pt-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-4xl font-semibold tracking-tight text-(--foreground) hover:text-gradient transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
