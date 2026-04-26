import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { Bookmark, Heart } from "lucide-react";
import { Button } from "@mui/material";
import { fetchVideos, type PixabayVideo } from "../api/videoApi";
import VideoCard from "../components/video/VideoCard";
import VideoModal from "../components/video/VideoModal";

export default function VideoPage() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<PixabayVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<PixabayVideo | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        const data = await fetchVideos("nature");
        setVideos(data);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-red-500"
        >
          Videos
        </motion.h1>
        
        <div className="flex gap-3">
          <Button
            component={motion.button}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/videos/viewed")}
            variant="contained"
            sx={{
              backgroundColor: '#2563eb',
              '&:hover': { backgroundColor: '#1d4ed8' },
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              px: 2,
              py: 1,
              borderRadius: '0.5rem',
              fontWeight: 'semibold',
              transition: 'all 0.2s'
            }}
          >
            <Bookmark className="w-5 h-5" />
            Viewed
          </Button>
          <Button
            component={motion.button}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/videos/favorites")}
            variant="contained"
            sx={{
              backgroundColor: '#ca8a04',
              '&:hover': { backgroundColor: '#a16207' },
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              px: 2,
              py: 1,
              borderRadius: '0.5rem',
              fontWeight: 'semibold',
              transition: 'all 0.2s'
            }}
          >
            <Heart className="w-5 h-5" />
            Favorites
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {videos.map((video) => (
            <div key={video.id} onClick={() => setSelectedVideo(video)}>
              <VideoCard video={video} />
            </div>
          ))}
        </motion.div>
      )}

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
