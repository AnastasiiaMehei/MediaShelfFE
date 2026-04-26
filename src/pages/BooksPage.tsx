import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, Heart } from "lucide-react";
import BooksGrid from "../components/books/BooksGrid";
import type { Book } from "../types/Book";
import { getRecommendedBooks } from "../api/booksApi";
import ContentError from "../components/ContentError";
import { useAppSelector } from "../lib/store/hooks";
import { ClipLoader } from "react-spinners"; 

export default function BooksPage() {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.accessToken);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecommendedBooks(token || undefined);
        setBooks(data);
        if (!data || data.length === 0) {
          setError("No recommended books are available right now.");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("Error loading books:", errorMessage);
        setError("Failed to load books. Please try again later.");
        setBooks([]);
      }
       finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [token]);
  

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-red-500"
        >
          Books
        </motion.h1>
        
        <div className="flex gap-3">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/books/read")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
          >
            <Bookmark className="w-5 h-5" />
            Read Books
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/books/favorites")}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold transition"
          >
            <Heart className="w-5 h-5" />
            Favorites
          </motion.button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#ef4444" size={50} /> 
        </div>
      ) : error ? (
        <ContentError
          title="Books Not Available"
          message={error}
          subtext="The recommended books could not be loaded from the API."
          buttonLabel="Back to home"
        />
      ) : (
        <BooksGrid books={books} />
      )}
    </div>
  );
}
