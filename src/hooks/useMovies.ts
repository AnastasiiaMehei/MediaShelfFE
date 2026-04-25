import { useState, useEffect } from "react";
import moviesService from "../services/movies.service";
import type { Movie, MovieFilter, MovieStatus, MoviePayload } from "../types/movies";

export function useMoviesByFilter(filter: MovieFilter, page: number = 1) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      setError(null);
      try {
        const data = await moviesService.fetchMoviesByFilter(filter, page);
        setMovies(data);
      } catch (err: any) {
        setError(err.message || "Failed to load movies");
        console.error("Error loading movies:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [filter, page]);

  return { movies, loading, error };
}

export function useMovieDetails(movieId: number | null) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    async function loadMovieDetails() {
      setLoading(true);
      setError(null);
      try {
        const data = await moviesService.fetchMovieDetails(movieId!);
        setMovie(data);
      } catch (err: any) {
        setError(err.message || "Failed to load movie details");
        console.error("Error loading movie details:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMovieDetails();
  }, [movieId]);

  return { movie, loading, error };
}

export function useMovieStatus(movieId: number | null) {
  const [status, setStatus] = useState<MovieStatus>({ inWatchlist: false, inFavorites: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function loadStatus() {
      setLoading(true);
      try {
        const data = await moviesService.checkMovieStatus(movieId!);
        setStatus(data);
      } catch (err: any) {
        console.error("Error loading movie status:", err);
        // If 401, user will be redirected by interceptor
      } finally {
        setLoading(false);
      }
    }

    loadStatus();
  }, [movieId]);

  return { status, loading, setStatus };
}

export function useWatchlistMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWatchlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await moviesService.fetchWatchlistMovies();
      setMovies(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        // User will be redirected to login by interceptor
        return;
      }
      setError(err.message || "Failed to load watchlist");
      console.error("Error loading watchlist:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  return { movies, loading, error, refetch: loadWatchlist };
}

export function useFavoriteMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await moviesService.fetchFavoriteMovies();
      setMovies(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        // User will be redirected to login by interceptor
        return;
      }
      setError(err.message || "Failed to load favorites");
      console.error("Error loading favorites:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return { movies, loading, error, refetch: loadFavorites };
}

export function useMovieActions() {
  const [loading, setLoading] = useState(false);

  const addToWatchlist = async (payload: MoviePayload) => {
    setLoading(true);
    try {
      await moviesService.addToWatchlist(payload);
      return true;
    } catch (err: any) {
      console.error("Error adding to watchlist:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (movieId: number) => {
    setLoading(true);
    try {
      await moviesService.removeFromWatchlist(movieId);
      return true;
    } catch (err: any) {
      console.error("Error removing from watchlist:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (payload: MoviePayload) => {
    setLoading(true);
    try {
      await moviesService.addToFavorites(payload);
      return true;
    } catch (err: any) {
      console.error("Error adding to favorites:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (movieId: number) => {
    setLoading(true);
    try {
      await moviesService.removeFromFavorites(movieId);
      return true;
    } catch (err: any) {
      console.error("Error removing from favorites:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addToWatchlist,
    removeFromWatchlist,
    addToFavorites,
    removeFromFavorites,
  };
}