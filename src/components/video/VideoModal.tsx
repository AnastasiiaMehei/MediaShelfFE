import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { addVideoToFavorites, addVideoToViewed, removeVideoFromFavorites, removeVideoFromViewed, getVideoStatus } from "../../api/videoApi";
import type { PixabayVideo } from "../../api/videoApi";

interface VideoModalProps {
  video: PixabayVideo | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (video) {
      loadVideoStatus();
    }
  }, [video]);

  const loadVideoStatus = async () => {
    if (!video) return;
    try {
      const status = await getVideoStatus(video.id.toString());
      setIsFavorite(status.isFavorite);
      setIsViewed(status.isViewed);
    } catch (error) {
      console.error("Error loading video status:", error);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!video || loading) return;
    setLoading(true);
    try {
      if (isFavorite) {
        await removeVideoFromFavorites(video.id.toString());
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        await addVideoToFavorites({
          videoId: video.id.toString(),
          title: video.tags,
          videoUrl: video.videos.large.url,
          coverUrl: video.videos.large.thumbnail,
          duration: video.duration,
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
    if (!video || loading) return;
    setLoading(true);
    try {
      if (isViewed) {
        await removeVideoFromViewed(video.id.toString());
        setIsViewed(false);
        toast.success("Removed from viewed");
      } else {
        await addVideoToViewed({
          videoId: video.id.toString(),
          title: video.tags,
          videoUrl: video.videos.large.url,
          coverUrl: video.videos.large.thumbnail,
          duration: video.duration,
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
      {video && (
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
          onClick={(e) => e.stopPropagation()} 
        >
          <video
            controls
            autoPlay
            className="w-full h-[600px] object-cover rounded-md"
          >
            <source src={video?.videos.large.url} type="video/mp4" />
          </video>


          <div className="absolute top-5 left-5 flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteToggle}
              disabled={loading}
              className={`p-3 rounded-full shadow-lg transition-all ${
                isFavorite
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleViewedToggle}
              disabled={loading}
              className={`p-3 rounded-full shadow-lg transition-all ${
                isViewed
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              title={isViewed ? "Remove from viewed" : "Mark as viewed"}
            >
              <Eye className={`w-5 h-5 ${isViewed ? "fill-current" : ""}`} />
            </motion.button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-xl"
            aria-label="Close modal"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
