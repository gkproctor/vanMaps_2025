// components/BrowseSearchWrapper.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

type Item = {
  _id: string;
  name?: string;
  slug?: string; // flattened
  additionalInfo?: string;
  image?: { asset?: { url?: string } };
};

function Card({ item }: { item: Item }) {
  if (!item?.slug) {
    return (
      <div className="card opacity-70 pointer-events-none">
        {/* Render content without link */}
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
            <div className="text-sm text-slate-600 line-clamp-2">
              {item.additionalInfo}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export default function BrowseSearchWrapper({ initial }: { initial: Item[] }) {
  const [items, setItems] = useState<Item[]>(initial);

  const SearchBar = require('@/components/SearchBar').default as (props: {
    onResults: (r: Item[]) => void;
  }) => JSX.Element;

  return (
    <>
      <SearchBar onResults={(r) => setItems(r.length ? r : initial)} />
      <div>{items.map((it) => <Card key={it._id} item={it} />)}</div>
    </>
  );
}
