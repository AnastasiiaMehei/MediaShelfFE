import { motion } from "framer-motion";
import type { PixabayImage } from "../../types/PixabayImage";

interface ImageCardProps {
  image: PixabayImage;
  onClick: () => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-800 transition"
      onClick={onClick}
    >
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
    </motion.div>
  );
}
