"use client";

import { useEffect, useState } from "react";
import {
  Button,
  EmptyState,
  ErrorBanner,
  Field,
  ImageField,
  inputCls,
  LoadingState,
  Modal,
  VisibleBadge,
} from "@/components/admin/ui";
import {
  adminCreateStaff,
  adminDeleteStaff,
  adminListStaff,
  adminUpdateStaff,
  uploadImage,
  type AdminStaffMember,
} from "@/lib/admin";
import { STAFF_CATEGORIES } from "@/types/site";

export default function AdminStaffPage() {
  const [members, setMembers] = useState<AdminStaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminStaffMember | "new" | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    let cancelled = false;
    adminListStaff()
      .then((rows) => {
        if (cancelled) return;
        setMembers(rows);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Errore di caricamento.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  async function handleDelete(member: AdminStaffMember) {
    if (!window.confirm(`Eliminare "${member.name}" dallo staff?`)) return;
    try {
      await adminDeleteStaff(member.id);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'eliminazione.");
    }
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-[#001b3d]">Staff</h1>
          <p className="mt-1 text-sm text-[#4a5568]">Dirigenza, allenatori e collaboratori della società.</p>
        </div>
        <Button onClick={() => setEditing("new")}>+ Nuovo membro</Button>
      </header>

      <ErrorBanner message={error} />

      {loading ? (
        <LoadingState />
      ) : members.length === 0 ? (
        <EmptyState label="Nessun membro dello staff. Aggiungi il primo." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e8ecf0] bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e8ecf0] bg-[#f3f7fb] text-xs uppercase tracking-wide text-[#4a5568]">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Ruolo</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Stato</th>
                <th className="px-4 py-3 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8ecf0]">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-[#f3f7fb]/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#f3f7fb]">
                        {member.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <span className="font-semibold text-[#001b3d]">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#4a5568]">{member.role}</td>
                  <td className="px-4 py-3 text-[#4a5568]">{member.category}</td>
                  <td className="px-4 py-3">
                    <VisibleBadge visible={member.isVisible} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <Button variant="ghost" onClick={() => setEditing(member)}>Modifica</Button>
                      <Button variant="danger" onClick={() => handleDelete(member)}>Elimina</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing ? (
        <StaffFormModal
          member={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      ) : null}
    </div>
  );
}

function StaffFormModal({
  member,
  onClose,
  onSaved,
}: {
  member: AdminStaffMember | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(member?.name ?? "");
  const [role, setRole] = useState(member?.role ?? "");
  const [category, setCategory] = useState(member?.category ?? STAFF_CATEGORIES[0]);
  const [description, setDescription] = useState(member?.description ?? "");
  const [sortOrder, setSortOrder] = useState(member?.sortOrder?.toString() ?? "0");
  const [isVisible, setIsVisible] = useState(member?.isVisible ?? true);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let photoUrl = member?.photoUrl ?? null;
      if (photoFile) {
        photoUrl = await uploadImage(photoFile, "staff");
      }

      const input = {
        name: name.trim(),
        role: role.trim(),
        category,
        description: description.trim() || null,
        photoUrl,
        isVisible,
        sortOrder: Number(sortOrder) || 0,
      };

      if (member) {
        await adminUpdateStaff(member.id, input);
      } else {
        await adminCreateStaff(input);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il salvataggio.");
      setSaving(false);
    }
  }

  return (
    <Modal title={member ? "Modifica membro staff" : "Nuovo membro staff"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorBanner message={error} />

        <Field label="Nome e cognome">
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Ruolo">
            <input
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={inputCls}
              placeholder="Es. Allenatore, Presidente…"
            />
          </Field>
          <Field label="Categoria">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
              {STAFF_CATEGORIES.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Descrizione (opzionale)">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Ordine">
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={inputCls} />
          </Field>
        </div>

        <ImageField label="Foto" currentUrl={member?.photoUrl ?? null} file={photoFile} onFileChange={setPhotoFile} />

        <label className="flex items-center gap-2 text-sm text-[#001b3d]">
          <input type="checkbox" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} className="h-4 w-4" />
          Visibile sul sito
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Annulla</Button>
          <Button type="submit" disabled={saving}>{saving ? "Salvataggio…" : "Salva"}</Button>
        </div>
      </form>
    </Modal>
  );
}
