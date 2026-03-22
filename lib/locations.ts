// lib/locations.ts
import groq from 'groq';
import { sanityClient } from '@/lib/sanity.client';

export type LocationItem = {
  _id: string;
  name?: string;
  slug?: string;
  additionalInfo?: string;
  image?: { asset?: { url?: string } };
};

const BASE_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  additionalInfo,
  image{asset->{url}}
`;

const INITIAL_QUERY = groq`*[_type == "location" && defined(slug.current)]
  | order(name asc)[0...50]{${BASE_FIELDS}}`;

const ALL_QUERY = groq`*[_type == "location" && defined(slug.current)]
  | order(name asc){${BASE_FIELDS}}`;

/**
 * Fetches locations from Sanity.
 * @param all - If true, fetches all records. If false, fetches the first 50.
 */
export async function fetchLocations(all: boolean): Promise<LocationItem[]> {
  const q = all ? ALL_QUERY : INITIAL_QUERY;
  const results = await sanityClient.fetch(q);
  return results || [];
}