import React from "react";
import { motion } from "framer-motion";
import { Music, Video, BookOpen, Film } from "lucide-react";

const categories = [
  {
    name: "Music",
    items: [
      { title: "Discover Tracks", description: "Explore trending songs and curated playlists.", icon: <Music className="h-6 w-6" /> },
      { title: "Personal Library", description: "Organize your favorite albums and artists.", icon: <Music className="h-6 w-6" /> }
    ]
  },
  {
    name: "Video",
    items: [
      { title: "Stream Videos", description: "Watch the latest clips and shows instantly.", icon: <Video className="h-6 w-6" /> },
      { title: "Create Playlists", description: "Build collections of your favorite videos.", icon: <Video className="h-6 w-6" /> }
    ]
  },
  {
    name: "Books",
    items: [
      { title: "Digital Library", description: "Access thousands of e‑books anytime.", icon: <BookOpen className="h-6 w-6" /> },
      { title: "Reading Lists", description: "Save and organize books you want to read.", icon: <BookOpen className="h-6 w-6" /> }
    ]
  },
  {
    name: "Movies",
    items: [
      { title: "Latest Releases", description: "Stay updated with new movie premieres.", icon: <Film className="h-6 w-6" /> },
      { title: "Favorites", description: "Bookmark and rewatch your favorite films.", icon: <Film className="h-6 w-6" /> }
    ]
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-20 pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-red-600 mb-4"
        >
          Features
        </motion.h1>
        <p className="text-lg text-gray-400">
          Explore categories: Music, Video, Books, and Movies.
        </p>
      </section>

      {/* Categories Grid */}
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
                    className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-red-500 p-2 bg-red-500/10 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
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
