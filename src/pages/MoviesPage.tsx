import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { fetchMovies } from "../api/moviesApi";
import type { Movie } from "../types/Movie";
import MovieCard from "../components/movies/MovieCard";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchMovies("popular");
        setMovies(data);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-red-500 mb-6"
      >
        Movies
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#ef4444" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
