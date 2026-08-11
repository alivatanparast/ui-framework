'use client';

import React, { useEffect, useState } from 'react';

export function GalleryGrid({ data }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const closeModal = () => setSelectedImage(null);

  // Close modal with the Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <section id="portfolio" className="bg-gray-900 py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-4xl font-bold text-white">
            My Work
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((img) => (
              <button
                key={img.id}
                type="button"
                className={`group relative cursor-pointer overflow-hidden rounded-lg text-left ${img.span || ''}`}
                onClick={() => setSelectedImage(img)}
                aria-label={`View ${img.title || img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="gallery-img h-full w-full object-cover"
                />

                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="translate-y-4 text-lg font-medium text-white transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                    {img.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <ImageModal image={selectedImage} onClose={closeModal} />
    </>
  );
}

export function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <div
        className="relative"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt || image.title || 'Enlarged view'}
          className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
        />

        <button
          type="button"
          className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl font-bold text-gray-900 shadow-lg transition hover:bg-gray-200"
          onClick={onClose}
          aria-label="Close image preview"
        >
          ×
        </button>

        {image.title && (
          <p className="mt-3 text-center text-lg font-medium text-white">
            {image.title}
          </p>
        )}
      </div>
    </div>
  );
}
