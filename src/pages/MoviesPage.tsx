import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { Bookmark, Heart } from "lucide-react";
import { Button } from "@mui/material";
import { useMoviesByFilter } from "../hooks/useMovies";
import type { MovieFilter } from "../types/movies";
import MovieCard from "../components/movies/MovieCard";

const FILTER_OPTIONS: { value: MovieFilter; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Upcoming" },
  { value: "now_playing", label: "Now Playing" },
];

export default function MoviesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<MovieFilter>("popular");
  const { movies, loading } = useMoviesByFilter(activeFilter);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-red-500"
        >
          Movies
        </motion.h1>
        
        <div className="flex gap-3">
          <Button
            component={motion.button}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/movies/watchlist")}
            variant="contained"
            sx={{
              backgroundColor: '#2563eb',
              '&:hover': { backgroundColor: '#1d4ed8' },
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              px: 2,
              py: 1,
              borderRadius: '0.5rem',
              fontWeight: 'semibold',
              transition: 'all 0.2s'
            }}
          >
            <Bookmark className="w-5 h-5" />
            Watchlist
          </Button>
          <Button
            component={motion.button}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/movies/favorites")}
            variant="contained"
            sx={{
              backgroundColor: '#ca8a04',
              '&:hover': { backgroundColor: '#a16207' },
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              px: 2,
              py: 1,
              borderRadius: '0.5rem',
              fontWeight: 'semibold',
              transition: 'all 0.2s'
            }}
          >
            <Heart className="w-5 h-5" />
            Favorites
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-4 mb-8 flex-wrap"
      >
        {FILTER_OPTIONS.map((option) => (
          <Button
            key={option.value}
            component={motion.button}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActiveFilter(option.value)}
            variant={activeFilter === option.value ? "contained" : "outlined"}
            sx={{
              px: 3,
              py: 1,
              borderRadius: '0.5rem',
              fontWeight: 'semibold',
              transition: 'all 0.2s',
              ...(activeFilter === option.value
                ? {
                    backgroundColor: '#ef4444',
                    '&:hover': { backgroundColor: '#dc2626' },
                    color: 'white',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }
                : {
                    borderColor: '#374151',
                    color: '#d1d5db',
                    '&:hover': { 
                      backgroundColor: '#374151',
                      borderColor: '#4b5563'
                    }
                  }
              )
            }}
          >
            {option.label}
          </Button>
        ))}
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#ef4444" size={50} />
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
