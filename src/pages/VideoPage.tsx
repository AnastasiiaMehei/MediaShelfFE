import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { fetchVideos } from "../api/videoApi";
import VideoCard from "../components/video/VideoCard";
import VideoModal from "../components/video/VideoModal";
import type { Video } from "../types/Video";

export default function VideoPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        const data = await fetchVideos("nature");
        const mapped = data.map((v) => ({
          id: v.id,
          title: v.tags,
          thumbnail: v.videos.medium.thumbnail,
          url: v.videos.medium.url,
        }));
        setVideos(mapped);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-red-500 mb-6 ml-20"
      >
        Videos
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} onClick={() => setSelectedVideo(video)}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      )}

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
