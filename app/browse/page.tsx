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

const INITIAL_QUERY = groq`*[_type == "location" && defined(slug.current)]
  | order(name asc)[0...50]{
    _id,
    name,
    "slug": slug.current,
    additionalInfo,
    image{asset->{url}}
  }`;

async function fetchInitial(): Promise<Item[]> {
  const results = await sanityClient.fetch(INITIAL_QUERY);
  return results || [];
}

// Client wrapper for stateful search UI
const BrowseSearchWrapper = dynamic(
  () => import('@/components/BrowseSearchWrapper'),
  { ssr: false }
);

// (optional) ISR if you want it in addition to webhooks
// export const revalidate = 60;

export default async function BrowsePage() {
  const initial = await fetchInitial();

  return (
    <main className="mx-auto max-w-screen-sm">
      <BrowseSearchWrapper initial={initial} />
    </main>
  );
}
