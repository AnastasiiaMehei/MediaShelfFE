import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { IconButton } from '@mui/material';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <IconButton
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 48,
        height: 48,
        backgroundColor: '#ef4444',
        color: 'white',
        borderRadius: '50%',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: '#dc2626',
          transform: isVisible ? 'scale(1.1)' : 'scale(0)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        zIndex: 40,
      }}
      aria-label="Scroll to top"
    >
      <ChevronUp />
    </IconButton>
  );
}