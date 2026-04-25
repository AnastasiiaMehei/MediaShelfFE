import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import FeaturesPage from "./pages/FeaturesPage";
import BooksPage from "./pages/BooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import ImagesPage from "./pages/ImagesPage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import WatchlistMoviesPage from "./pages/WatchlistMoviesPage";
import FavoriteMoviesPage from "./pages/FavoriteMoviesPage";
import AudioPage from "./pages/AudioPage";
import VideoPage from "./pages/VideoPage";
import ScrollToTop from "./components/ScrollToTop";
import BackButton from "./components/BackButton";
import NotFound from "./pages/NotFound";


import "./App.css";
function ProtectedUserRoute() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return <UserPage />;
  }
  return <Navigate to="/login" replace />;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Header />
       <BackButton /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<ProtectedUserRoute />} />
        <Route path="/features" element={<ProtectedRoute><FeaturesPage /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><BooksPage /></ProtectedRoute>} />
        <Route path="/books/:id" element={<ProtectedRoute><BookDetailsPage /></ProtectedRoute>} />
        <Route path="/images" element={<ProtectedRoute><ImagesPage /></ProtectedRoute>} />
        <Route path="/audio" element={<ProtectedRoute><AudioPage /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} />
        <Route path="/movies/:id" element={<ProtectedRoute><MovieDetailsPage /></ProtectedRoute>} />
        <Route path="/movies/watchlist" element={<ProtectedRoute><WatchlistMoviesPage /></ProtectedRoute>} />
        <Route path="/movies/favorites" element={<ProtectedRoute><FavoriteMoviesPage /></ProtectedRoute>} />
        <Route path="/videos" element={<ProtectedRoute><VideoPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </Router>
  );
}
