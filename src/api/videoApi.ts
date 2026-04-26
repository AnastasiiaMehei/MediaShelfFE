import axios from "axios";
import apiClient from "../lib/api/client";

export interface PixabayVideo {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  duration: number;
  videos: {
    large: { url: string; thumbnail: string };
    medium: { url: string; thumbnail: string };
    small: { url: string; thumbnail: string };
    tiny: { url: string; thumbnail: string };
  };
  views: number;
  downloads: number;
  likes: number;
  user: string;
  userImageURL: string;
}

interface PixabayVideoResponse {
  hits: PixabayVideo[];
}

const API_URL = "https://pixabay.com/api/videos/";
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY; // у .env

export async function fetchVideos(query: string): Promise<PixabayVideo[]> {
  const res = await axios.get<PixabayVideoResponse>(API_URL, {
    params: {
      key: API_KEY,
      q: query,
      per_page: 20,
      safesearch: true,
    },
  });
  return res.data.hits;
}


export interface VideoItem {
  _id: string;
  videoId: string;
  title: string;
  videoUrl: string;
  description?: string;
  duration?: number;
  coverUrl?: string;
  isFavorite: boolean;
  isViewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VideoStatus {
  isFavorite: boolean;
  isViewed: boolean;
}

export const getFavoriteVideos = async (): Promise<VideoItem[]> => {
  const res = await apiClient.get('/videos/favorites');
  return res.data.data;
};

export const addVideoToFavorites = async (data: {
  videoId: string;
  title: string;
  videoUrl: string;
  description?: string;
  duration?: number;
  coverUrl?: string;
  cover?: File;
}): Promise<VideoItem> => {
  const formData = new FormData();
  formData.append('videoId', data.videoId);
  formData.append('title', data.title);
  formData.append('videoUrl', data.videoUrl);
  if (data.coverUrl) formData.append('coverUrl', data.coverUrl);
  if (data.description) formData.append('description', data.description);
  if (data.duration) formData.append('duration', data.duration.toString());
  if (data.cover) formData.append('cover', data.cover);

  const res = await apiClient.post('/videos/favorites', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
};

export const removeVideoFromFavorites = async (videoId: string): Promise<void> => {
  await apiClient.delete(`/videos/favorites/${videoId}`);
};

export const getViewedVideos = async (): Promise<VideoItem[]> => {
  const res = await apiClient.get('/videos/viewed');
  return res.data.data;
};

export const addVideoToViewed = async (data: {
  videoId: string;
  title: string;
  videoUrl: string;
  description?: string;
  duration?: number;
  coverUrl?: string;
  cover?: File;
}): Promise<VideoItem> => {
  const formData = new FormData();
  formData.append('videoId', data.videoId);
  formData.append('title', data.title);
  formData.append('videoUrl', data.videoUrl);
  if (data.coverUrl) formData.append('coverUrl', data.coverUrl);
  if (data.description) formData.append('description', data.description);
  if (data.duration) formData.append('duration', data.duration.toString());
  if (data.cover) formData.append('cover', data.cover);

  const res = await apiClient.post('/videos/viewed', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
};

export const removeVideoFromViewed = async (videoId: string): Promise<void> => {
  await apiClient.delete(`/videos/viewed/${videoId}`);
};

export const getVideoStatus = async (videoId: string): Promise<VideoStatus> => {
  const res = await apiClient.get(`/videos/${videoId}/status`);
  return res.data.data;
};
