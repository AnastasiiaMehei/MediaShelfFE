import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@mui/material";

interface ContentErrorProps {
  title?: string;
  message?: string;
  subtext?: string;
  buttonLabel?: string;
}

export default function ContentError({
  title = "Content Not Available",
  message = "We couldn\'t load the content right now.",
  subtext = "Please try again later or return to the home page.",
  buttonLabel = "Go to Home",
}: ContentErrorProps) {
  return (
    <div className="min-h-[44rem] flex flex-col items-center justify-center text-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-gray-400 text-lg mb-3"
        >
          {message}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 mb-8"
        >
          {subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            component={motion.button}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={() => window.location.reload()}
            variant="contained"
            sx={{
              px: 3,
              py: 1.5,
              backgroundColor: '#ef4444',
              '&:hover': { backgroundColor: '#dc2626' },
              borderRadius: '0.5rem',
              fontWeight: 'semibold',
              transition: 'all 0.2s'
            }}
          >
            Retry
          </Button>
          <Button
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            variant="outlined"
            sx={{
              px: 3,
              py: 1.5,
              borderColor: '#374151',
              color: 'white',
              '&:hover': { 
                backgroundColor: '#374151',
                borderColor: '#4b5563'
              },
              borderRadius: '0.5rem',
              fontWeight: 'semibold',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              justifyContent: 'center'
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Home className="w-5 h-5" />
              {buttonLabel}
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
