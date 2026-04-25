import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movies";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={handleClick}
      className="bg-gray-900 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-800 transition"
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-80 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{movie.title}</h3>
      <p className="text-gray-400 text-sm">
        Release: {movie.release_date || "N/A"}
      </p>
    </motion.div>
  );
}
