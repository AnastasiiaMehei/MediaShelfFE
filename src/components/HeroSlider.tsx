import { useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

// Import hero images
import bgBlueX1 from '../swiper/hero/bg-blue-x1.png';
import bgBlueX2 from '../swiper/hero/bg-blue-x2.png';
import bgBrownX1 from '../swiper/hero/bg-brown-x1.png';
import bgBrownX2 from '../swiper/hero/bg-brown-x2.png';
import bgGreenX1 from '../swiper/hero/bg-green-x1.png';
import bgGreenX2 from '../swiper/hero/bg-green-x2.png';
import bgOrangeX1 from '../swiper/hero/bg-orange-x1.png';
import bgOrangeX2 from '../swiper/hero/bg-orange-x2.png';
import bgRedX1 from '../swiper/hero/bg-red-x1.png';
import bgRedX2 from '../swiper/hero/bg-red-x2.png';
import bgSalatX1 from '../swiper/hero/bg-salat-x1.png';
import bgSalatX2 from '../swiper/hero/bg-salat-x2.png';

const slides = [
  { x1: bgBlueX1, x2: bgBlueX2, alt: 'blue-screen' },
  { x1: bgBrownX1, x2: bgBrownX2, alt: 'brown-screen' },
  { x1: bgGreenX1, x2: bgGreenX2, alt: 'green-screen' },
  { x1: bgRedX1, x2: bgRedX2, alt: 'red-screen' },
  { x1: bgOrangeX1, x2: bgOrangeX2, alt: 'orange-screen' },
  { x1: bgSalatX1, x2: bgSalatX2, alt: 'light-green-screen' },
];

export default function HeroSlider() {
  useEffect(() => {
    Swiper.use([Navigation, Autoplay]);
    
    new Swiper('.swiper-hero', {
      modules: [Navigation, Autoplay],
      loop: true,
      autoplay: {
        delay: 5000,
        waitForTransition: true,
      },
      speed: 1000,
      direction: 'horizontal',
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
    });
  }, []);

  return (
    <div className="swiper-hero h-screen min-h-[660px] overflow-hidden">
      <div className="swiper-wrapper">
        {slides.map((slide, index) => (
          <div key={index} className="swiper-slide w-full h-full">
            <img
              src={slide.x1}
              srcSet={`${slide.x1} 1x, ${slide.x2} 2x`}
              alt={slide.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
