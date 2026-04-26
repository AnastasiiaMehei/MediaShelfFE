import { useEffect } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { RotateCcw } from "lucide-react";
import { IconButton } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../lib/store/hooks";
import { fetchViewedVideos } from "../store/videosSlice";
import VideoItemCard from "../components/video/VideoItemCard";

export default function ViewedVideosPage() {
  const dispatch = useAppDispatch();
  const { viewed, loading, error } = useAppSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchViewedVideos());
  }, [dispatch]);

  const handleRefetch = () => {
    dispatch(fetchViewedVideos({ force: true }));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 ml-20">
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-red-500"
        >
          My Viewed Videos
        </motion.h1>
        <IconButton
          component={motion.button}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ rotate: 180 }}
          onClick={handleRefetch}
          disabled={loading}
          sx={{
            p: 1,
            backgroundColor: '#ef4444',
            '&:hover': { backgroundColor: '#dc2626' },
            '&:disabled': { opacity: 0.5 },
            borderRadius: '0.5rem',
            transition: 'all 0.2s'
          }}
          title="Refresh viewed videos"
        >
          <RotateCcw className="w-5 h-5" />
        </IconButton>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#ef4444" size={50} />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error}</p>
          <p className="text-gray-500 text-sm mt-2">Please try refreshing the page.</p>
        </div>
      ) : viewed.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Your viewed videos list is empty</p>
          <p className="text-gray-500 text-sm mt-2">Start watching videos from the Videos page!</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {viewed.map((video) => (
            <VideoItemCard key={video._id} video={video} />
          ))}
        </motion.div>
      )}
    </div>
  );
}