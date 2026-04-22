import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BooksGrid from "../components/books/BooksGrid";
import type { Book } from "../types/Book";
import axios from "axios";
import { useAppSelector } from "../lib/store/hooks";
import { ClipLoader } from "react-spinners"; 

export default function BooksPage() {
  const token = useAppSelector((state) => state.auth.accessToken);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token) return;
  
    axios
      .get(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/books/recommend`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBooks(res.data.results))
      .finally(() => setLoading(false));
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
      ) : (
        <BooksGrid books={books} />
      )}
    </div>
  );
}
