import { useState, useEffect } from "react";
import { getFavoriteImages, getViewedImages, addImageToFavorites, addImageToViewed, removeImageFromFavorites, removeImageFromViewed, type ImageItem } from "../api/pixabayApi";

export function useFavoriteImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFavoriteImages();
      setImages(Array.isArray(data) ? data : []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        return;
      }
      setError(err.message || "Failed to load favorite images");
      console.error("Error loading favorite images:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const refetch = () => loadFavorites();

  return { images, loading, error, refetch };
}

export function useViewedImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadViewed = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getViewedImages();
      setImages(Array.isArray(data) ? data : []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        return;
      }
      setError(err.message || "Failed to load viewed images");
      console.error("Error loading viewed images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadViewed();
  }, []);

  const refetch = () => loadViewed();

  return { images, loading, error, refetch };
}

export function useImageActions() {
  const [loading, setLoading] = useState(false);

  const addToFavorites = async (data: {
    imageId: string;
    title: string;
    imageUrl: string;
    description?: string;
    cover?: File;
  }) => {
    setLoading(true);
    try {
      await addImageToFavorites(data);
      return true;
    } catch (err: any) {
      console.error("Error adding image to favorites:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (imageId: string) => {
    setLoading(true);
    try {
      await removeImageFromFavorites(imageId);
      return true;
    } catch (err: any) {
      console.error("Error removing image from favorites:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addToViewed = async (data: {
    imageId: string;
    title: string;
    imageUrl: string;
    description?: string;
    cover?: File;
  }) => {
    setLoading(true);
    try {
      await addImageToViewed(data);
      return true;
    } catch (err: any) {
      console.error("Error adding image to viewed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromViewed = async (imageId: string) => {
    setLoading(true);
    try {
      await removeImageFromViewed(imageId);
      return true;
    } catch (err: any) {
      console.error("Error removing image from viewed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addToFavorites,
    removeFromFavorites,
    addToViewed,
    removeFromViewed,
  };
}