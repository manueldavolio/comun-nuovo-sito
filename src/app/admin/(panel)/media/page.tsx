"use client";

import { useEffect, useState } from "react";
import {
  Button,
  EmptyState,
  ErrorBanner,
  Field,
  inputCls,
  LoadingState,
  Modal,
  VisibleBadge,
} from "@/components/admin/ui";
import {
  adminAddAlbumImage,
  adminCreateAlbum,
  adminCreateVideo,
  adminDeleteAlbum,
  adminDeleteAlbumImage,
  adminDeleteVideo,
  adminListAlbums,
  adminListVideos,
  adminUpdateAlbum,
  adminUpdateVideo,
  uploadImage,
  type AdminGalleryAlbum,
  type AdminVideo,
} from "@/lib/admin";

type Tab = "album" | "video";

export default function AdminMediaPage() {
  const [tab, setTab] = useState<Tab>("album");

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-4xl tracking-wide text-[#001b3d]">Media</h1>
        <p className="mt-1 text-sm text-[#4a5568]">Album fotografici e video YouTube della pagina Media.</p>
      </header>

      <div className="mb-6 flex gap-2">
        {([
          ["album", "Album foto"],
          ["video", "Video YouTube"],
        ] as [Tab, string][]).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === value
                ? "bg-[#003f8f] text-white"
                : "border border-[#e8ecf0] bg-white text-[#4a5568] hover:bg-[#f3f7fb]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "album" ? <AlbumSection /> : <VideoSection />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Album foto
// ---------------------------------------------------------------------------

function AlbumSection() {
  const [albums, setAlbums] = useState<AdminGalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminGalleryAlbum | "new" | null>(null);
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
  const [uploadingAlbumId, setUploadingAlbumId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    let cancelled = false;
    adminListAlbums()
      .then((rows) => {
        if (cancelled) return;
        setAlbums(rows);
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

  async function handleDeleteAlbum(album: AdminGalleryAlbum) {
    if (!window.confirm(`Eliminare l'album "${album.title}" e tutte le sue foto?`)) return;
    try {
      await adminDeleteAlbum(album.id);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'eliminazione.");
    }
  }

  async function handleAddImages(album: AdminGalleryAlbum, files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadingAlbumId(album.id);
    setError(null);
    try {
      let sortOrder = album.images.length > 0 ? Math.max(...album.images.map((i) => i.sortOrder)) + 1 : 0;
      for (const file of Array.from(files)) {
        const url = await uploadImage(file, "gallery");
        await adminAddAlbumImage(album.id, url, file.name.replace(/\.[^.]+$/, ""), sortOrder);
        sortOrder += 1;
      }
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'upload.");
    } finally {
      setUploadingAlbumId(null);
    }
  }

  async function handleDeleteImage(imageId: string) {
    if (!window.confirm("Eliminare questa foto dall'album?")) return;
    try {
      await adminDeleteAlbumImage(imageId);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'eliminazione.");
    }
  }

  return (
    <section>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setEditing("new")}>+ Nuovo album</Button>
      </div>

      <ErrorBanner message={error} />

      {loading ? (
        <LoadingState />
      ) : albums.length === 0 ? (
        <EmptyState label="Nessun album. Crea il primo album fotografico." />
      ) : (
        <div className="space-y-4">
          {albums.map((album) => {
            const open = openAlbumId === album.id;
            return (
              <div key={album.id} className="rounded-2xl border border-[#e8ecf0] bg-white shadow-sm">
                <div className="flex flex-wrap items-center gap-3 p-4">
                  <button
                    type="button"
                    onClick={() => setOpenAlbumId(open ? null : album.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <span className={`text-xs text-[#4a5568] transition ${open ? "rotate-90" : ""}`}>▶</span>
                    <span className="font-semibold text-[#001b3d]">{album.title}</span>
                    <span className="text-xs text-[#4a5568]">
                      {album.date ? `${album.date.slice(0, 10)} · ` : ""}
                      {album.images.length} foto
                    </span>
                    <VisibleBadge visible={album.isVisible} />
                  </button>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="ghost" onClick={() => setEditing(album)}>Modifica</Button>
                    <Button variant="danger" onClick={() => handleDeleteAlbum(album)}>Elimina</Button>
                  </div>
                </div>

                {open ? (
                  <div className="border-t border-[#e8ecf0] p-4">
                    <label className="mb-4 block">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#4a5568]">
                        Aggiungi foto {uploadingAlbumId === album.id ? "(caricamento…)" : ""}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={uploadingAlbumId === album.id}
                        onChange={(event) => {
                          void handleAddImages(album, event.target.files);
                          event.target.value = "";
                        }}
                        className="block w-full text-sm text-[#4a5568] file:mr-3 file:rounded-lg file:border-0 file:bg-[#003f8f] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-[#001b3d] disabled:opacity-50"
                      />
                    </label>

                    {album.images.length === 0 ? (
                      <p className="text-sm text-[#4a5568]">Album vuoto: carica le prime foto.</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                        {album.images.map((image) => (
                          <div key={image.id} className="group relative overflow-hidden rounded-lg border border-[#e8ecf0]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={image.imageUrl} alt={image.alt ?? ""} className="aspect-square w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(image.id)}
                              className="absolute right-1.5 top-1.5 rounded-md bg-[#001b3d]/70 px-1.5 py-0.5 text-[11px] font-semibold text-white opacity-0 transition group-hover:opacity-100"
                            >
                              Elimina
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {editing ? (
        <AlbumFormModal
          album={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      ) : null}
    </section>
  );
}

function AlbumFormModal({
  album,
  onClose,
  onSaved,
}: {
  album: AdminGalleryAlbum | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(album?.title ?? "");
  const [date, setDate] = useState(album?.date?.slice(0, 10) ?? "");
  const [isVisible, setIsVisible] = useState(album?.isVisible ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const input = {
        title: title.trim(),
        date: date ? new Date(`${date}T12:00:00`).toISOString() : null,
        isVisible,
      };
      if (album) {
        await adminUpdateAlbum(album.id, input);
      } else {
        await adminCreateAlbum(input);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il salvataggio.");
      setSaving(false);
    }
  }

  return (
    <Modal title={album ? "Modifica album" : "Nuovo album"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorBanner message={error} />

        <Field label="Titolo">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </Field>

        <Field label="Data (opzionale)">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </Field>

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

// ---------------------------------------------------------------------------
// Video YouTube
// ---------------------------------------------------------------------------

function VideoSection() {
  const [videos, setVideos] = useState<AdminVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminVideo | "new" | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = () => setRefreshKey((key) => key + 1);

  useEffect(() => {
    let cancelled = false;
    adminListVideos()
      .then((rows) => {
        if (cancelled) return;
        setVideos(rows);
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

  async function handleDelete(video: AdminVideo) {
    if (!window.confirm(`Eliminare il video "${video.title}"?`)) return;
    try {
      await adminDeleteVideo(video.id);
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'eliminazione.");
    }
  }

  return (
    <section>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setEditing("new")}>+ Nuovo video</Button>
      </div>

      <ErrorBanner message={error} />

      {loading ? (
        <LoadingState />
      ) : videos.length === 0 ? (
        <EmptyState label="Nessun video. Aggiungi il primo link YouTube." />
      ) : (
        <div className="space-y-3">
          {videos.map((video) => (
            <article
              key={video.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#e8ecf0] bg-white p-4 shadow-sm"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-[#001b3d]">{video.title}</h2>
                  <VisibleBadge visible={video.isVisible} />
                </div>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-0.5 block truncate text-xs text-[#009dff] hover:underline"
                >
                  {video.youtubeUrl}
                </a>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="ghost" onClick={() => setEditing(video)}>Modifica</Button>
                <Button variant="danger" onClick={() => handleDelete(video)}>Elimina</Button>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing ? (
        <VideoFormModal
          video={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      ) : null}
    </section>
  );
}

function VideoFormModal({
  video,
  onClose,
  onSaved,
}: {
  video: AdminVideo | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(video?.title ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(video?.youtubeUrl ?? "");
  const [description, setDescription] = useState(video?.description ?? "");
  const [sortOrder, setSortOrder] = useState(video?.sortOrder?.toString() ?? "0");
  const [isVisible, setIsVisible] = useState(video?.isVisible ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const input = {
        title: title.trim(),
        youtubeUrl: youtubeUrl.trim(),
        description: description.trim() || null,
        isVisible,
        sortOrder: Number(sortOrder) || 0,
      };
      if (video) {
        await adminUpdateVideo(video.id, input);
      } else {
        await adminCreateVideo(input);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il salvataggio.");
      setSaving(false);
    }
  }

  return (
    <Modal title={video ? "Modifica video" : "Nuovo video"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorBanner message={error} />

        <Field label="Titolo">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </Field>

        <Field label="Link YouTube">
          <input
            required
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className={inputCls}
            placeholder="https://www.youtube.com/watch?v=…"
          />
        </Field>

        <Field label="Descrizione (opzionale)">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputCls} />
        </Field>

        <Field label="Ordine">
          <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={inputCls} />
        </Field>

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
