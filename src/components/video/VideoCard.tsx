import type { PixabayVideo } from "../../api/videoApi";
import Card from "../ui/Card";

interface Props {
  video: PixabayVideo;
}

export default function VideoCard({ video }: Props) {
  return (
<Card>
  <img
    src={video.videos.large.thumbnail || 'https://via.placeholder.com/300x200?text=Video'}
    alt={video.tags}
    className="w-full h-full object-cover rounded-md"
    onError={(e) => {
      e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Video';
    }}
  />
</Card>
  );
}
