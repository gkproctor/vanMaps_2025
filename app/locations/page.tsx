import groq from 'groq';
import Link from 'next/link';
import Image from 'next/image';
import { sanityClient } from '@/lib/sanity.client';

// Always static revalidate (optional)
export const revalidate = 300;

const ALL_QUERY = groq`*[_type == "location"]
  | order(name asc){
    _id,
    name,
    "slug": slug.current,
    additionalInfo,
    image{asset->{url}}
  }`;

export default async function LocationsPage() {
  const items = await sanityClient.fetch(ALL_QUERY);

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