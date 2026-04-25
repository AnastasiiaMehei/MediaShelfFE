import { useEffect, useState } from "react";
import moviesService from "../services/movies.service";
import type { Movie } from "../types/movies";

export function useMoviesSearch(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    let isCancelled = false;

    async function loadMovies() {
      setLoading(true); 
      try {
        const data = await moviesService.fetchMovies(query);
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
