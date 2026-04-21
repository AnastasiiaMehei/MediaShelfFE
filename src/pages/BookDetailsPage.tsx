import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../api/booksApi";
import type { Book } from "../types/Book";
import { motion } from "framer-motion";
import { useAppSelector } from "../lib/store/hooks";

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const token = useAppSelector((state) => state.auth.accessToken);

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ID from URL:", id);
    console.log("Token from Redux:", token);

    if (!id || !token) {
      console.log("STOP: no id or no token");
      return;
    }

    getBookById(id, token)
      .then((data) => {
        console.log("API response:", data);
        setBook(data);
      })
      .catch((err) => {
        console.error("Error loading book:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, token]);

  console.log("Current book state:", book);

  if (loading) {
    return <p className="text-gray-400 pt-24 px-6">Loading...</p>;
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
        className="text-4xl font-bold text-red-500 mb-6"
      >
        {book.title}
      </motion.h1>

      <div className="flex gap-10">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-64 h-96 object-cover rounded-lg"
        />

        <div>
          <p className="text-xl mb-4">{book.author}</p>
          <p className="text-gray-300">Pages: {book.totalPages}</p>

          {book.description ? (
            <p className="text-gray-400">{book.description}</p>
            
          ) : (
            <p className="text-gray-500 italic">
              No description available for this book.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
