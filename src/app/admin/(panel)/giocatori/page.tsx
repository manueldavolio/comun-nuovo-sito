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
  adminCreatePlayer,
  adminDeletePlayer,
  adminListPlayers,
  adminUpdatePlayer,
  PLAYER_ROLE_OPTIONS,
  TEAM_OPTIONS,
  uploadImage,
  type AdminPlayer,
  type PlayerRoleKey,
} from "@/lib/admin";
import type { SiteTeamKey } from "@/lib/cms";

export default function AdminPlayersPage() {
  const [team, setTeam] = useState<SiteTeamKey>("PRIMA_SQUADRA");
  const [players, setPlayers] = useState<AdminPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminPlayer | "new" | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    let cancelled = false;
    adminListPlayers(team)
      .then((rows) => {
        if (cancelled) return;
        setPlayers(rows);
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
  }, [team, refreshKey]);

  async function handleDelete(player: AdminPlayer) {
    if (!window.confirm(`Eliminare il giocatore "${player.name}"?`)) return;
    try {
      await adminDeletePlayer(player.id);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'eliminazione.");
    }
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-wide text-[#001b3d]">Giocatori</h1>
          <p className="mt-1 text-sm text-[#4a5568]">Gestione rose: nome, ruolo, numero e foto.</p>
        </div>
        <Button onClick={() => setEditing("new")}>+ Nuovo giocatore</Button>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        {TEAM_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              if (option.value !== team) {
                setLoading(true);
                setTeam(option.value);
              }
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              team === option.value
                ? "bg-[#003f8f] text-white"
                : "border border-[#e8ecf0] bg-white text-[#4a5568] hover:bg-[#f3f7fb]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <ErrorBanner message={error} />

      {loading ? (
        <LoadingState />
      ) : players.length === 0 ? (
        <EmptyState label="Nessun giocatore per questa squadra. Aggiungi il primo." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e8ecf0] bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e8ecf0] bg-[#f3f7fb] text-xs uppercase tracking-wide text-[#4a5568]">
              <tr>
                <th className="px-4 py-3">Giocatore</th>
                <th className="px-4 py-3">Ruolo</th>
                <th className="px-4 py-3">Numero</th>
                <th className="px-4 py-3">Stato</th>
                <th className="px-4 py-3 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8ecf0]">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-[#f3f7fb]/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#f3f7fb]">
                        {player.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={player.photoUrl} alt={player.name} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <span className="font-semibold text-[#001b3d]">{player.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#4a5568]">
                    {PLAYER_ROLE_OPTIONS.find((r) => r.value === player.role)?.label ?? player.role}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#003f8f]">{player.shirtNumber ?? "—"}</td>
                  <td className="px-4 py-3">
                    <VisibleBadge visible={player.isVisible} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <Button variant="ghost" onClick={() => setEditing(player)}>Modifica</Button>
                      <Button variant="danger" onClick={() => handleDelete(player)}>Elimina</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing ? (
        <PlayerFormModal
          player={editing === "new" ? null : editing}
          team={team}
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

function PlayerFormModal({
  player,
  team,
  onClose,
  onSaved,
}: {
  player: AdminPlayer | null;
  team: SiteTeamKey;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(player?.name ?? "");
  const [role, setRole] = useState<PlayerRoleKey>(player?.role ?? "PORTIERE");
  const [shirtNumber, setShirtNumber] = useState(player?.shirtNumber?.toString() ?? "");
  const [formTeam, setFormTeam] = useState<SiteTeamKey>(player?.team ?? team);
  const [sortOrder, setSortOrder] = useState(player?.sortOrder?.toString() ?? "0");
  const [isVisible, setIsVisible] = useState(player?.isVisible ?? true);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let photoUrl = player?.photoUrl ?? null;
      if (photoFile) {
        photoUrl = await uploadImage(photoFile, "players");
      }

      const input = {
        team: formTeam,
        name: name.trim(),
        role,
        shirtNumber: shirtNumber.trim() === "" ? null : Number(shirtNumber),
        photoUrl,
        isVisible,
        sortOrder: Number(sortOrder) || 0,
      };

      if (player) {
        await adminUpdatePlayer(player.id, input);
      } else {
        await adminCreatePlayer(input);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il salvataggio.");
      setSaving(false);
    }
  }

  return (
    <Modal title={player ? "Modifica giocatore" : "Nuovo giocatore"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorBanner message={error} />

        <Field label="Nome e cognome">
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Squadra">
            <select value={formTeam} onChange={(e) => setFormTeam(e.target.value as SiteTeamKey)} className={inputCls}>
              {TEAM_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Ruolo">
            <select value={role} onChange={(e) => setRole(e.target.value as PlayerRoleKey)} className={inputCls}>
              {PLAYER_ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Numero maglia">
            <input
              type="number"
              min={1}
              max={99}
              value={shirtNumber}
              onChange={(e) => setShirtNumber(e.target.value)}
              className={inputCls}
              placeholder="—"
            />
          </Field>
          <Field label="Ordine">
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={inputCls} />
          </Field>
        </div>

        <ImageField label="Foto" currentUrl={player?.photoUrl ?? null} file={photoFile} onFileChange={setPhotoFile} />

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
