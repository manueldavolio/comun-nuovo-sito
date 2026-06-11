"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, ErrorBanner, Field, inputCls } from "@/components/admin/ui";
import { clubLogoPath } from "@/data/site";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const supabaseConfigured = getSupabaseBrowserClient() !== null;

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/admin");
    });
  }, [router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setSubmitting(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(
        signInError.message === "Invalid login credentials"
          ? "Credenziali non valide. Controlla email e password."
          : signInError.message,
      );
      setSubmitting(false);
      return;
    }

    router.replace("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#001b3d] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Image src={clubLogoPath} alt="ASD Comun Nuovo" width={72} height={72} className="h-18 w-18 object-contain" />
          <div>
            <h1 className="font-display text-3xl tracking-wide text-white">Pannello Admin</h1>
            <p className="text-sm text-white/60">ASD Comun Nuovo — area riservata</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-2xl">
          {!supabaseConfigured ? (
            <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Supabase non configurato. Imposta <code>NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in <code>.env.local</code>.
            </p>
          ) : null}
          <ErrorBanner message={error} />

          <div className="space-y-4">
            <Field label="Email">
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputCls}
                placeholder="admin@comunnuovocalcio.it"
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={inputCls}
                placeholder="••••••••"
              />
            </Field>
            <Button type="submit" disabled={submitting || !supabaseConfigured} className="w-full">
              {submitting ? "Accesso in corso…" : "Accedi"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
