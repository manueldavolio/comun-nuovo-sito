export function formatNewsDate(iso: string, style: "long" | "short" = "long") {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: style === "long" ? "long" : "short",
    year: "numeric",
  }).format(new Date(iso));
}
