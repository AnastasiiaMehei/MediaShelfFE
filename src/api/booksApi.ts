import axios from "axios";
import type { Book } from "../types/Book";
import apiClient from "../lib/api/client";

const BOOKS_API_URL = import.meta.env.VITE_BOOKS_API_URL || "http://localhost:3000";

const BASE_URL = `${BOOKS_API_URL}/books`;


export interface BookItem {
  _id: string;
  bookId: string;
  title: string;
  author: string;
  coverUrl?: string;
  rating?: number;
  description?: string;
  isFavorite: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BookStatus {
  isFavorite: boolean;
  isRead: boolean;
}

export const getFavoriteBooks = async (): Promise<BookItem[]> => {
  const res = await apiClient.get('/books/favorites');
  return res.data.data;
};

export const addBookToFavorites = async (data: {
  bookId: string;
  title: string;
  author: string;
  coverUrl?: string;
  rating?: number;
  description?: string;
  cover?: File;
}): Promise<BookItem> => {
  const formData = new FormData();
  formData.append('bookId', data.bookId);
  formData.append('title', data.title);
  formData.append('author', data.author);
  if (data.coverUrl) formData.append('coverUrl', data.coverUrl);
  if (data.rating) formData.append('rating', data.rating.toString());
  if (data.description) formData.append('description', data.description);
  if (data.cover) formData.append('cover', data.cover);

  const res = await apiClient.post('/books/favorites', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const removeBookFromFavorites = async (bookId: string): Promise<void> => {
  await apiClient.delete(`/books/favorites/${bookId}`);
};

export const getReadBooks = async (): Promise<BookItem[]> => {
  const res = await apiClient.get('/books/read');
  return res.data.data;};

export const addBookToRead = async (data: {
  bookId: string;
  title: string;
  author: string;
  coverUrl?: string;
  rating?: number;
  description?: string;
  cover?: File;
}): Promise<BookItem> => {
  const formData = new FormData();
  formData.append('bookId', data.bookId);
  formData.append('title', data.title);
  formData.append('author', data.author);
  if (data.coverUrl) formData.append('coverUrl', data.coverUrl);
  if (data.rating) formData.append('rating', data.rating.toString());
  if (data.description) formData.append('description', data.description);
  if (data.cover) formData.append('cover', data.cover);

  const res = await apiClient.post('/books/read', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const removeBookFromRead = async (bookId: string): Promise<void> => {
  await apiClient.delete(`/books/read/${bookId}`);
};

export const getBookStatus = async (bookId: string): Promise<BookStatus> => {
  const res = await apiClient.get(`/books/${bookId}/status`);
  return res.data;
};

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
  coverUrl: (olBook.cover_id || olBook.covers?.[0]) 
    ? `https://covers.openlibrary.org/b/id/${olBook.cover_id || olBook.covers?.[0]}-M.jpg` 
    : '',
  description: typeof olBook.description === 'string' ? olBook.description : olBook.description?.value || '',
  genre: olBook.subject?.[0] || 'Unknown',
  totalPages: olBook.number_of_pages_median?.toString() || '0',
});


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

  return [];
};

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
