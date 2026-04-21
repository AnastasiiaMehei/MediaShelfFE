import axios from "axios";
import type { Book } from "../types/Book";

const BASE_URL = "http://localhost:3000/api/books";

// ===============================
// GET /books/recommend
// ===============================
export const getRecommendedBooks = async (token: string): Promise<Book[]> => {
  const res = await axios.get(`${BASE_URL}/recommend`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // ReadJourney returns: { results: Book[] }
  return res.data.results;
};

// ===============================
// GET /books/:id
// ===============================
export const getBookById = async (
  id: string,
  token: string
): Promise<Book> => {
  const res = await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // ReadJourney returns: { data: Book }
  return res.data;

};
