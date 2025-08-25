import type { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity.client';
import groq from 'groq';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 60;

const DETAIL_QUERY = groq`*[_type=='location' && slug.current==$slug][0]{
  name,
  slug,
  radioChannel,
  additionalInfo,
  googleMapsUrl,
  appleMapsUrl,
  coordinates,
  image{asset->{url}}
}`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await sanityClient.fetch(DETAIL_QUERY, { slug: params.slug });
  if (!data) return { title: 'Location — VanMaps' };

  const title = `${data.name ?? 'Location'}`;
  const description = (data.additionalInfo && String(data.additionalInfo).slice(0, 140)) || 'VanMaps location details.';
  const imageUrl = data?.image?.asset?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      type: 'article',
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function LocationPage({ params }: { params: { slug: string } }) {
  const data = await sanityClient.fetch(DETAIL_QUERY, { slug: params.slug });
  if (!data) return notFound();

  const hasCoords = data?.coordinates && typeof data.coordinates.lat === 'number' && typeof data.coordinates.lng === 'number';

  const googleHref = data?.googleMapsUrl
    ? data.googleMapsUrl
    : hasCoords
      ? `https://www.google.com/maps?q=${data.coordinates.lat},${data.coordinates.lng}`
      : null;

  const appleHref = data?.appleMapsUrl
    ? data.appleMapsUrl
    : hasCoords
      ? `https://maps.apple.com/?ll=${data.coordinates.lat},${data.coordinates.lng}`
      : null;

  return (
    <main className="max-w-screen-sm mx-auto p-3">
      <div className="relative h-52 w-full rounded-2xl overflow-hidden">
        {data?.image?.asset?.url && (
          <Image src={data.image.asset.url} alt={data?.name || ''} fill className="object-cover" />
        )}
      </div>

      <h1 className="mt-4 text-2xl font-bold">{data?.name}</h1>

      <div className="my-3 flex gap-2 flex-wrap">
        {googleHref && (<a className="btn" target="_blank" rel="noreferrer" href={googleHref}>Open in Google Maps</a>)}
        {appleHref && (<a className="btn" target="_blank" rel="noreferrer" href={appleHref}>Open in Apple Maps</a>)}
        <button className="btn" onClick={() => navigator.share?.({ title: data?.name, url: location.href })}>Share</button>
      </div>

      {data?.radioChannel && (<p className="mt-2 text-slate-700"><strong>Radio Channel:</strong> {data.radioChannel}</p>)}
      {data?.additionalInfo && (<p className="mt-2 leading-7 text-slate-700">{data.additionalInfo}</p>)}
    </main>
  );
}
