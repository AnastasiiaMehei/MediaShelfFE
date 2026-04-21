import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../store/authSlice";
import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/Button";
import SideNav from "./SideNav";
import { UserInitial } from "./UserInitial";
import { motion } from "framer-motion";
import Text from "./ui/Text";

export default function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const resolveTheme = () => {
      if (theme === "system") {
        return mediaQuery.matches;
      }
      return theme === "dark";
    };

    setIsDark(resolveTheme());

    const handleChange = (event: MediaQueryListEvent) => {
      if (theme === "system") {
        setIsDark(event.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <SideNav handleClose={toggleOpen} isOpen={isOpen} />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`flex items-center justify-between px-4 md:px-8 w-full h-[80px] top-0 bg-white/80 md:dark:border-none border-b dark:bg-black/80 dark:border-b-gray-800 z-20 fixed backdrop-blur-md ${
          scrollY > 150 ? "shadow-sm" : ""
        }`}
      >
        <Link to="/">
          <Text label="MediaShelf" className="text-xl font-bold text-primary" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              {/* FEATURES — ЛІВОРУЧ */}
              <Link
                to="/features"
                className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                to="/images"
                className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors relative group"
              >
                Images
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                to="/music"
                className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors relative group"
              >
                Music
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                to="/videos"
                className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors relative group"
              >
                Videos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                to="/books"
                className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors relative group"
              >
                Books
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
              <Link
                to="/movies"
                className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors relative group"
              >
                Movies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-900 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors relative group"
              >
                Logout
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
              >
                Login
              </Link>

              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800">
            <span>{isDark ? "Dark" : "Light"}</span>
            <input
              id="switcher"
              type="checkbox"
              checked={isDark}
              onChange={() => setTheme(isDark ? "light" : "dark")}
              className="h-5 w-5 rounded-full border border-gray-300 bg-white text-primary shadow-sm focus:ring-primary focus:ring-2"
            />
          </label>
          <UserInitial />

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <CiMenuFries
              onClick={toggleOpen}
              className="h-6 w-6 md:hidden text-gray-600 dark:text-gray-400 cursor-pointer hover:text-primary dark:hover:text-primary transition-colors"
            />
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}
