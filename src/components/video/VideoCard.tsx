import type { Video } from "../../types/Video";
import Card from "../ui/Card";

interface Props {
  video: Video;
}

export default function VideoCard({ video }: Props) {
  return (
<Card>
  <video 
    controls 
    className="w-full h-full object-cover rounded-md"
  >
    <source src={video.url} type="video/mp4" />
  </video>
</Card>


  );
}
