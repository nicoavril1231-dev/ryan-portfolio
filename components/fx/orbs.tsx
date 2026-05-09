import { cn } from "@/lib/utils";

// Trois orbes blurred qui flottent en arrière-plan. CSS only.
// Volontairement low-opacity pour rester subtil en dark + ne pas blesser en light.
interface OrbsProps {
  className?: string;
}

export function Orbs({ className }: OrbsProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute -top-40 -left-32 size-[36rem] rounded-full opacity-30 blur-3xl animate-(--animate-orb)"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--accent-from), transparent 60%)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute top-20 -right-40 size-[40rem] rounded-full opacity-25 blur-3xl animate-(--animate-orb)"
        style={{
          background:
            "radial-gradient(circle at 60% 50%, var(--accent-to), transparent 65%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute bottom-[-12rem] left-1/3 size-[32rem] rounded-full opacity-20 blur-3xl animate-(--animate-orb)"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--accent-from) 60%, var(--accent-to) 40%), transparent 65%)",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}
