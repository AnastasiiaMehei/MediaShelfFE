import React from "react";
import ImageCard from "./ImageCard";
import type { PixabayImage } from "../../types/PixabayImage";

interface ImagesGridProps {
  images: PixabayImage[];
  onImageClick: (image: PixabayImage) => void; // додаємо пропс
}

export default function ImagesGrid({ images, onImageClick }: ImagesGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {images.map((img) => (
        <ImageCard key={img.id} image={img} onClick={() => onImageClick(img)} />
      ))}
    </div>
  );
}
