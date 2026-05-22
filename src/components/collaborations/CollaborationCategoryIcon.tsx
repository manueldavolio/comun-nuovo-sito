import type { CollaborationCategoryIcon as IconId } from "@/data/collaborations";

type Props = {
  id: IconId;
  className?: string;
};

export function CollaborationCategoryIcon({ id, className }: Props) {
  const common = { className, "aria-hidden": true as const };

  switch (id) {
    case "sport":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5.5 8.5c2 1.5 4.5 2 6.5 2s4.5-.5 6.5-2M5.5 15.5c2-1.5 4.5-2 6.5-2s4.5.5 6.5 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "school":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <path
            d="M3 10.5 12 5l9 5.5M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11A1.5 1.5 0 0 0 19 18.5V12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9 20v-5h6v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "events":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M8 14h2v2H8v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2Z"
            fill="currentColor"
          />
        </svg>
      );
    case "inclusion":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="15" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5 18c0-2.2 1.8-4 4-4s4 1.8 4 4M11 18c0-2.2 1.8-4 4-4s4 1.8 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "training":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <path
            d="M4 8h4l2-3 4 14 2-5h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="3" y="18" width="18" height="2" rx="1" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}
