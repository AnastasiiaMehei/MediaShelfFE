import { useState, useEffect } from "react";
import { searchImages } from "../api/pixabayApi";
import type { PixabayImage } from "../types/PixabayImage";

export function usePixabaySearch(query: string, page: number) {
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchTerm = query || "popular"; 
    let isCancelled = false;

    async function fetchImages() {
      setLoading(true);
      try {
        const data = await searchImages(searchTerm, page);
        if (!isCancelled) {
          if (page === 1) {
            setImages(data); 
          } else {
            setImages((prev) => [...prev, ...data]);
          }
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchImages();
    return () => { isCancelled = true; };
  }, [query, page]);

  return { images, loading };
}
