import { useState, useEffect } from "react";
import {
  getFavoriteBooks,
  getReadBooks,
  addBookToFavorites,
  addBookToRead,
  removeBookFromFavorites,
  removeBookFromRead,
  getBookStatus,
  type BookItem,
  type BookStatus,
} from "../api/booksApi";

export function useFavoriteBooks() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFavoriteBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { status?: number } }).response;
        if (response?.status === 401) {
          return;
        }
      }
      const message = err instanceof Error ? err.message : "Failed to load favorite books";
      setError(message);
      console.error("Error loading favorite books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchFavorites = async () => {
      await loadFavorites();
    };
    fetchFavorites();
  }, []);
  

  const refetch = () => loadFavorites();

  return { books, loading, error, refetch };
}

export function useReadBooks() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRead = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getReadBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { status?: number } }).response;
        if (response?.status === 401) {
          return;
        }
      }
      const message = err instanceof Error ? err.message : "Failed to load read books";
      setError(message);
      console.error("Error loading read books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRead = async () => {
      await loadRead();
    };
    fetchRead();
  }, []);
  
  const refetch = () => loadRead();

  return { books, loading, error, refetch };
}

export function useBookActions() {
  const [loading, setLoading] = useState(false);

  const addToFavorites = async (data: {
    bookId: string;
    title: string;
    author: string;
    coverUrl: string;
    description?: string;
    cover?: File;
  }) => {
    setLoading(true);
    try {
      await addBookToFavorites(data);
      return true;
    } catch (err: unknown) {
      console.error("Error adding book to favorites:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (bookId: string) => {
    setLoading(true);
    try {
      await removeBookFromFavorites(bookId);
      return true;
    } catch (err: unknown) {
      console.error("Error removing book from favorites:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addToRead = async (data: {
    bookId: string;
    title: string;
    author: string;
    coverUrl: string;
    description?: string;
    cover?: File;
  }) => {
    setLoading(true);
    try {
      await addBookToRead(data);
      return true;
    } catch (err: unknown) {
      console.error("Error adding book to read:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromRead = async (bookId: string) => {
    setLoading(true);
    try {
      await removeBookFromRead(bookId);
      return true;
    } catch (err: unknown) {
      console.error("Error removing book from read:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addToFavorites,
    removeFromFavorites,
    addToRead,
    removeFromRead,
  };
}

export function useBookStatus(bookId: string | null) {
  const [status, setStatus] = useState<BookStatus>({ isFavorite: false, isRead: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookId) return;

    async function loadStatus() {
      setLoading(true);
      try {
        const data = await getBookStatus(bookId!);
        setStatus(data);
      } catch (err: unknown) {
        console.error("Error loading book status:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStatus();
  }, [bookId]);

  return { status, loading, setStatus };
}
