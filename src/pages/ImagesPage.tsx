import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, Heart } from "lucide-react";
import { usePixabaySearch } from "../hooks/usePixabaySearch";
import ImageCard from "../components/images/ImageCard";
import ImageModal from "../components/images/ImageModal";
import { ClipLoader } from "react-spinners";
import { Button } from "@mui/material";
import type { PixabayImage } from "../types/PixabayImage";

export default function ImagesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { images, loading } = usePixabaySearch(query, page);
  const [selectedImage, setSelectedImage] = useState<PixabayImage | null>(null);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6">
      <div className="flex items-center justify-between mb-8 ml-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-red-500"
        >
          Images Gallery
        </motion.h1>
        
        <div className="flex gap-3">
          <Button
            component={motion.button}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/images/viewed")}
            variant="contained"
            startIcon={<Bookmark className="w-5 h-5" />}
            sx={{
              backgroundColor: '#2563eb',
              '&:hover': { backgroundColor: '#1d4ed8' },
              borderRadius: '0.5rem',
              fontWeight: 'semibold',
              transition: 'all 0.2s'
            }}
          >
            Viewed
          </Button>
          <Button
            component={motion.button}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/images/favorites")}
            variant="contained"
            startIcon={<Heart className="w-5 h-5" />}
            sx={{
              backgroundColor: '#eab308',
              color: 'black',
              '&:hover': { backgroundColor: '#ca8a04' },
              borderRadius: '0.5rem',
              fontWeight: 'semibold',
              transition: 'all 0.2s'
            }}
          >
            Favorites
          </Button>
        </div>
      </div>

      <div className="flex justify-center mb-6">
  <input
    type="text"
    placeholder="Search images..."
    className="w-full max-w-md p-3 rounded bg-gray-800 text-white"
    onChange={(e) => {
      setQuery(e.target.value);
      setPage(1);
    }}
  />
</div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img) => (
          <ImageCard
            key={img.id}
            image={img}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Loader з react-spinners */}
      <div ref={loaderRef} className="flex justify-center items-center h-20">
        {loading && <ClipLoader color="#ef4444" size={40} />}
      </div>

      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
