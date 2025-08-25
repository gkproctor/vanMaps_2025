import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="px-6 py-16 max-w-screen-sm mx-auto text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
        <span className="text-2xl">🗺️</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Lost the route (404)</h1>
      <p className="text-slate-700 mb-6">We couldn’t find that page. Try heading back to a known location.</p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/" className="btn">Home</Link>
        <Link href="/browse" className="btn">Browse Locations</Link>
        <Link href="/contact" className="btn">Contact</Link>
      </div>
      <p className="text-xs text-slate-500 mt-6">Tip: Use the search to quickly find a location by name.</p>
    </main>
  );
}
