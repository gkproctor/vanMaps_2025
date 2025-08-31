import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://vanmaps.net'),
  title: { default: 'VanMaps', template: '%s — VanMaps' },
  description: 'Mobile-first directory to help van drivers find crew/train locations quickly.',
  openGraph: {
    type: 'website',
    siteName: 'VanMaps',
    title: 'VanMaps',
    description: 'Find train crew locations easily',
    url: 'https://vanmaps.net',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VanMaps',
    description: 'Find van-friendly locations fast.',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png', // this covers iOS "Add to Home Screen"
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <header className="max-w-screen-sm mx-auto px-3 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">VanMaps</Link>
          <nav className="text-sm">
            <Link className="mr-4" href="/locations">Locations</Link>
            <Link className="mr-4" href="/info">Info</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
        <div className="mx-auto max-w-screen-sm">{children}</div>
        <footer className="max-w-screen-sm mx-auto px-3 py-8 text-xs text-slate-600">© VanMaps</footer>
      </body>
    </html>
  );
}
