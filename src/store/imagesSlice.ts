import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getFavoriteImages,
  getViewedImages,
  addImageToFavorites,
  addImageToViewed,
  removeImageFromFavorites,
  removeImageFromViewed,
  type ImageItem,
} from "../api/pixabayApi";

interface ImagesState {
  favorites: ImageItem[];
  viewed: ImageItem[];
  favoritesLoaded: boolean;
  viewedLoaded: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ImagesState = {
  favorites: [],
  viewed: [],
  favoritesLoaded: false,
  viewedLoaded: false,
  loading: false,
  error: null,
};

interface FetchOptions {
  force?: boolean;
}

export const fetchFavoriteImages = createAsyncThunk<ImageItem[], FetchOptions | void>(
  "images/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFavoriteImages();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch favorite images");
    }
  },
  {
    condition: (options, { getState }) => {
      if (options && typeof options === "object" && options.force) return true;
      const state = getState() as { images: ImagesState };
      return !state.images.favoritesLoaded;
    },
  }
);

export const fetchViewedImages = createAsyncThunk<ImageItem[], FetchOptions | void>(
  "images/fetchViewed",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getViewedImages();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch viewed images");
    }
  },
  {
    condition: (options, { getState }) => {
      if (options && typeof options === "object" && options.force) return true;
      const state = getState() as { images: ImagesState };
      return !state.images.viewedLoaded;
    },
  }
);

export const addToFavoritesImagesAsync = createAsyncThunk(
  "images/addToFavorites",
  async (data: Parameters<typeof addImageToFavorites>[0], { rejectWithValue }) => {
    try {
      const result = await addImageToFavorites(data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to add to favorite images");
    }
  }
);

export const addToViewedImagesAsync = createAsyncThunk(
  "images/addToViewed",
  async (data: Parameters<typeof addImageToViewed>[0], { rejectWithValue }) => {
    try {
      const result = await addImageToViewed(data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to add to viewed images");
    }
  }
);

export const removeFromFavoritesImagesAsync = createAsyncThunk(
  "images/removeFromFavorites",
  async (imageId: string, { rejectWithValue }) => {
    try {
      await removeImageFromFavorites(imageId);
      return imageId;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to remove from favorite images");
    }
  }
);

export const removeFromViewedImagesAsync = createAsyncThunk(
  "images/removeFromViewed",
  async (imageId: string, { rejectWithValue }) => {
    try {
      await removeImageFromViewed(imageId);
      return imageId;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to remove from viewed images");
    }
  }
);

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteImages.fulfilled, (state, action: PayloadAction<ImageItem[]>) => {
        state.loading = false;
        state.favorites = action.payload;
        state.favoritesLoaded = true;
      })
      .addCase(fetchFavoriteImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchViewedImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViewedImages.fulfilled, (state, action: PayloadAction<ImageItem[]>) => {
        state.loading = false;
        state.viewed = action.payload;
        state.viewedLoaded = true;
      })
      .addCase(fetchViewedImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToFavoritesImagesAsync.fulfilled, (state, action: PayloadAction<ImageItem>) => {
        state.favorites.push(action.payload);
      })
      .addCase(addToViewedImagesAsync.fulfilled, (state, action: PayloadAction<ImageItem>) => {
        state.viewed.push(action.payload);
      })
      .addCase(removeFromFavoritesImagesAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.favorites = state.favorites.filter((image) => image.imageId !== action.payload);
      })
      .addCase(removeFromViewedImagesAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.viewed = state.viewed.filter((image) => image.imageId !== action.payload);
      });
  },
});

export const { clearError } = imagesSlice.actions;
export default imagesSlice.reducer;
