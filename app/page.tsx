// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="px-3 py-6 max-w-screen-sm mx-auto">
      <h1 className="text-2xl font-bold mb-3">Where do you want to go?</h1>

      <p className="text-slate-700">
        Here is a list of all available locations.{' '}
        <Link href="/locations" className="text-primary underline">
          View Locations
        </Link>
      </p>
    </main>
  );
}
