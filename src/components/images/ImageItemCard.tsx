import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { ImageItem } from "../../api/pixabayApi";

interface ImageItemCardProps {
  image: ImageItem;
}

export default function ImageItemCard({ image }: ImageItemCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/images/${image.imageId}`)}
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-800 transition"
    >
      <img
        src={image.imageUrl || image.coverUrl || 'https://via.placeholder.com/300x200?text=Image'}
        alt={image.title}
        className="w-full h-64 object-cover rounded-md mb-4"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image';
        }}
      />

      {/* <h3 className="text-xl font-semibold">{image.title}</h3> */}
      {/* {image.description && (
        <p className="text-gray-400 text-sm">{image.description}</p>
      )} */}
    </motion.div>
  );
}