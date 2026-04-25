import { motion } from "framer-motion";
import { Music, Video, BookOpen, Film, Image, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { booksAuthService } from "../services/booksAuth.service";
import toast from "react-hot-toast";

const categories = [
  {
    name: "Images",
    items: [
      { 
        title: "Image Gallery", 
        description: "Browse and manage your images.", 
        icon: <Image className="h-6 w-6" />,
        link: "/images"
      },
      { 
        title: "Go to Image Gallery", 
        description: null, 
        link: "/images"
      }
    ]
  },  
  {
    name: "Audio",
    items: [
      { 
        title: "Discover Tracks", 
        description: "Explore trending songs and curated playlists.", 
        icon: <Music className="h-6 w-6" />,
        link: "/audio"  
      },
      { 
        title: "Go to Audio Gallery", 
        description: null, 
        link: "/audio"  
      }
    ]
  },
  {
    name: "Video",
    items: [
      { 
        title: "Stream Videos", 
        description: "Watch the latest clips and shows instantly.", 
        icon: <Video className="h-6 w-6" />, 
        link: "/video"  
      },
      { 
        title: "Go to Video Gallery", 
        description: null, 
        link: "/video"   
      }
    ]
  },
  {
    name: "Books",
    items: [
      { 
        title: "Digital Library", 
        description: "Access thousands of e-books anytime.", 
        icon: <BookOpen className="h-6 w-6" />,
        link: "/books"
      },
      { 
        title: "Go to Books Gallery", 
        description: null, 
        link: "/books"
      }
    ]
  },
  {
    name: "Movies",
    items: [
      { 
        title: "Latest Releases", 
        description: "Stay updated with new movie premieres.", 
        icon: <Film className="h-6 w-6" />,
        link: "/movies"  
      },
      { 
        title: "Go to Movies Gallery", 
        description: null, 
        link: "/movies"  
      }
    ]
  }
];

export default function FeaturesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBooksClick = async () => {
    try {
      const data = await booksAuthService.autoLogin();
      dispatch(
        setCredentials({
          user: { email: data.email, name: data.name },
          accessToken: data.token,
          refreshToken: data.refreshToken,
        })
      );
      navigate("/books");
    } catch (err) {
      console.error("Books backend login failed:", err);
      toast.error("Failed to connect to Books service. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <section className="pt-20 pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-red-500 mb-6"
        >
          Features
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore categories: Music, Video, Books, and Movies.
        </p>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {categories.map((category, idx) => (
            <div key={idx} className="mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-red-500 mb-8"
              >
                {category.name}
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-8">
                {category.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`p-6 rounded-lg shadow transition-shadow border
                      ${item.description 
                        ? "bg-white dark:bg-primary text-gray-900 dark:text-white border-gray-200 dark:border-none hover:shadow-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-primary/90" 
                        : "bg-transparent border-red-500 text-red-500 flex flex-col items-center justify-center"}`
                    }
                  >
                    {item.description ? (
                      <div className="flex items-start gap-4">
                        <div className="text-primary dark:text-white p-2 bg-primary/10 dark:bg-white/20 rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-200">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                        <button
                          onClick={() =>
                            item.link === "/books" ? handleBooksClick() : navigate(item.link)
                          }
                          className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition flex items-center gap-2"
                        >
                          Go <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
