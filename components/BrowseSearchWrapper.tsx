// components/BrowseSearchWrapper.tsx
'use client';

import { useState } from 'react';
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
  const [items, setItems] = useState<Item[]>(initial);
  const SearchBar = require('@/components/SearchBar').default as (props: {
    onResults: (r: Item[]) => void;
  }) => JSX.Element;

  const showingSearch = items.length !== initial.length;

  return (
    <>
      <SearchBar onResults={(r) => setItems(r.length ? r : initial)} />
      <div>{items.map((it) => <Card key={it._id} item={it} />)}</div>

      {/* Show "See all" only when:
          - we're not already on the all view
          - there is no active narrowed search list */}
      {!isAll && !showingSearch && (
        <div className="p-3">
          <Link href="/browse?all=1" className="btn w-full text-center block">
            See all locations
          </Link>
        </div>
      )}
    </>
  );
}
