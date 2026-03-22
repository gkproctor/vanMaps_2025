// app/page.tsx
import { fetchLocations } from '@/lib/locations';
import BrowseSearchWrapper from '@/components/BrowseSearchWrapper';
import Link from 'next/link';

async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const isAll = String(sp?.all ?? '') === '1';
  const items = await fetchLocations(isAll);

  return (
    <main className="mx-auto max-w-screen-sm px-3 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-3">Where do you want to go?</h1>
        <p className="text-slate-700">
          Search for a location below or{' '}
          <Link href="/locations" className="text-primary underline">
            view all locations
          </Link>
        </p>
      </header>
      <BrowseSearchWrapper initial={items} isAll={isAll} />
    </main>
  );
}

export default HomePage; // Explicit default export at the bottom