// app/api/search/route.ts
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
