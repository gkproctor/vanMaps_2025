// app/browse/page.tsx
import groq from 'groq';
import dynamic from 'next/dynamic';
import { sanityClient } from '@/lib/sanity.client';

type Item = {
  _id: string;
  name?: string;
  slug?: string; // flattened
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

// first 50
const INITIAL_QUERY = groq`*[_type == "location" && defined(slug.current)]
  | order(name asc)[0...50]{${BASE_FIELDS}}`;

// all
const ALL_QUERY = groq`*[_type == "location" && defined(slug.current)]
  | order(name asc){${BASE_FIELDS}}`;

async function fetchList(all: boolean): Promise<Item[]> {
  const q = all ? ALL_QUERY : INITIAL_QUERY;
  const results = await sanityClient.fetch(q);
  return results || [];
}

const BrowseSearchWrapper = dynamic(
  () => import('@/components/BrowseSearchWrapper'),
  { ssr: false }
);

// export const revalidate = 60; // optional ISR

export default async function BrowsePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const isAll = String(searchParams?.all ?? '') === '1';
  const items = await fetchList(isAll);

  return (
    <main className="mx-auto max-w-screen-sm">
      <BrowseSearchWrapper initial={items} isAll={isAll} />
    </main>
  );
}
