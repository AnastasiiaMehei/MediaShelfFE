import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../api/booksApi";
import type { Book } from "../types/Book";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../lib/store/hooks";
import { ClipLoader } from "react-spinners";
import { addToFavoritesAsync, addToReadAsync, removeFromFavoritesAsync, removeFromReadAsync, fetchFavorites, fetchRead } from "../store/booksSlice";
import { Button } from "@mui/material"; 

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const token = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const { favorites, read, loading: booksLoading } = useAppSelector((state) => state.books);

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const isFavorite = favorites.some((b) => b.bookId === id);
  const isRead = read.some((b) => b.bookId === id);

  const handleAddToFavorites = async () => {
    if (!book || !id) return;
    
    try {
      const payload = {
        bookId: id,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        description: book.description,
      };

      if (isFavorite) {
        await dispatch(removeFromFavoritesAsync(id));
      } else {
        await dispatch(addToFavoritesAsync(payload));
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
    }
  };

  const handleAddToRead = async () => {
    if (!book || !id) return;
    
    try {
      const payload = {
        bookId: id,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl || "",
        description: book.description,
      };

      if (isRead) {
        await dispatch(removeFromReadAsync(id));
      } else {
        await dispatch(addToReadAsync(payload));
      }
    } catch (err) {
      console.error("Error updating read list:", err);
    }
  };

  useEffect(() => {
    if (!id || !token) return;

    getBookById(id, token)
      .then((data) => setBook(data))
      .catch((err) => console.error("Error loading book:", err))
      .finally(() => setLoading(false));
  }, [id, token]);

  useEffect(() => {
    dispatch(fetchFavorites());
    dispatch(fetchRead());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <ClipLoader color="#ef4444" size={50} /> 
      </div>
    );
  }

  if (!book) {
    return (
      <p className="text-red-500 pt-24 px-6">
        Book not found or failed to load.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-red-500 mb-6 ml-20"
      >
        {book.title}
      </motion.h1>

      <div className="flex gap-10">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-64 h-96 object-cover rounded-lg"
        />

        <div>
          <p className="text-xl mb-4 ">{book.author}</p>
          <p className="text-gray-300">Pages: {book.totalPages}</p>

          {book.description ? (
            <p className="text-gray-400">{book.description}</p>
          ) : (
            <p className="text-gray-500 italic">
              No description available for this book.
            </p>
          )}

          <div className="flex gap-4 flex-wrap mt-6">
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToRead}
              disabled={booksLoading}
              variant="contained"
              sx={{
                px: 3,
                py: 1.5,
                backgroundColor: isRead ? '#16a34a' : '#2563eb',
                '&:hover': { 
                  backgroundColor: isRead ? '#15803d' : '#1d4ed8'
                },
                '&:disabled': { opacity: 0.5 },
                borderRadius: '0.5rem',
                fontWeight: 'semibold',
                transition: 'all 0.2s'
              }}
            >
              {booksLoading ? "Loading..." : isRead ? "✓ Read" : "Mark as Read"}
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToFavorites}
              disabled={booksLoading}
              variant="contained"
              sx={{
                px: 3,
                py: 1.5,
                backgroundColor: isFavorite ? '#eab308' : '#374151',
                '&:hover': { 
                  backgroundColor: isFavorite ? '#ca8a04' : '#4b5563'
                },
                '&:disabled': { opacity: 0.5 },
                borderRadius: '0.5rem',
                fontWeight: 'semibold',
                transition: 'all 0.2s'
              }}
            >
              {booksLoading ? "Loading..." : isFavorite ? "★ Favorited" : "Add to Favorites"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
