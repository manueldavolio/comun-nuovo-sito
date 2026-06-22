"use client";

import { useEffect, useState } from "react";
import { EmptyState, ErrorBanner, LoadingState } from "@/components/admin/ui";
import { adminListMerchOrders, type AdminMerchOrder } from "@/lib/admin";

export default function AdminMerchOrdersPage() {
  const [orders, setOrders] = useState<AdminMerchOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    adminListMerchOrders()
      .then((rows) => {
        if (cancelled) return;
        setOrders(rows);
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
  }, []);

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-4xl tracking-wide text-[#001b3d]">Ordini merchandising</h1>
        <p className="mt-1 text-sm text-[#4a5568]">Richieste inviate dal sito pubblico.</p>
      </header>

      <ErrorBanner message={error} />

      {loading ? (
        <LoadingState />
      ) : orders.length === 0 ? (
        <EmptyState label="Nessun ordine ricevuto al momento." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#e8ecf0] bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#e8ecf0] bg-[#f3f7fb] text-xs uppercase tracking-wide text-[#4a5568]">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Contatti</th>
                <th className="px-4 py-3">Prodotto</th>
                <th className="px-4 py-3">Taglia</th>
                <th className="px-4 py-3">Quantita</th>
                <th className="px-4 py-3">Stato</th>
                <th className="px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8ecf0]">
              {orders.map((order) => (
                <tr key={order.id} className="align-top hover:bg-[#f3f7fb]/60">
                  <td className="px-4 py-3 whitespace-nowrap text-[#4a5568]">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3 font-semibold text-[#001b3d]">{order.customerName}</td>
                  <td className="px-4 py-3 text-[#4a5568]">
                    <p>{order.phone}</p>
                    <p className="text-xs">{order.email}</p>
                  </td>
                  <td className="px-4 py-3 text-[#001b3d]">{order.productName}</td>
                  <td className="px-4 py-3 text-[#4a5568]">{order.size}</td>
                  <td className="px-4 py-3 text-[#4a5568]">{order.quantity}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-[#003f8f]">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#4a5568]">{order.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}
