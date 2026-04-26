import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { VideoItem } from "../../api/videoApi";

interface VideoItemCardProps {
  video: VideoItem;
}

export default function VideoItemCard({ video }: VideoItemCardProps) {
  const navigate = useNavigate();

  const getCoverUrl = () => {
    if (video.coverUrl) return video.coverUrl;
    return `https://picsum.photos/seed/${video.videoId}/300/200`;
  };

  return (
    <motion.div
      onClick={() => navigate(`/videos/${video.videoId}`)}
      whileHover={{ scale: 1.03 }}
      className="bg-gray-900 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-800 transition"
    >
      <img
        src={getCoverUrl()}
        alt={video.title}
        className="w-full h-64 object-cover rounded-md mb-4"
        onError={(e) => {
          e.currentTarget.src = `https://picsum.photos/seed/${video.videoId}/300/200`;
        }}
      />

      {/* <h3 className="text-xl font-semibold">{video.title}</h3> */}
      {/* {video.duration && (
        <p className="text-gray-400 text-sm">{Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</p>
      )} */}
    </motion.div>
  );
}