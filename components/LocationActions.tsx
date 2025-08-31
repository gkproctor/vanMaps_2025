'use client';

type Props = {
  googleHref?: string | null;
};

export default function LocationActions({ googleHref }: Props) {
  if (!googleHref) return null;

  return (
    <div className="my-3 flex gap-2 flex-wrap">
      <a className="btn" target="_blank" rel="noreferrer" href={googleHref}>
        Open in Google Maps
      </a>
    </div>
  );
}
