import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { Heart, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "../lib/store/hooks";
import {
  addToFavoritesImagesAsync,
  addToViewedImagesAsync,
  removeFromFavoritesImagesAsync,
  removeFromViewedImagesAsync,
  fetchFavoriteImages,
  fetchViewedImages,
} from "../store/imagesSlice";
import type { PixabayImage } from "../types/PixabayImage";

export default function ImageDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const [image, setImage] = useState<PixabayImage | null>(null);
  const [loading, setLoading] = useState(true);
  const { favorites, viewed } = useAppSelector((state) => state.images);
  const isFavorite = Boolean(id && favorites.some((img) => img.imageId === id));
  const isViewed = Boolean(id && viewed.some((img) => img.imageId === id));
  const [actionsLoading, setActionsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const mockImage: PixabayImage = {
      id: parseInt(id),
      pageURL: `https://pixabay.com/photos/${id}/`,
      type: "photo",
      tags: `Image ${id}`,
      previewURL: `https://picsum.photos/150/150?random=${id}`,
      previewWidth: 150,
      previewHeight: 150,
      webformatURL: `https://picsum.photos/800/600?random=${id}`,
      webformatWidth: 800,
      webformatHeight: 600,
      largeImageURL: `https://picsum.photos/1200/800?random=${id}`,
      imageWidth: 1200,
      imageHeight: 800,
      imageSize: 500000,
      views: Math.floor(Math.random() * 10000),
      downloads: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 50),
      user_id: 1,
      user: "Sample User",
      userImageURL: ""
    };

    setImage(mockImage);
    dispatch(fetchFavoriteImages());
    dispatch(fetchViewedImages());
    setLoading(false);
  }, [id, dispatch]);

  const handleFavoriteToggle = async () => {
    if (!image || actionsLoading) return;
    setActionsLoading(true);
    try {
      if (favorites.some((img) => img.imageId === id)) {
        await dispatch(removeFromFavoritesImagesAsync(image.id.toString())).unwrap();
        toast.success("Removed from favorites");
      } else {
        await dispatch(addToFavoritesImagesAsync({
          imageId: image.id.toString(),
          title: image.tags,
          imageUrl: image.largeImageURL,
          description: image.tags,
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
    if (!image || actionsLoading) return;
    setActionsLoading(true);
    try {
      if (viewed.some((img) => img.imageId === id)) {
        await dispatch(removeFromViewedImagesAsync(image.id.toString())).unwrap();
        toast.success("Removed from viewed");
      } else {
        await dispatch(addToViewedImagesAsync({
          imageId: image.id.toString(),
          title: image.tags,
          imageUrl: image.largeImageURL,
          description: image.tags,
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

  if (!image) {
    return (
      <p className="text-red-500 pt-24 px-6">
        Image not found or failed to load.
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
        Image Details
      </motion.h1>

      <div className="flex gap-10">
        <img
          src={image.largeImageURL}
          alt={image.tags}
          className="max-w-lg max-h-96 object-cover rounded-lg"
        />

        <div className="flex-1">
          <p className="text-xl mb-4">Tags: {image.tags}</p>
          <p className="text-gray-300">Dimensions: {image.imageWidth} x {image.imageHeight}</p>
          <p className="text-gray-300">Views: {image.views.toLocaleString()}</p>
          <p className="text-gray-300">Downloads: {image.downloads.toLocaleString()}</p>
          <p className="text-gray-300">Likes: {image.likes.toLocaleString()}</p>

          <div className="flex gap-4 flex-wrap mt-6">
            <button
              onClick={handleViewedToggle}
              disabled={actionsLoading}
              className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                isViewed
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-800 hover:bg-gray-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Eye className="w-5 h-5" />
              {actionsLoading ? "Loading..." : isViewed ? "✓ Viewed" : "Mark as Viewed"}
            </button>
            <button
              onClick={handleFavoriteToggle}
              disabled={actionsLoading}
              className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                isFavorite
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-800 hover:bg-gray-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Heart className="w-5 h-5" />
              {actionsLoading ? "Loading..." : isFavorite ? "★ Favorited" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}