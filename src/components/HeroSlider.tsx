import { useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/modules/effect-fade.css';

const slides = [
  { x1: '/swiper/hero/bg-blue-x1.png', x2: '/swiper/hero/bg-blue-x2.png', alt: 'blue-screen' },
  { x1: '/swiper/hero/bg-brown-x1.png', x2: '/swiper/hero/bg-brown-x2.png', alt: 'brown-screen' },
  { x1: '/swiper/hero/bg-green-x1.png', x2: '/swiper/hero/bg-green-x2.png', alt: 'green-screen' },
  { x1: '/swiper/hero/bg-red-x1.png', x2: '/swiper/hero/bg-red-x2.png', alt: 'red-screen' },
  { x1: '/swiper/hero/bg-orange-x1.png', x2: '/swiper/hero/bg-orange-x2.png', alt: 'orange-screen' },
  { x1: '/swiper/hero/bg-salat-x1.png', x2: '/swiper/hero/bg-salat-x2.png', alt: 'light-green-screen' },
];
export default function HeroSlider() {
  useEffect(() => {
    new Swiper('.swiper-hero', {
      modules: [Navigation, Autoplay, EffectFade],
      loop: true,
      autoplay: {
        delay: 5000,
      },
      speed: 1000,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      watchSlidesProgress: true,
    });
  }, []);

  return (
    <div className="swiper-hero relative h-screen min-h-[660px] overflow-hidden">
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
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 backdrop-blur-sm bg-black/20">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Welcome to MediaShelf
          </h1>
          <h2 className="text-xl md:text-2xl font-light tracking-wide text-gray-400 mb-4">
  Your hub for movies, audio, books and others
</h2>
<h2 className="text-xl md:text-2xl font-light tracking-wide text-gray-400 mb-6">
  Discover, organize and enjoy your favorite media in one place
</h2>


        </div>
      </div>
    </div>
  );
}
