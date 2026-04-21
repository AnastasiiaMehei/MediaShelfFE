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
import VideoPage from "./pages/VideoPage";
import ScrollToTop from "./components/ScrollToTop";
import BackButton from "./components/BackButton";


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
        <Route path="/movies" element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} />
        <Route path="/videos" element={<ProtectedRoute><VideoPage /></ProtectedRoute>} />
      </Routes>
      <ScrollToTop />
    </Router>
  );
}
