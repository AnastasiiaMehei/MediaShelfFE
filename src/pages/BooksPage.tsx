import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BooksGrid from "../components/books/BooksGrid";
import type { Book } from "../types/Book";
import { getRecommendedBooks } from "../api/booksApi";
import ContentError from "../components/ContentError";
import { useAppSelector } from "../lib/store/hooks";
import { ClipLoader } from "react-spinners"; 

export default function BooksPage() {
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
      } catch (err: any) {
        console.error("Error loading books:", err);
        setError("Failed to load books. Please try again later.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [token]);
  

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-red-500 mb-6"
      >
        Books
      </motion.h1>

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
