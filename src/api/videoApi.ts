// src/api/videoApi.ts
import axios from "axios";

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
