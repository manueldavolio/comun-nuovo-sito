import Image from "next/image";
import type { StaffMember } from "@/types/site";

export function StaffCard({ member }: { member: StaffMember }) {
  return (
    <article className="club-card-interactive group flex h-full flex-col p-6 text-center sm:p-7">
      <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-sky-50 bg-slate-100 shadow-inner ring-1 ring-slate-200/60 transition duration-300 group-hover:border-sky-100 group-hover:ring-sky-200/80 sm:h-32 sm:w-32">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="128px"
        />
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="font-display text-xl uppercase leading-tight tracking-wide text-slate-900 sm:text-2xl">
          {member.name}
        </h3>
        <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
          {member.role}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
          {member.description}
        </p>
      </div>
    </article>
  );
}
