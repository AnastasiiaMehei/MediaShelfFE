import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { RotateCcw } from "lucide-react";
import { useWatchlistMovies } from "../hooks/useMovies";
import MovieCard from "../components/movies/MovieCard";

export default function WatchlistMoviesPage() {
  const { movies, loading, refetch } = useWatchlistMovies();

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-red-500"
        >
          My Watchlist
        </motion.h1>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ rotate: 180 }}
          onClick={refetch}
          disabled={loading}
          className="p-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-lg transition"
          title="Refresh watchlist"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#ef4444" size={50} />
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Your watchlist is empty</p>
          <p className="text-gray-500 text-sm mt-2">Start adding movies from the Movies page!</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
