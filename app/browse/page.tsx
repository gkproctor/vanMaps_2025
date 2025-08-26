// 1) Only fetch docs with a defined slug
type Item = {
  _id: string;
  name?: string;
  slug?: string; // ✅ now a plain string
  additionalInfo?: string;
  image?: { asset?: { url?: string } };
};

const INITIAL_QUERY = groq`*[_type == "location" && defined(slug.current)]
  | order(name asc)[0...50]{
    _id,
    name,
    "slug": slug.current, // flattened to a string
    additionalInfo,
    image{asset->{url}}
  }`;

function Card({ item }: { item: Item }) {
  // Guard: if somehow slug is missing, render a non-link card
  if (!item?.slug) {
    return (
      <div className="card opacity-70 pointer-events-none">
        {/* ...same inner content... */}
      </div>
    );
  }

  return (
    <a href={`/locations/${item.slug}`} className="card">
      {/* ...same inner content... */}
    </a>
  );
}
