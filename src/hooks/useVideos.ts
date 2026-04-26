import { useState, useEffect } from "react";
import { getFavoriteVideos, getViewedVideos, addVideoToFavorites, addVideoToViewed, removeVideoFromFavorites, removeVideoFromViewed, type VideoItem } from "../api/videoApi";

export function useFavoriteVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFavoriteVideos();
      setVideos(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        return;
      }
      setError(err.message || "Failed to load favorite videos");
      console.error("Error loading favorite videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const refetch = () => loadFavorites();

  return { videos, loading, error, refetch };
}

export function useViewedVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadViewed = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getViewedVideos();
      setVideos(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        // User will be redirected to login by interceptor
        return;
      }
      setError(err.message || "Failed to load viewed videos");
      console.error("Error loading viewed videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadViewed();
  }, []);

  const refetch = () => loadViewed();

  return { videos, loading, error, refetch };
}

export function useVideoActions() {
  const [loading, setLoading] = useState(false);

  const addToFavorites = async (data: {
    videoId: string;
    title: string;
    videoUrl: string;
    description?: string;
    duration?: number;
    cover?: File;
  }) => {
    setLoading(true);
    try {
      await addVideoToFavorites(data);
      return true;
    } catch (err: any) {
      console.error("Error adding video to favorites:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (videoId: string) => {
    setLoading(true);
    try {
      await removeVideoFromFavorites(videoId);
      return true;
    } catch (err: any) {
      console.error("Error removing video from favorites:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addToViewed = async (data: {
    videoId: string;
    title: string;
    videoUrl: string;
    description?: string;
    duration?: number;
    cover?: File;
  }) => {
    setLoading(true);
    try {
      await addVideoToViewed(data);
      return true;
    } catch (err: any) {
      console.error("Error adding video to viewed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromViewed = async (videoId: string) => {
    setLoading(true);
    try {
      await removeVideoFromViewed(videoId);
      return true;
    } catch (err: any) {
      console.error("Error removing video from viewed:", err);
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