import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { Heart, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../lib/store/hooks";
import { addToFavoritesVideosAsync, addToViewedVideosAsync, removeFromFavoritesVideosAsync, removeFromViewedVideosAsync, fetchFavoritesVideos, fetchViewedVideos } from "../store/videosSlice";
import type { PixabayVideo } from "../api/videoApi";

export default function VideoDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { favorites, viewed } = useAppSelector((state) => state.videos);

  const [video, setVideo] = useState<PixabayVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionsLoading, setActionsLoading] = useState(false);

  const isFavorite = favorites.some((v) => v.videoId === id);
  const isViewed = viewed.some((v) => v.videoId === id);

  useEffect(() => {
    if (!id) return;

    const mockVideo: PixabayVideo = {
      id: parseInt(id),
      pageURL: `https://pixabay.com/videos/${id}/`,
      type: "film",
      tags: `Video ${id}`,
      duration: 60 + Math.floor(Math.random() * 300), // 1-5 minutes
      videos: {
        large: { 
          url: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`, 
          thumbnail: `https://picsum.photos/640/360?random=${id}` 
        },
        medium: { 
          url: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`, 
          thumbnail: `https://picsum.photos/640/360?random=${id}` 
        },
        small: { 
          url: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`, 
          thumbnail: `https://picsum.photos/320/180?random=${id}` 
        },
        tiny: { 
          url: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`, 
          thumbnail: `https://picsum.photos/160/90?random=${id}` 
        },
      },
      views: Math.floor(Math.random() * 10000),
      downloads: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 500),
      user: "Sample User",
      userImageURL: ""
    };

    setVideo(mockVideo);
    dispatch(fetchFavoritesVideos());
    dispatch(fetchViewedVideos());
    setLoading(false);
  }, [id, dispatch]);

  const handleFavoriteToggle = async () => {
    if (!video || actionsLoading) return;
    setActionsLoading(true);
    try {
      if (isFavorite) {
        await dispatch(removeFromFavoritesVideosAsync(video.id.toString())).unwrap();
        toast.success("Removed from favorites");
      } else {
        await dispatch(addToFavoritesVideosAsync({
          videoId: video.id.toString(),
          title: video.tags,
          videoUrl: video.videos.large.url,
          coverUrl: video.videos.large.thumbnail,
          description: video.tags,
          duration: video.duration,
        })).unwrap();
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast.error("Failed to update favorites");
    } finally {
      setActionsLoading(false);
    }
  };

  const handleViewedToggle = async () => {
    if (!video || actionsLoading) return;
    setActionsLoading(true);
    try {
      if (isViewed) {
        await dispatch(removeFromViewedVideosAsync(video.id.toString())).unwrap();
        toast.success("Removed from viewed");
      } else {
        await dispatch(addToViewedVideosAsync({
          videoId: video.id.toString(),
          title: video.tags,
          videoUrl: video.videos.large.url,
          coverUrl: video.videos.large.thumbnail,
          description: video.tags,
          duration: video.duration,
        })).unwrap();
        toast.success("Added to viewed");
      }
    } catch (error) {
      console.error("Error updating viewed:", error);
      toast.error("Failed to update viewed");
    } finally {
      setActionsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <ClipLoader color="#ef4444" size={50} />
      </div>
    );
  }

  if (!video) {
    return (
      <p className="text-red-500 pt-24 px-6">
        Video not found or failed to load.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-red-500 mb-6"
      >
        Video Details
      </motion.h1>

      <div className="flex gap-10">
        <video
          controls
          className="max-w-lg max-h-96 object-cover rounded-lg"
          poster={video.videos.large.thumbnail || undefined}
        >
          <source src={video.videos.large.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="flex-1">
          <p className="text-xl mb-4">Tags: {video.tags}</p>
          <p className="text-gray-300">Duration: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</p>
          <p className="text-gray-300">Views: {video.views.toLocaleString()}</p>
          <p className="text-gray-300">Downloads: {video.downloads.toLocaleString()}</p>
          <p className="text-gray-300">Likes: {video.likes.toLocaleString()}</p>

          <div className="flex gap-4 flex-wrap mt-6">
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewedToggle}
              disabled={actionsLoading}
              variant="contained"
              startIcon={<Eye className="w-5 h-5" />}
              sx={{
                px: 3,
                py: 1.5,
                backgroundColor: isViewed ? '#2563eb' : '#374151',
                '&:hover': { 
                  backgroundColor: isViewed ? '#1d4ed8' : '#4b5563'
                },
                '&:disabled': { opacity: 0.5 },
                borderRadius: '0.5rem',
                fontWeight: 'semibold',
                transition: 'all 0.2s'
              }}
            >
              {actionsLoading ? "Loading..." : isViewed ? "✓ Viewed" : "Mark as Viewed"}
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFavoriteToggle}
              disabled={actionsLoading}
              variant="contained"
              startIcon={<Heart className="w-5 h-5" />}
              sx={{
                px: 3,
                py: 1.5,
                backgroundColor: isFavorite ? '#eab308' : '#374151',
                '&:hover': { 
                  backgroundColor: isFavorite ? '#ca8a04' : '#4b5563'
                },
                '&:disabled': { opacity: 0.5 },
                borderRadius: '0.5rem',
                fontWeight: 'semibold',
                transition: 'all 0.2s'
              }}
            >
              {actionsLoading ? "Loading..." : isFavorite ? "★ Favorited" : "Add to Favorites"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}