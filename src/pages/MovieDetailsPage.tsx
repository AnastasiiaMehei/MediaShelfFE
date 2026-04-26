import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { Button } from "@mui/material";
import { useMovieDetails, useMovieStatus, useMovieActions } from "../hooks/useMovies";
import type { MoviePayload } from "../types/movies";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : null;
  
  const { movie, loading, error } = useMovieDetails(movieId);
  const { status, setStatus } = useMovieStatus(movieId);
  const { 
    addToWatchlist, 
    removeFromWatchlist, 
    addToFavorites, 
    removeFromFavorites,
    loading: actionsLoading 
  } = useMovieActions();

  const handleAddToWatchlist = async () => {
    if (!movie) return;
    
    try {
      const payload: MoviePayload = {
        movieId: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : undefined,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        overview: movie.overview,
      };

      if (status.inWatchlist) {
        await removeFromWatchlist(movie.id);
        setStatus(prev => ({ ...prev, inWatchlist: false }));
      } else {
        await addToWatchlist(payload);
        setStatus(prev => ({ ...prev, inWatchlist: true }));
      }
    } catch (err) {
      console.error("Error updating watchlist:", err);
    }
  };

  const handleAddToFavorites = async () => {
    if (!movie) return;
    
    try {
      const payload: MoviePayload = {
        movieId: movie.id,
        title: movie.title,
        posterUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : undefined,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        overview: movie.overview,
      };

      if (status.inFavorites) {
        await removeFromFavorites(movie.id);
        setStatus(prev => ({ ...prev, inFavorites: false }));
      } else {
        await addToFavorites(payload);
        setStatus(prev => ({ ...prev, inFavorites: true }));
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20 flex justify-center items-center">
        <ClipLoader color="#ef4444" size={50} />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
        <div className="text-2xl font-bold text-red-500">{error || "Movie not found"}</div>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
      {backdropUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 rounded-lg overflow-hidden max-h-96"
        >
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2"
        >
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="text-yellow-400 text-3xl font-bold">
                {movie.vote_average?.toFixed(1)}
              </div>
              <div className="text-gray-400">
                <div>Rating</div>
                <div className="text-sm">/ 10</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Release Date</h2>
            <p className="text-xl">{movie.release_date || "N/A"}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Overview</h2>
            <p className="text-gray-300 leading-relaxed">
              {movie.overview || "No overview available"}
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToWatchlist}
              disabled={actionsLoading}
              variant="contained"
              sx={{
                px: 3,
                py: 1.5,
                backgroundColor: status.inWatchlist ? '#16a34a' : '#ef4444',
                '&:hover': { 
                  backgroundColor: status.inWatchlist ? '#15803d' : '#dc2626'
                },
                '&:disabled': { opacity: 0.5 },
                borderRadius: '0.5rem',
                fontWeight: 'semibold',
                transition: 'all 0.2s'
              }}
            >
              {actionsLoading ? "Loading..." : status.inWatchlist ? "✓ In Watchlist" : "Add to Watchlist"}
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToFavorites}
              disabled={actionsLoading}
              variant="contained"
              sx={{
                px: 3,
                py: 1.5,
                backgroundColor: status.inFavorites ? '#eab308' : '#374151',
                '&:hover': { 
                  backgroundColor: status.inFavorites ? '#ca8a04' : '#4b5563'
                },
                '&:disabled': { opacity: 0.5 },
                borderRadius: '0.5rem',
                fontWeight: 'semibold',
                transition: 'all 0.2s'
              }}
            >
              {actionsLoading ? "Loading..." : status.inFavorites ? "★ Favorited" : "Add to Favorites"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
