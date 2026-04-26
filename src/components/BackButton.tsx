import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import IconButton from '@mui/material/IconButton';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1 && location.pathname !== '/');
  }, [location.pathname]);

  const handleBack = () => {
    navigate(-1);
  };

  // const handleForward = () => {
  //   navigate(1);
  // };

  // if (!canGoBack && !canGoForward) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-[90px] left-4 z-40 flex items-center gap-1 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-lg"
      >
        <IconButton
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          disabled={!canGoBack}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 200ms ease',
            color: canGoBack ? 'primary.main' : 'text.disabled',
            boxShadow: canGoBack ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
            '&:hover': {
              backgroundColor: canGoBack ? 'primary.main' : 'transparent',
              color: canGoBack ? 'common.white' : 'text.disabled',
            },
          }}
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </IconButton>

        {/* {canGoForward && (
          <IconButton
            component={motion.button}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleForward}
            className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-sm"
            aria-label="Go forward"
          >
            <ArrowRight className="w-4 h-4" />
          </IconButton>
        )} */}
      </motion.div>
    </AnimatePresence>
  );
}