'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
  thumbHeight?: number; // px height of the inline thumbnail area
};

export default function ImageLightbox({ src, alt = '', thumbHeight = 208 }: Props) {
  const [open, setOpen] = useState(false);

  const openLightbox = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  // Close on Esc + lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      {/* Inline thumbnail (tap to open) */}
      <button
        type="button"
        aria-label="Open image"
        onClick={openLightbox}
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
          {/* Large image (behind close button) */}
          <div className="absolute inset-0 z-0">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Close button ABOVE image */}
          <button
            type="button"
            aria-label="Close image"
            onClick={close}
            className="absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-white text-sm bg-white/20 hover:bg-white/30 active:bg-white/40"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
