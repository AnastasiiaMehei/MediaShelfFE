import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { usePixabaySearch } from "../hooks/usePixabaySearch";
import ImageCard from "../components/images/ImageCard";
import ImageModal from "../components/images/ImageModal";
import { ClipLoader } from "react-spinners"; 
import type { PixabayImage } from "../types/PixabayImage";

export default function ImagesPage() {
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
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-red-500 mb-6 ml-20"
      >
        Images Gallery
      </motion.h1>

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
