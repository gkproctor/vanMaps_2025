import Image from 'next/image';
import groq from 'groq';
import { sanityClient } from '@/lib/sanity.client';
import SearchBar from '@/components/SearchBar';

type Item = {
  _id: string;
  name?: string;
  slug?: { current?: string };
  additionalInfo?: string;
  image?: { asset?: { url?: string } };
};

const INITIAL_QUERY = groq`*[_type == "location"]|order(name asc)[0...50]{
  _id,
  name,
  slug,
  additionalInfo,
  image{asset->{url}}
}`;

async function fetchInitial(): Promise<Item[]> {
  const results = await sanityClient.fetch(INITIAL_QUERY);
  return results || [];
}

export default async function BrowsePage() {
  const initial = await fetchInitial();
  return (
    <main className="mx-auto max-w-screen-sm">
      <SearchWrapper initial={initial} />
    </main>
  );
}

function Card({ item }: { item: Item }) {
  return (
    <a href={`/locations/${item?.slug?.current ?? ''}`} className="card">
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

function SearchWrapper({ initial }: { initial: Item[] }) {
  const { useState } = require('react');
  const [items, setItems] = useState<Item[]>(initial);

  return (
    <>
      <SearchBar onResults={(r) => setItems(r.length ? r : initial)} />
      <div>{items.map((it: Item) => (<Card key={it._id} item={it} />))}</div>
    </>
  );
}
