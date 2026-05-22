import type { ReactNode } from "react";

type IconProps = { className?: string };

export function GrowthIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20V8M12 8l-4 4M12 8l4 4M6 16l-2 2M18 16l2 2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FunIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M8.5 10.5c.5-1 1.5-1.5 3.5-1.5s3 .5 3.5 1.5M9 15.5c.8 1 2 1.5 3 1.5s2.2-.5 3-1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EducationIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 6l8 4.5-8 4.5-8-4.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M6 12v4.5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5V12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TeamIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="16.5" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3.5 19c0-2.5 2.5-4.5 5.5-4.5s5.5 2 5.5 4.5M14 19c0-1.8 1.6-3.2 3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const categoryIconPaths: Record<string, ReactNode> = {
  "scuola-calcio": (
    <path
      d="M12 4l2.2 4.5 5 .7-3.6 3.5.85 5L12 15.8 7.55 17.7l.85-5L4.8 9.2l5-.7L12 4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  "primi-calci": (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 12h8M12 8v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  pulcini: (
    <path
      d="M6 18c2-4 4-6 6-6s4 2 6 6M8 10a4 4 0 018 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  ),
  esordienti: (
    <path
      d="M5 18h14M8 14l4-8 4 8M10 10h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export function CategoryIcon({ slug, className = "h-8 w-8" }: { slug: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      {categoryIconPaths[slug] ?? categoryIconPaths["scuola-calcio"]}
    </svg>
  );
}

export function PhilosophyIcon({
  icon,
  className = "h-7 w-7",
}: {
  icon: "growth" | "fun" | "education" | "team";
  className?: string;
}) {
  switch (icon) {
    case "growth":
      return <GrowthIcon className={className} />;
    case "fun":
      return <FunIcon className={className} />;
    case "education":
      return <EducationIcon className={className} />;
    case "team":
      return <TeamIcon className={className} />;
  }
}
