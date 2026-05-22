"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/config/navigation";

/** Ritardo chiusura al uscita col mouse dal gruppo (bottone + pannello) */
const CLOSE_DELAY_MS = 320;

export function NavDropdown({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();
  const children = item.children;

  const clearTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openNow = useCallback(() => {
    clearTimer();
    setOpen(true);
  }, [clearTimer]);

  const scheduleClose = useCallback(() => {
    clearTimer();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearTimer]);

  const toggle = useCallback(() => {
    clearTimer();
    setOpen((v) => !v);
  }, [clearTimer]);

  const closeFromLink = useCallback(() => {
    clearTimer();
    setOpen(false);
    onNavigate?.();
  }, [clearTimer, onNavigate]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!children?.length) return null;

  const parentDuplicatedInChildren = children.some((c) => c.href === item.href);

  return (
    <div
      ref={rootRef}
      className="relative shrink-0"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        className={`flex shrink-0 items-center gap-0.5 rounded-md px-2 py-2 text-[9px] font-semibold uppercase tracking-[0.07em] transition-colors duration-200 xl:px-2.5 xl:text-[9.5px] 2xl:text-[10px] ${
          open ? "bg-[#f3f7fb] text-[#001b3d]" : "text-[#001b3d]/92"
        } hover:bg-[#f3f7fb]`}
        onClick={toggle}
      >
        {item.label}
        <span
          className={`text-[7px] text-slate-400 transition xl:text-[8px] ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      <div
        id={menuId}
        role="menu"
        aria-hidden={!open}
        className={`absolute left-0 top-full z-[10050] -mt-px min-w-[240px] max-w-[min(calc(100vw-1.5rem),320px)] pt-0.5 transition-[opacity,visibility] duration-150 ease-out ${
          open ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
        onMouseEnter={openNow}
        onMouseLeave={scheduleClose}
      >
        <div className="rounded-xl border border-[#e8ecf0] bg-white py-1.5 shadow-[0_16px_48px_-12px_rgba(0,27,61,0.22)]">
          {!parentDuplicatedInChildren ? (
            <Link
              href={item.href}
              role="menuitem"
              className="mx-1 block rounded-lg border-b border-[#e8ecf0] px-3 py-2.5 text-[9px] font-bold uppercase tracking-wide text-[#003f8f] last:border-0 transition-colors duration-200 hover:bg-[#f3f7fb]"
              onClick={closeFromLink}
            >
              {item.label}
            </Link>
          ) : null}
          {children.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              role="menuitem"
              className="mx-1 block rounded-lg px-3 py-2.5 text-[13px] font-medium text-[#001b3d]/92 transition-colors duration-200 hover:bg-[#f3f7fb] hover:text-[#001b3d]"
              onClick={closeFromLink}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
