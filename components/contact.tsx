"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { siGithub, siX } from "simple-icons";
import { toast } from "sonner";
import { z } from "zod";

import { BrandIcon } from "@/components/brand-icon";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { linkedinIcon } from "@/lib/brand-paths";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Schéma form — messages d'erreur en français.
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Au moins 2 caractères")
    .max(80, "Trop long"),
  email: z.string().email("Email invalide"),
  message: z
    .string()
    .min(10, "Au moins 10 caractères")
    .max(2000, "2000 caractères max"),
});

type ContactValues = z.infer<typeof contactSchema>;

const socials = [
  { label: "GitHub", url: site.social.github, icon: siGithub },
  { label: "LinkedIn", url: site.social.linkedin, icon: linkedinIcon },
  { label: "X / Twitter", url: site.social.twitter, icon: siX },
] as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  // Pas de backend pour l'instant — on confirme avec un toast et on logge.
  // À brancher sur une route API (`app/api/contact/route.ts`) ou une server
  // action quand ce sera nécessaire.
  const onSubmit = async (values: ContactValues) => {
    await new Promise((r) => setTimeout(r, 600));
    console.info("[contact]", values);
    toast.success("Message envoyé !", {
      description: "Je reviens vers toi sous 24h, promis.",
    });
    form.reset();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      toast("Email copié", { description: site.email });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Impossible de copier", {
        description: "Sélectionne l’adresse manuellement.",
      });
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-24">
      {/* Halo de fond */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[30rem] -translate-y-1/2 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, var(--accent-from), transparent 70%)",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <SectionHeader
          index="05"
          eyebrow="Get in touch"
          title="Travaillons ensemble."
          description="Une alternance, un side-project, ou juste envie d'échanger sur ton stack ? Le plus simple, c'est encore l'email."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Colonne gauche : email + socials */}
          <div className="flex flex-col gap-8">
            <Reveal>
              <a
                href={`mailto:${site.email}`}
                className="group flex flex-col gap-2"
              >
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-(--muted-foreground)">
                  Email
                </span>
                <span className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-(--foreground) transition-colors group-hover:text-gradient md:text-3xl">
                  <Mail className="size-5 shrink-0 text-(--muted-foreground) transition-colors group-hover:text-(--accent-from)" />
                  <span className="break-all">{site.email}</span>
                </span>
              </a>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyEmail}
                  aria-label="Copier l’email"
                >
                  {copied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copied ? "Copié" : "Copier"}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-(--muted-foreground)">
                  Ailleurs
                </span>
                <ul className="flex flex-wrap items-center gap-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className={cn(
                              "inline-flex size-11 items-center justify-center rounded-full border border-(--border) bg-(--muted)/40",
                              "text-(--muted-foreground) transition-all",
                              "hover:-translate-y-0.5 hover:border-(--border-strong) hover:bg-(--muted)/70 hover:text-(--foreground)",
                            )}
                          >
                            <BrandIcon icon={s.icon} className="size-[18px]" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>{s.label}</TooltipContent>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-xl border border-(--border) bg-(--card)/40 p-5 backdrop-blur-xl">
                <p className="text-sm leading-relaxed text-(--muted-foreground)">
                  <span className="text-(--foreground)">Disponibilité :</span>{" "}
                  alternance dès septembre 2026 (BUT 3). Stage court d’ici là
                  envisageable.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-(--muted-foreground)">
                  <span className="text-(--foreground)">Localisation :</span>{" "}
                  Nice / Sophia-Antipolis, ou full-remote.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Colonne droite : formulaire */}
          <Reveal delay={0.1}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 rounded-xl border border-(--border) bg-(--card)/40 p-6 backdrop-blur-xl md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldGroup label="Nom" error={form.formState.errors.name?.message}>
                  <Input
                    {...form.register("name")}
                    placeholder="Camille Martin"
                    autoComplete="name"
                    aria-invalid={!!form.formState.errors.name}
                  />
                </FieldGroup>
                <FieldGroup label="Email" error={form.formState.errors.email?.message}>
                  <Input
                    type="email"
                    {...form.register("email")}
                    placeholder="camille@entreprise.com"
                    autoComplete="email"
                    aria-invalid={!!form.formState.errors.email}
                  />
                </FieldGroup>
              </div>
              <FieldGroup
                label="Message"
                error={form.formState.errors.message?.message}
              >
                <Textarea
                  {...form.register("message")}
                  placeholder="On cherche un alternant front-end, et ton portfolio nous a tapé dans l'œil…"
                  aria-invalid={!!form.formState.errors.message}
                />
              </FieldGroup>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <p className="text-xs text-(--muted-foreground)">
                  Je réponds sous 24h en moyenne.
                </p>
                <Button
                  type="submit"
                  variant="gradient"
                  size="md"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Envoi…" : "Envoyer"}
                  <Send className="size-4" />
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface FieldGroupProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

// Group label + champ + erreur. Pas besoin d'un FormField complet de shadcn
// pour 3 inputs — on garde simple.
function FieldGroup({ label, error, children }: FieldGroupProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-(--muted-foreground)">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-xs text-rose-400" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
