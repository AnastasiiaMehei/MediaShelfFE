import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";
import type { RootState } from "./store";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import BackButton from "./components/BackButton";

// Lazy load all pages
const HomePage = lazy(() => import("./pages/HomePage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const BooksPage = lazy(() => import("./pages/BooksPage"));
const BookDetailsPage = lazy(() => import("./pages/BookDetailsPage"));
const ImagesPage = lazy(() => import("./pages/ImagesPage"));
const ImageDetailsPage = lazy(() => import("./pages/ImageDetailsPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const WatchlistMoviesPage = lazy(() => import("./pages/WatchlistMoviesPage"));
const FavoriteMoviesPage = lazy(() => import("./pages/FavoriteMoviesPage"));
const AudioPage = lazy(() => import("./pages/AudioPage"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
const VideoDetailsPage = lazy(() => import("./pages/VideoDetailsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FavoriteBooksPage = lazy(() => import("./pages/FavoriteBooksPage"));
const ReadBooksPage = lazy(() => import("./pages/ReadBooksPage"));
const FavoriteVideosPage = lazy(() => import("./pages/FavoriteVideosPage"));
const ViewedVideosPage = lazy(() => import("./pages/ViewedVideosPage"));
const FavoriteImagesPage = lazy(() => import("./pages/FavoriteImagesPage"));
const ViewedImagesPage = lazy(() => import("./pages/ViewedImagesPage"));


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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<ProtectedUserRoute />} />
          <Route path="/features" element={<ProtectedRoute><FeaturesPage /></ProtectedRoute>} />
          <Route path="/books" element={<ProtectedRoute><BooksPage /></ProtectedRoute>} />
          <Route path="/books/:id" element={<ProtectedRoute><BookDetailsPage /></ProtectedRoute>} />
          <Route path="/books/favorites" element={<ProtectedRoute><FavoriteBooksPage /></ProtectedRoute>} />
          <Route path="/books/read" element={<ProtectedRoute><ReadBooksPage /></ProtectedRoute>} />
          <Route path="/images" element={<ProtectedRoute><ImagesPage /></ProtectedRoute>} />
          <Route path="/images/:id" element={<ProtectedRoute><ImageDetailsPage /></ProtectedRoute>} />
          <Route path="/images/favorites" element={<ProtectedRoute><FavoriteImagesPage /></ProtectedRoute>} />
          <Route path="/images/viewed" element={<ProtectedRoute><ViewedImagesPage /></ProtectedRoute>} />
          <Route path="/audio" element={<ProtectedRoute><AudioPage /></ProtectedRoute>} />
          <Route path="/movies" element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} />
          <Route path="/movies/:id" element={<ProtectedRoute><MovieDetailsPage /></ProtectedRoute>} />
          <Route path="/movies/watchlist" element={<ProtectedRoute><WatchlistMoviesPage /></ProtectedRoute>} />
          <Route path="/movies/favorites" element={<ProtectedRoute><FavoriteMoviesPage /></ProtectedRoute>} />
          <Route path="/videos" element={<ProtectedRoute><VideoPage /></ProtectedRoute>} />
          <Route path="/videos/:id" element={<ProtectedRoute><VideoDetailsPage /></ProtectedRoute>} />
          <Route path="/videos/favorites" element={<ProtectedRoute><FavoriteVideosPage /></ProtectedRoute>} />
          <Route path="/videos/viewed" element={<ProtectedRoute><ViewedVideosPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ScrollToTop />
    </Router>
  );
}
