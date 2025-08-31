'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
  thumbHeight?: number; // px height of the inline thumbnail area
};

export default function ImageLightbox({ src, alt = '', thumbHeight = 208 }: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      {/* Inline thumbnail (tap to open) */}
      <button
        type="button"
        aria-label="Open image"
        onClick={() => setOpen(true)}
        className="block w-full relative overflow-hidden rounded-2xl"
        style={{ height: thumbHeight }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </button>

      {/* Fullscreen overlay */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] bg-black/90"
          onClick={onBackdropClick}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close image"
            onClick={close}
            className="absolute top-3 right-3 rounded-full px-3 py-1 text-white text-sm bg-white/15"
          >
            ✕
          </button>

          {/* Large image (contain) */}
          <div className="absolute inset-0">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
