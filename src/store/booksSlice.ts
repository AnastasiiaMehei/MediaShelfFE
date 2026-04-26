import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getFavoriteBooks,
  getReadBooks,
  addBookToFavorites,
  addBookToRead,
  removeBookFromFavorites,
  removeBookFromRead,
  getBookStatus,
  type BookItem,
} from "../api/booksApi";

interface BooksState {
  favorites: BookItem[];
  read: BookItem[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  favorites: [],
  read: [],
  loading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  "books/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFavoriteBooks();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch favorites");
    }
  }
);

export const fetchRead = createAsyncThunk(
  "books/fetchRead",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getReadBooks();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch read books");
    }
  }
);

export const addToFavoritesAsync = createAsyncThunk(
  "books/addToFavorites",
  async (data: Parameters<typeof addBookToFavorites>[0], { rejectWithValue }) => {
    try {
      const result = await addBookToFavorites(data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to add to favorites");
    }
  }
);

export const addToReadAsync = createAsyncThunk(
  "books/addToRead",
  async (data: Parameters<typeof addBookToRead>[0], { rejectWithValue }) => {
    try {
      const result = await addBookToRead(data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to add to read");
    }
  }
);

export const removeFromFavoritesAsync = createAsyncThunk(
  "books/removeFromFavorites",
  async (bookId: string, { rejectWithValue }) => {
    try {
      await removeBookFromFavorites(bookId);
      return bookId;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to remove from favorites");
    }
  }
);

export const removeFromReadAsync = createAsyncThunk(
  "books/removeFromRead",
  async (bookId: string, { rejectWithValue }) => {
    try {
      await removeBookFromRead(bookId);
      return bookId;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to remove from read");
    }
  }
);

export const fetchBookStatus = createAsyncThunk(
  "books/fetchBookStatus",
  async (bookId: string, { rejectWithValue }) => {
    try {
      const data = await getBookStatus(bookId);
      return { bookId, status: data };
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch book status");
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<BookItem[]>) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRead.fulfilled, (state, action: PayloadAction<BookItem[]>) => {
        state.loading = false;
        state.read = action.payload;
      })
      .addCase(fetchRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToFavoritesAsync.fulfilled, (state, action: PayloadAction<BookItem>) => {
        state.favorites.push(action.payload);
      })
      .addCase(addToReadAsync.fulfilled, (state, action: PayloadAction<BookItem>) => {
        state.read.push(action.payload);
      })
      .addCase(removeFromFavoritesAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.favorites = state.favorites.filter((book) => book.bookId !== action.payload);
      })
      .addCase(removeFromReadAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.read = state.read.filter((book) => book.bookId !== action.payload);
      });
  },
});

export const { clearError } = booksSlice.actions;
export default booksSlice.reducer;