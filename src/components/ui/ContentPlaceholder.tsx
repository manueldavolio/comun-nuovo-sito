type ContentPlaceholderProps = {
  badge?: string;
  eyebrow?: string;
  title: string;
  message: string;
  className?: string;
};

export function ContentPlaceholder({
  badge = "IN AGGIORNAMENTO",
  eyebrow,
  title,
  message,
  className = "",
}: ContentPlaceholderProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-200/90 bg-white p-8 text-center shadow-lg shadow-slate-900/5 sm:p-10 ${className}`}
    >
      <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sky-700">
        {badge}
      </span>
      {eyebrow ? (
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.28em] text-sky-700">{eyebrow}</p>
      ) : null}
      <h2 className="font-display mt-3 text-2xl uppercase tracking-wide text-slate-900 sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">{message}</p>
    </div>
  );
}
