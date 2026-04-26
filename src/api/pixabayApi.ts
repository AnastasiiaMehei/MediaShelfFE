import axios from "axios";
import apiClient from "../lib/api/client";

const API_URL = "https://pixabay.com/api/";
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export const searchImages = async (query: string, page = 1) => {
  const res = await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      per_page: 30,
      page,
      safesearch: true,
    },
  });

  return res.data.hits;
};


export interface ImageItem {
  _id: string;
  imageId: string;
  title: string;
  imageUrl: string;
  description?: string;
  coverUrl?: string;
  isFavorite: boolean;
  isViewed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ImageStatus {
  isFavorite: boolean;
  isViewed: boolean;
}

export const getFavoriteImages = async (): Promise<ImageItem[]> => {
  const res = await apiClient.get('/images/favorites');
  return res.data.data;
};

export const addImageToFavorites = async (data: {
  imageId: string;
  title: string;
  imageUrl: string;
  description?: string;
  cover?: File;
}): Promise<ImageItem> => {
  const formData = new FormData();
  formData.append('imageId', data.imageId);
  formData.append('title', data.title);
  formData.append('imageUrl', data.imageUrl);
  formData.append('coverUrl', data.imageUrl); // Use imageUrl as coverUrl
  if (data.description) formData.append('description', data.description);
  if (data.cover) formData.append('cover', data.cover);

  const res = await apiClient.post('/images/favorites', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
};

export const removeImageFromFavorites = async (imageId: string): Promise<void> => {
  await apiClient.delete(`/images/favorites/${imageId}`);
};

export const getViewedImages = async (): Promise<ImageItem[]> => {
  const res = await apiClient.get('/images/viewed');
  return res.data.data;
};

export const addImageToViewed = async (data: {
  imageId: string;
  title: string;
  imageUrl: string;
  description?: string;
  cover?: File;
}): Promise<ImageItem> => {
  const formData = new FormData();
  formData.append('imageId', data.imageId);
  formData.append('title', data.title);
  formData.append('imageUrl', data.imageUrl);
  formData.append('coverUrl', data.imageUrl); // Use imageUrl as coverUrl
  if (data.description) formData.append('description', data.description);
  if (data.cover) formData.append('cover', data.cover);

  const res = await apiClient.post('/images/viewed', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.data;
};

export const removeImageFromViewed = async (imageId: string): Promise<void> => {
  await apiClient.delete(`/images/viewed/${imageId}`);
};

export const getImageStatus = async (imageId: string): Promise<ImageStatus> => {
  const res = await apiClient.get(`/images/${imageId}/status`);
  return res.data.data;
};
