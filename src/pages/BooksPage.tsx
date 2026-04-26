import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, Heart } from "lucide-react";
import { Button } from "@mui/material";
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
          <Button
            component={motion.button}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/books/read")}
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
            Read Books
          </Button>
          <Button
            component={motion.button}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/books/favorites")}
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
