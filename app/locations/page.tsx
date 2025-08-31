// app/locations/page.tsx
import groq from 'groq';
import { sanityClient } from '@/lib/sanity.client';
import BrowseSearchWrapper from '@/components/BrowseSearchWrapper';

type Item = {
  _id: string;
  name?: string;
  slug?: string;
  additionalInfo?: string;
  image?: { asset?: { url?: string } };
};

const BASE_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  additionalInfo,
  image{asset->{url}}
`;

const INITIAL_QUERY = groq`*[_type == "location" && defined(slug.current)]
  | order(name asc)[0...50]{${BASE_FIELDS}}`;

const ALL_QUERY = groq`*[_type == "location" && defined(slug.current)]
  | order(name asc){${BASE_FIELDS}}`;

async function fetchList(all: boolean): Promise<Item[]> {
  const q = all ? ALL_QUERY : INITIAL_QUERY;
  const results = await sanityClient.fetch(q);
  return results || [];
}

// export const revalidate = 60;

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>; // 👈 promise
}) {
  const sp = await searchParams;                       // 👈 await it
  const isAll = String(sp?.all ?? '') === '1';

  const items = await fetchList(isAll);

  return (
    <main className="mx-auto max-w-screen-sm">
      <header className="px-3 pt-4 pb-2">
        <h1 className="text-2xl font-bold">Locations</h1>
      </header>
      <BrowseSearchWrapper initial={items} isAll={isAll} />
    </main>
  );
}
