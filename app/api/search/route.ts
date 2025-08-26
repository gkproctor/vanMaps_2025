import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';
import groq from 'groq';

const QUERY = groq`*[_type == "location" && defined(slug.current) && (
  name match $q || additionalInfo match $q
)]|order(name asc)[0...50]{
  _id,
  name,
  "slug": slug.current,   // flatten
  additionalInfo,
  image{asset->{url}},
  coordinates,
  googleMapsUrl,
  appleMapsUrl
}`;


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.trim();
  if (!q) return NextResponse.json({ results: [] }, { status: 200 });
  const results = await sanityClient.fetch(QUERY, { q: `${q}*` });
  return NextResponse.json({ results });
}
