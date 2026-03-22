// app/locations/page.tsx
import { fetchLocations } from '@/lib/locations';
import BrowseSearchWrapper from '@/components/BrowseSearchWrapper';

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const isAll = String(sp?.all ?? '') === '1';
  const items = await fetchLocations(isAll);

  return (
    <main className="mx-auto max-w-screen-sm">
      <header className="px-3 pt-4 pb-2">
        <h1 className="text-2xl font-bold">Locations</h1>
      </header>
      <BrowseSearchWrapper initial={items} isAll={isAll} />
    </main>
  );
}