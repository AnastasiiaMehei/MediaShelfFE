import type { Movie } from "../../types/Movie";
import Card from "../ui/Card";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Card>
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-80 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{movie.title}</h3>
      <p className="text-gray-400 text-sm">
        Release: {movie.release_date || "N/A"}
      </p>
    </Card>
  );
}
