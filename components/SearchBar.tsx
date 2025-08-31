'use client';

import { useEffect, useMemo, useRef, useState, startTransition } from 'react';

type Item = {
  _id: string;
  name?: string;
  slug?: string;
  additionalInfo?: string;
  image?: { asset?: { url?: string } };
};

type Props = {
  onResults?: (items: Item[], meta: { q: string }) => void;
  debounceMs?: number;
};

export default function SearchBar({ onResults, debounceMs = 250 }: Props) {
  const [q, setQ] = useState('');
  const latestQ = useRef('');
  const timer = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // debounce + cancel in-flight
  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      // ignore empty queries: let the page show whatever it already shows
      if (!q.trim()) return;

      // cancel prior fetch
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      const thisQuery = q.trim();
      latestQ.current = thisQuery;

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(thisQuery)}`, {
          signal: ac.signal,
          cache: 'no-store',
        });
        if (!res.ok) return;
        const data = (await res.json()) as { results: Item[] };

        // only apply if still the latest query
        if (latestQ.current === thisQuery && onResults) {
          // non-urgent UI update
          startTransition(() => onResults(data.results || [], { q: thisQuery }));
        }
      } catch {
        // aborted or network issue — ignore
      }
    }, debounceMs) as unknown as number;

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [q, debounceMs, onResults]);

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault(); // rely on debounced effect instead
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search locations…"
        className="w-full rounded-2xl border px-4 py-3 outline-none focus:border-primary"
        inputMode="search"
      />
    </form>
  );
}
