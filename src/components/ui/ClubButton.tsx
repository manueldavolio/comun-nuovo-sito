import Link from "next/link";

type ClubButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "outlineLight" | "ghost";
  className?: string;
};

export function ClubButton({
  href,
  children,
  variant = "primary",
  className = "",
}: ClubButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-md px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009dff]/70";
  const variants: Record<NonNullable<ClubButtonProps["variant"]>, string> = {
    primary:
      "bg-[#003f8f] text-white shadow-[0_8px_24px_-8px_rgba(0,63,143,0.45)] hover:-translate-y-0.5 hover:bg-[#002f6b] hover:shadow-[0_12px_28px_-8px_rgba(0,63,143,0.5)]",
    outline:
      "border-2 border-white/90 bg-transparent text-white hover:bg-white/10 hover:border-white",
    outlineLight:
      "border border-[#e8ecf0] bg-white text-[#001b3d] shadow-sm hover:-translate-y-0.5 hover:border-[#009dff]/40 hover:bg-[#f3f7fb]",
    ghost:
      "text-sky-100 hover:bg-white/10",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
