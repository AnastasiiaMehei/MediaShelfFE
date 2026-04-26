import type { PixabayImage } from "../../types/PixabayImage";
import Card from "../ui/Card";

interface ImageCardProps {
  image: PixabayImage;
  onClick: () => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <Card>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="w-full h-full object-cover rounded-md cursor-pointer"
        onClick={onClick}
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image';
        }}
      />
    </Card>
  );
}
