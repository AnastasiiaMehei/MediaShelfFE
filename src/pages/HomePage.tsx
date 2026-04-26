import HeroSlider from "../components/HeroSlider";
import Seo from '../components/Seo';

const HomePage: React.FC = () => {
  return (
    <>
      <Seo title="MediaShelf - Organize Your Digital Media" description="Discover and manage your personal media collection. Explore books, movies, videos, images, and audio with MediaShelf." />
      <section className="hero relative">
        <HeroSlider />
      </section>
    </>
  );
};

export default HomePage;
