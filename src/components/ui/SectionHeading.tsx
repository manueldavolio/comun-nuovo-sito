type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";
  const text = light ? "text-white" : "text-[#001b3d]";
  const sub = light ? "text-white/82" : "text-[#4a5568]";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] ${
            light ? "text-[#7dd3fc]" : "text-[#003f8f]"
          } ${align === "center" ? "justify-center" : ""}`}
        >
          <span
            className={`h-px w-8 shrink-0 ${light ? "bg-[#009dff]/50" : "bg-[#009dff]/45"} ${
              align === "center" ? "max-sm:hidden" : ""
            }`}
            aria-hidden
          />
          {eyebrow}
          {align === "center" ? (
            <span
              className={`h-px w-8 shrink-0 max-sm:hidden ${light ? "bg-[#009dff]/50" : "bg-[#009dff]/45"}`}
              aria-hidden
            />
          ) : null}
        </p>
      ) : null}
      <h2
        className={`font-display text-[clamp(2rem,4vw,2.75rem)] uppercase leading-[0.98] tracking-[0.02em] ${text}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${sub} ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
