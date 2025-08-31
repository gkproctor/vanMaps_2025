'use client';

type Props = {
  name?: string;
  googleHref?: string | null;
  appleHref?: string | null;
};

export default function LocationActions({ name, googleHref, appleHref }: Props) {
  return (
    <div className="my-3 flex gap-2 flex-wrap">
      {googleHref && (
        <a className="btn" target="_blank" rel="noreferrer" href={googleHref}>
          Open in Google Maps
        </a>
      )}
      {appleHref && (
        <a className="btn" target="_blank" rel="noreferrer" href={appleHref}>
          Open in Apple Maps
        </a>
      )}
      <button
        className="btn"
        onClick={() => {
          if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({ title: name ?? 'Location', url: location.href }).catch(() => {});
          }
        }}
      >
        Share
      </button>
    </div>
  );
}
