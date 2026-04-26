import { useEffect } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { RotateCcw } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../lib/store/hooks";
import { fetchRead } from "../store/booksSlice";
import BookItemCard from "../components/books/BookItemCard";

export default function ReadBooksPage() {
  const dispatch = useAppDispatch();
  const { read, loading, error } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchRead());
  }, [dispatch]);

  const handleRefetch = () => {
    dispatch(fetchRead({ force: true }));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-red-500"
        >
          My Read Books
        </motion.h1>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ rotate: 180 }}
          onClick={handleRefetch}
          disabled={loading}
          className="p-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-lg transition"
          title="Refresh read books"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#ef4444" size={50} />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error}</p>
          <p className="text-gray-500 text-sm mt-2">Please try refreshing the page.</p>
        </div>
      ) : read.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Your read books list is empty</p>
          <p className="text-gray-500 text-sm mt-2">Start reading books from the Books page!</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {read.map((book) => (
            <BookItemCard key={book._id} book={book} />
          ))}
        </motion.div>
      )}
    </div>
  );
}