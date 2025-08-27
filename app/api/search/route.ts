// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity.client';
import groq from 'groq';

type Item = {
  _id: string;
  name?: string;
  slug?: string;
  additionalInfo?: string;
  image?: { asset?: { url?: string } };
  coordinates?: { lat?: number; lng?: number };
  googleMapsUrl?: string;
  appleMapsUrl?: string;
};

const QUERY = groq`*[_type == "location" && defined(slug.current) && (
  name match $q || additionalInfo match $q
)]|order(name asc)[0...50]{
  _id,
  name,
  "slug": slug.current,
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

  const results = (await sanityClient.fetch(QUERY, { q: `${q}*` })) as Item[];
  return NextResponse.json({ results });
}

// Optional: ensure this file is always treated as a module by TS
export {};
