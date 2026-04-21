import { motion, AnimatePresence } from "framer-motion";
import type { PixabayImage } from "../../types/PixabayImage";

interface ImageModalProps {
  image: PixabayImage | null;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative bg-gray-900 p-4 rounded-lg shadow-lg max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()} // щоб не закривати при кліку всередині
        >
          <img
            src={image.largeImageURL}
            alt={image.tags}
            className="w-full h-[600px] object-cover rounded-md"
          />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-xl"
            aria-label="Close modal"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
