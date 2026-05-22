import { ContactFamilyCta } from "@/components/contact/ContactFamilyCta";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactMap } from "@/components/contact/ContactMap";
import { ContactSocialSection } from "@/components/contact/ContactSocialSection";

export const metadata = {
  title: "Contatti",
  description:
    "Contatta A.S.D. Comun Nuovo: email, telefono, sede legale e modulo per richieste da genitori, tifosi e partner.",
};

export default function ContattiPage() {
  return (
    <div>
      <ContactHero />

      <div className="bg-[var(--club-page)]">
        <div className="page-content">
          <ContactInfoCards />

          <ContactMap />

          <section className="scroll-section" aria-labelledby="contact-form-title">
            <div className="mb-8 max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sky-600">
                Scrivici
              </p>
              <h2
                id="contact-form-title"
                className="mt-2 font-display text-[clamp(1.5rem,3vw,2rem)] uppercase tracking-[0.02em] text-slate-900"
              >
                Modulo contatti
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Compila il form per inviarci una richiesta: ti risponderemo al più presto.
              </p>
            </div>
            <ContactForm />
          </section>

          <ContactFamilyCta />

          <ContactSocialSection />
        </div>
      </div>
    </div>
  );
}
