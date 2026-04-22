import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../types/Book";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/books/${book._id}`)}
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-800 transition"
    >
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />

      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-gray-400">{book.author}</p>
    </motion.div>
  );
}
