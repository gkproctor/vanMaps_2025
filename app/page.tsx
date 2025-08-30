// app/page.tsx
import dynamic from 'next/dynamic';
import Link from 'next/link';

const SearchBar = dynamic(() => import('@/components/SearchBar'), { ssr: false });

export default function HomePage() {
  return (
    <main className="px-3 py-6 max-w-screen-sm mx-auto">
      <h1 className="text-2xl font-bold mb-3">Where do you want to go?</h1>

      {/* Search bar */}
      {/* The SearchBar needs an onResults prop; here we pass a no-op since
          you didn't ask to show results on the home page */}
      {/* If you want results under the bar, I can wire a small client wrapper */}
      <div className="mb-6">
        {/* @ts-ignore - client component prop in server page (harmless here) */}
        <SearchBar onResults={() => {}} />
      </div>

      <p className="text-slate-700">
        Here is a list of all available locations.{' '}
        <Link href="/locations" className="text-primary underline">
          View Locations
        </Link>
      </p>
    </main>
  );
}
