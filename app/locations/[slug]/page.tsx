// app/locations/[slug]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import groq from 'groq';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/lib/sanity.client';
import ImageLightbox from '@/components/ImageLightbox';
import LocationActions from '@/components/LocationActions';

export const revalidate = 60;

const DETAIL_QUERY = groq`*[_type=='location' && slug.current==$slug][0]{
  _id,
  name,
  "slug": slug.current,
  radioChannel,
  additionalInfo,
  googleMapsUrl,
  coordinates,
  image{asset->{url}}
}`;

async function fetchDetail(slug: string) {
  try {
    const data = await sanityClient.fetch(DETAIL_QUERY, { slug });
    return data || null;
  } catch (err) {
    console.error('Location fetch failed', { slug, err });
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchDetail(slug);

  const title = data?.name ?? 'Location — VanMaps';
  const description =
    (data?.additionalInfo && String(data.additionalInfo).slice(0, 140)) ||
    'VanMaps location details.';
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

export default async function LocationPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) return notFound();

  const data = await fetchDetail(slug);
  if (!data) return notFound();

  const hasCoords =
    data?.coordinates &&
    typeof data.coordinates.lat === 'number' &&
    typeof data.coordinates.lng === 'number';

  const googleHref =
    data?.googleMapsUrl
      ? data.googleMapsUrl
      : hasCoords
        ? `https://www.google.com/maps?q=${data.coordinates.lat},${data.coordinates.lng}`
        : null;

  return (
    <main className="max-w-screen-sm mx-auto p-3">
      {/* Tap-to-open image */}
      {data?.image?.asset?.url ? (
        <ImageLightbox
          src={data.image.asset.url}
          alt={data?.name || ''}
          thumbHeight={208} // ~ h-52
        />
      ) : (
        <div className="h-52 w-full rounded-2xl bg-sand-50" />
      )}

      <h1 className="mt-4 text-2xl font-bold">{data?.name}</h1>

      {/* Only Google Maps */}
      <LocationActions googleHref={googleHref} />

      {data?.radioChannel && (
        <p className="mt-2 text-slate-700">
          <strong>Radio Channel:</strong> {data.radioChannel}
        </p>
      )}
      {data?.additionalInfo && (
        <p className="mt-2 leading-7 text-slate-700">{data.additionalInfo}</p>
      )}
    </main>
  );
}
