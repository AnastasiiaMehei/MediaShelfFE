// src/components/video/VideoModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import type { Video } from "../../types/Video";

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

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
          <video
            controls
            autoPlay
            className="w-full h-[600px] object-cover rounded-md"
          >
            <source src={video.url} type="video/mp4" />
          </video>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
