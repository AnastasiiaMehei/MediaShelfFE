import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { BookItem } from "../../api/booksApi";

interface BookItemCardProps {
  book: BookItem;
}

export default function BookItemCard({ book }: BookItemCardProps) {
  const navigate = useNavigate();

  const getCoverUrl = () => {
    if (book.coverUrl && book.coverUrl !== 'https://via.placeholder.com/300x400?text=No+Cover') {
      return book.coverUrl;
    }
    if (book.bookId.startsWith('OL') && book.bookId.endsWith('W')) {
      return `https://covers.openlibrary.org/b/olid/${book.bookId}-M.jpg`;
    }
    return 'https://picsum.photos/300/400?random=book';
  };

  return (
    <motion.div
      onClick={() => navigate(`/books/${book.bookId}`)}
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-800 transition"
    >
      <img
        src={getCoverUrl()}
        alt={book.title}
        className="w-full h-64 object-cover rounded-md mb-4"
        onError={(e) => {
          e.currentTarget.src = 'https://picsum.photos/300/400?random=book';
        }}
      />

      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-gray-400">{book.author}</p>
      {book.rating && (
        <p className="text-yellow-400 text-sm">★ {book.rating}/5</p>
      )}
    </motion.div>
  );
}