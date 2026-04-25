import apiClient from "../lib/api/client";
import type { Movie, MoviePayload } from "../types/movies";

interface BackendMovie {
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

function transformTMDBMovie(tmdbMovie: any): Movie {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    overview: tmdbMovie.overview || "",
    release_date: tmdbMovie.release_date || "",
    poster_path: tmdbMovie.poster_path || null,
    backdrop_path: tmdbMovie.backdrop_path || null,
    vote_average: tmdbMovie.vote_average || 0,
  };
}

const moviesService = {
  // TMDB API calls
  fetchMovies: async (query: string): Promise<Movie[]> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to search movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results.map(transformTMDBMovie);
  },

  fetchMoviesByFilter: async (filter: string, page: number = 1): Promise<Movie[]> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${filter}?language=en-US&page=${page}`,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results.map(transformTMDBMovie);
  },

  fetchMovieDetails: async (movieId: number): Promise<Movie> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return transformTMDBMovie(data);
  },

  // User lists API calls
  fetchWatchlistMovies: (): Promise<Movie[]> =>
    apiClient.get("/movies/watchlist").then(res => res.data.data.map(transformBackendMovieToMovie)),

  fetchFavoriteMovies: (): Promise<Movie[]> =>
    apiClient.get("/movies/favorites").then(res => res.data.data.map(transformBackendMovieToMovie)),

  addToWatchlist: (payload: MoviePayload): Promise<void> =>
    apiClient.post("/movies/watchlist", payload),

  removeFromWatchlist: (movieId: number): Promise<void> =>
    apiClient.delete(`/movies/watchlist/${movieId}`),

  addToFavorites: (payload: MoviePayload): Promise<void> =>
    apiClient.post("/movies/favorites", payload),

  removeFromFavorites: (movieId: number): Promise<void> =>
    apiClient.delete(`/movies/favorites/${movieId}`),

  checkMovieStatus: (movieId: number): Promise<{
    inWatchlist: boolean;
    inFavorites: boolean;
  }> =>
    apiClient.get(`/movies/${movieId}/status`).then(res => res.data.data),
};

function transformBackendMovieToMovie(backendMovie: BackendMovie): Movie {
  return {
    id: parseInt(backendMovie.movieId, 10),
    title: backendMovie.title,
    overview: backendMovie.overview || "",
    release_date: backendMovie.releaseDate || "",
    poster_path: backendMovie.posterUrl || null,
    backdrop_path: null, // Backend doesn't provide backdrop
    vote_average: backendMovie.rating || 0,
  };
};

export default moviesService;