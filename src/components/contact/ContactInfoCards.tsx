import Link from "next/link";
import { contacts, legal } from "@/data/site";
import { SocialInstagram, SocialYouTube } from "@/components/contact/ContactSocialIcons";

type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
};

function InfoCard({ icon, label, children }: InfoCardProps) {
  return (
    <article className="club-card-interactive group flex flex-col p-6 sm:p-7">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 text-[#003f8f] transition group-hover:from-sky-200 group-hover:to-sky-100">
        {icon}
      </span>
      <h3 className="mt-5 font-display text-sm uppercase tracking-[0.08em] text-slate-900 sm:text-base">
        {label}
      </h3>
      <div className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
        {children}
      </div>
    </article>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6.5 4h3l1.5 4.5-2 1.5c.9 1.8 2.3 3.2 4.1 4.1l1.5-2L19 13.5V16.5c0 .8-.7 1.5-1.5 1.5C9.8 18 6 14.2 6 6.5 6 5.7 6.7 5 7.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SocialIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9.5h4M9.5 14l3-2.5M14.5 14 11 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ContactInfoCards() {
  return (
    <section className="scroll-section" aria-labelledby="contact-info-title">
      <h2 id="contact-info-title" className="sr-only">
        Recapiti principali
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        <li>
          <InfoCard icon={<EmailIcon className="h-5 w-5" />} label="Email">
            <a
              href={`mailto:${contacts.email}`}
              className="font-medium text-[#003f8f] underline-offset-2 transition hover:text-sky-600 hover:underline"
            >
              {contacts.email}
            </a>
          </InfoCard>
        </li>
        <li>
          <InfoCard icon={<PhoneIcon className="h-5 w-5" />} label="Telefono">
            <a
              href={`tel:${contacts.phoneTel}`}
              className="font-medium text-[#003f8f] underline-offset-2 transition hover:text-sky-600 hover:underline"
            >
              {contacts.phone}
            </a>
          </InfoCard>
        </li>
        <li>
          <InfoCard icon={<LocationIcon className="h-5 w-5" />} label="Sede legale">
            <p className="font-medium text-slate-800">{legal.legalSeat}</p>
          </InfoCard>
        </li>
        <li>
          <InfoCard icon={<SocialIcon className="h-5 w-5" />} label="Social">
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-[#003f8f] transition hover:text-sky-600"
                >
                  <SocialInstagram className="h-4 w-4 shrink-0" />
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href={contacts.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-[#003f8f] transition hover:text-sky-600"
                >
                  <SocialYouTube className="h-4 w-4 shrink-0" />
                  YouTube
                </Link>
              </li>
            </ul>
          </InfoCard>
        </li>
      </ul>
    </section>
  );
}
