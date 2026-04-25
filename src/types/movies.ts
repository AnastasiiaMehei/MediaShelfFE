export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
}

export interface MoviePayload {
  movieId: number;
  title: string;
  posterUrl?: string;
  releaseDate?: string;
  rating?: number;
  overview?: string;
  genres?: string[];
}

export interface BackendMovie {
  _id: string;
  userId: string;
  movieId: string;
  title: string;
  posterUrl?: string;
  releaseDate?: string;
  rating?: number;
  overview?: string;
  genres?: string[];
  isWatchlist: boolean;
  isFavorite: boolean;
  addedAt: string;
  updatedAt: string;
}

export interface MovieStatus {
  inWatchlist: boolean;
  inFavorites: boolean;
}

export type MovieFilter = "popular" | "top_rated" | "upcoming" | "now_playing";