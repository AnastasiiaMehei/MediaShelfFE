import axios from "axios";
import type { Book } from "../types/Book";

const BOOKS_API_URL = import.meta.env.VITE_BOOKS_API_URL || "http://localhost:3000";

const BASE_URL = `${BOOKS_API_URL}/books`;

interface OpenLibraryBook {
  key: string;
  title: string;
  authors?: { name: string }[];
  first_publish_year?: number;
  cover_id?: number;
  covers?: number[];
  subject?: string[];
  number_of_pages_median?: number;
  description?: string | { value: string };
}

interface OpenLibraryResponse {
  works: OpenLibraryBook[];
}

const convertOpenLibraryBookToBook = (olBook: OpenLibraryBook): Book => ({
  _id: olBook.key.replace('/works/', ''),
  title: olBook.title,
  author: olBook.authors?.[0]?.name || 'Unknown Author',
  imageUrl: (olBook.cover_id || olBook.covers?.[0]) ? `https://covers.openlibrary.org/b/id/${olBook.cover_id || olBook.covers?.[0]}-M.jpg` : '',
  description: typeof olBook.description === 'string' ? olBook.description : olBook.description?.value || '',
  genre: olBook.subject?.[0] || 'Unknown',
  totalPages: olBook.number_of_pages_median?.toString() || '0',
});

// ===============================
export const getRecommendedBooks = async (token?: string): Promise<Book[]> => {
  if (token) {
    try {
      const res = await axios.get(`${BASE_URL}/recommend`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.results;
    } catch (error) {
      console.warn('Original books API failed, trying fallbacks...');
    }
  }

  // Fallback to Open Library API (no API key required!)
  try {
    const res = await axios.get<OpenLibraryResponse>(
      'https://openlibrary.org/subjects/fiction.json?limit=20'
    );

    if (res.data.works) {
      return res.data.works.map(convertOpenLibraryBookToBook);
    }
  } catch (error) {
    console.error('All book APIs failed:', error);
  }

  // Final fallback - return empty array
  return [];
};

// ===============================
// GET /books/:id (with multiple fallbacks)
// ===============================
export const getBookById = async (
  id: string,
  token?: string
): Promise<Book> => {
  if (token && BOOKS_API_URL.includes('mediashelfbe')) {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      console.warn('Original books API failed for book details, trying fallbacks...');
    }
  }

  try {
    const res = await axios.get<OpenLibraryBook>(
      `https://openlibrary.org/works/${id}.json`
    );

    return convertOpenLibraryBookToBook(res.data);
  } catch (error) {
    console.error('All book detail APIs failed:', error);
    throw new Error('Failed to load book details from any available API');
  }
};
