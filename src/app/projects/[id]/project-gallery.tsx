"use client";

import { useState } from "react";
import Image from "next/image";
import { FolderKanban } from "lucide-react";

interface ProjectGalleryProps {
  mainImageUrl?: string;
  images: string[];
  title: string;
  projectId: number;
}

export default function ProjectGallery({
  mainImageUrl,
  images,
  title,
  projectId,
}: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const hasMainImage = Boolean(mainImageUrl && mainImageUrl.trim() !== "");

  return (
    <>
      <button
        type="button"
        className="group relative w-full aspect-video rounded-xl overflow-hidden mb-8 glass text-left focus-ring"
        onClick={() => {
          if (!hasMainImage) return;
          setSelectedImage({
            src: mainImageUrl as string,
            alt: title,
          });
        }}
        aria-label={
          hasMainImage
            ? `Open main image for ${title} in full view`
            : `${title} has no main image`
        }
        disabled={!hasMainImage}
      >
        {hasMainImage ? (
          <Image
            src={mainImageUrl as string}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-500/10 via-surface-800 to-surface-900 flex items-center justify-center">
            <FolderKanban size={64} className="text-surface-600" />
          </div>
        )}
      </button>

      {images.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <button
                type="button"
                key={`${projectId}-gallery-${index}`}
                className="group relative aspect-video rounded-lg overflow-hidden border border-surface-700 bg-surface-900 text-left focus-ring"
                onClick={() =>
                  setSelectedImage({
                    src: image,
                    alt: `${title} screenshot ${index + 1}`,
                  })
                }
                aria-label={`Open ${title} screenshot ${index + 1} in full view`}
              >
                <Image
                  src={image}
                  alt={`${title} screenshot ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedImage?.src ? (
        <div
          className="fixed inset-0 z-[100] bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image viewer`}
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 z-[101] rounded-md bg-black/60 px-4 py-2 text-sm text-white hover:bg-black/80 focus-ring"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close image viewer"
          >
            Close
          </button>

          <div className="relative w-full h-full" onClick={(event) => event.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
