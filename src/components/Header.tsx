import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold tracking-wide text-red-600 hover:text-red-500 transition">
        MediaShelf
      </Link>

      <nav className="flex gap-6 text-lg font-medium">
        <Link to="/login" className="hover:text-red-600 transition">Login</Link>
        <Link to="/register" className="hover:text-red-600 transition">Register</Link>
      </nav>
    </header>
  );
}
