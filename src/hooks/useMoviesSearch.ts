import { useEffect, useState } from "react";
import { fetchMovies } from "../api/moviesApi";
import type { Movie } from "../types/Movie";

export function useMoviesSearch(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    let isCancelled = false;

    async function loadMovies() {
      setLoading(true); 
      try {
        const data = await fetchMovies(query);
        if (!isCancelled) setMovies(data);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    loadMovies();

    return () => {
      isCancelled = true;
    };
  }, [query]);

  return { movies, loading };
}
