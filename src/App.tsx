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


import "./App.css";
function ProtectedUserRoute() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return <UserPage />;
  }
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<ProtectedUserRoute />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetailsPage />} />        
        <Route path="/images" element={<ImagesPage />} />
      </Routes>
    </Router>
  );
}
