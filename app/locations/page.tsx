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
    <main className="max-w-screen-sm mx-auto p-3 space-y-4">
      <h1 className="text-2xl font-bold">All Locations</h1>

      {/* Intro note */}
      <p className="text-slate-700">
        Below is the complete list of all VanMaps locations in alphabetical order.
      </p>

      <div className="space-y-4">
        {items?.map((item: any) => (
          <Link
            key={item._id}
            href={`/locations/${item.slug}`}
            className="block border border-slate-200 rounded-xl p-3 hover:bg-slate-50"
          >
            {item.image?.asset?.url ? (
              <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={item.image.asset.url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-40 mb-3 rounded-lg bg-slate-100" />
            )}

            <h2 className="text-lg font-semibold">{item.name}</h2>
            {item.additionalInfo && (
              <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                {item.additionalInfo}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}