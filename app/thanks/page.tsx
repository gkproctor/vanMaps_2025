import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thanks — VanMaps',
  description: 'Confirmation page after sending a message via the contact form.',
};

export default function ThanksPage() {
  return (
    <main className="px-3 py-6 max-w-screen-sm mx-auto text-center">
      <h1 className="text-2xl font-bold mb-2">Thanks!</h1>
      <p className="text-slate-700 mb-6">Your message has been sent. I’ll get back to you soon.</p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/" className="btn">Home</Link>
        <Link href="/browse" className="btn">Browse Locations</Link>
      </div>
    </main>
  );
}
