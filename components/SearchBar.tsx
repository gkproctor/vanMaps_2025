'use client';
import { useEffect, useState } from 'react';

export default function SearchBar({ onResults }: { onResults: (r: any[]) => void }) {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (q.trim().length < 2) { onResults([]); return; }
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      onResults(json.results || []);
      setLoading(false);
    }, 220);
    return () => clearTimeout(t);
  }, [q, onResults]);

  return (
    <div className="sticky top-0 bg-sand-50/90 backdrop-blur z-10 p-3 border-b">
      <label className="sr-only" htmlFor="search">Search</label>
      <input
        id="search"
        inputMode="search"
        autoCorrect="off"
        autoCapitalize="none"
        placeholder="Search by name or info…"
        className="w-full rounded-2xl px-4 py-3 text-base border outline-none focus:border-primary"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {loading && <div className="mt-2 text-sm text-slate-600">Searching…</div>}
    </div>
  );
}
