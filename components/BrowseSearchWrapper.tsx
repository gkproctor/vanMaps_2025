'use client';

import { useRef, useState, type ComponentType } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Item = {
  _id: string;
  name?: string;
  slug?: string;
  additionalInfo?: string;
  image?: { asset?: { url?: string } };
};

function Card({ item }: { item: Item }) {
  if (!item?.slug) {
    return (
      <div className="card opacity-70 pointer-events-none">
        <div className="flex gap-3">
          <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-sand-50" />
          <div className="min-w-0">
            <div className="text-base font-semibold truncate">{item?.name ?? 'Untitled'}</div>
            {item?.additionalInfo && (
              <div className="text-sm text-slate-600 line-clamp-2">{item.additionalInfo}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <a href={`/locations/${item.slug}`} className="card">
      <div className="flex gap-3">
        <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-sand-50">
          {item?.image?.asset?.url && (
            <Image
              src={item.image.asset.url}
              alt={item.name || ''}
              fill
              sizes="80px"
              className="object-cover"
            />
          )}
        </div>
        <div className="min-w-0">
          <div className="text-base font-semibold truncate">{item?.name}</div>
          {item?.additionalInfo && (
            <div className="text-sm text-slate-600 line-clamp-2">{item.additionalInfo}</div>
          )}
        </div>
      </div>
    </a>
  );
}

export default function BrowseSearchWrapper({
  initial,
  isAll,
}: {
  initial: Item[];
  isAll: boolean;
}) {
  // ‘view’ holds what's currently rendered (starts with initial)
  const [view, setView] = useState<Item[]>(initial);
  const latestQ = useRef<string>(''); // track the most recent query we applied
  const SearchBar = require('@/components/SearchBar')
    .default as ComponentType<{ onResults?: (r: Item[], meta: { q: string }) => void }>;

  return (
    <>
      <SearchBar
        onResults={(r, { q }) => {
          // if the query is empty, snap back to initial
          if (!q.trim()) {
            latestQ.current = '';
            setView(initial);
            return;
          }
          // apply results for this query only
          latestQ.current = q;
          // keep old list if empty results to avoid jarring flicker; user can refine
          setView(r.length ? r : view);
        }}
      />

      {/* list */}
      <div aria-live="polite" aria-busy="false">
        {view.map((it) => (
          <Card key={it._id} item={it} />
        ))}
      </div>

      {/* Stable CTA at the bottom */}
      {!isAll && latestQ.current === '' && (
        <div className="p-3">
          <Link href="/locations?all=1" className="btn w-full text-center block">
            See all locations
          </Link>
        </div>
      )}
    </>
  );
}
