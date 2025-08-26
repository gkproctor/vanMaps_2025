import groq from 'groq';
import { sanityClient } from '@/lib/sanity.client';
import dynamic from 'next/dynamic';

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

// Dynamically import the client component (no SSR needed for it)
const BrowseSearchWrapper = dynamic(
  () => import('@/components/BrowseSearchWrapper'),
  { ssr: false }
);

export default async function BrowsePage() {
  const initial = await fetchInitial();

  return (
    <main className="mx-auto max-w-screen-sm">
      <BrowseSearchWrapper initial={initial} />
    </main>
  );
}
