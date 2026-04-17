import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";

function ProtectedUserRoute() {
  const location = useLocation(); 
  if (location.state?.fromHome) {
    return <UserPage />;
  }
  return <Navigate to="/" replace />;
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
      </Routes>
    </Router>
  );
}
