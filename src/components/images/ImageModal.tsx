import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { IconButton } from "@mui/material";
import { addImageToFavorites, addImageToViewed, removeImageFromFavorites, removeImageFromViewed, getImageStatus } from "../../api/pixabayApi";
import type { PixabayImage } from "../../types/PixabayImage";

interface ImageModalProps {
  image: PixabayImage | null;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image) {
      loadImageStatus();
    }
  }, [image]);

  const loadImageStatus = async () => {
    if (!image) return;
    try {
      const status = await getImageStatus(image.id.toString());
      setIsFavorite(status.isFavorite);
      setIsViewed(status.isViewed);
    } catch (error) {
      console.error("Error loading image status:", error);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!image || loading) return;
    setLoading(true);
    try {
      if (isFavorite) {
        await removeImageFromFavorites(image.id.toString());
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        await addImageToFavorites({
          imageId: image.id.toString(),
          title: image.tags,
          imageUrl: image.largeImageURL,
          description: image.tags,
        });
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorite status");
    } finally {
      setLoading(false);
    }
  };

  const handleViewedToggle = async () => {
    if (!image || loading) return;
    setLoading(true);
    try {
      if (isViewed) {
        await removeImageFromViewed(image.id.toString());
        setIsViewed(false);
        toast.success("Removed from viewed");
      } else {
        await addImageToViewed({
          imageId: image.id.toString(),
          title: image.tags,
          imageUrl: image.largeImageURL,
          description: image.tags,
        });
        setIsViewed(true);
        toast.success("Marked as viewed");
      }
    } catch (error) {
      console.error("Error toggling viewed:", error);
      toast.error("Failed to update viewed status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {image && (
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
            src={image?.largeImageURL}
            alt={image?.tags}
            className="w-full h-[600px] object-cover rounded-md"
          />

          <div className="absolute top-5 left-5 flex gap-3">
            <IconButton
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteToggle}
              disabled={loading}
              sx={{
                p: 1.5,
                backgroundColor: isFavorite ? '#ef4444' : '#1f2937',
                '&:hover': { backgroundColor: isFavorite ? '#dc2626' : '#374151' },
                '&:disabled': { opacity: 0.5 },
                color: isFavorite ? 'white' : '#d1d5db',
                borderRadius: '50%',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            </IconButton>

            <IconButton
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleViewedToggle}
              disabled={loading}
              sx={{
                p: 1.5,
                backgroundColor: isViewed ? '#3b82f6' : '#1f2937',
                '&:hover': { backgroundColor: isViewed ? '#2563eb' : '#374151' },
                '&:disabled': { opacity: 0.5 },
                color: isViewed ? 'white' : '#d1d5db',
                borderRadius: '50%',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              title={isViewed ? "Remove from viewed" : "Mark as viewed"}
            >
              <Eye className={`w-5 h-5 ${isViewed ? "fill-current" : ""}`} />
            </IconButton>
          </div>

          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 32,
              height: 32,
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '50%',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              '&:hover': { 
                backgroundColor: 'primary.dark',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              },
              transition: 'all 0.2s'
            }}
            aria-label="Close modal"
          >
            ✕
          </IconButton>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
