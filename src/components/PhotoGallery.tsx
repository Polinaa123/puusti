import React from "react";

interface PhotoGalleryProps {
    photos: string[];
    columns?: number;
}

export default function PhotoGallery({ photos, columns = 3 }: PhotoGalleryProps) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '0.5rem',
        }}
      >
        {photos.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`photo-${i}`}
            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 4 }}
          />
        ))}
      </div>
    );
  }