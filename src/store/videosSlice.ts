import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getFavoriteVideos,
  getViewedVideos,
  addVideoToFavorites,
  addVideoToViewed,
  removeVideoFromFavorites,
  removeVideoFromViewed,
  type VideoItem,
} from "../api/videoApi";

interface VideosState {
  favorites: VideoItem[];
  viewed: VideoItem[];
  favoritesLoaded: boolean;
  viewedLoaded: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: VideosState = {
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

export const fetchFavoritesVideos = createAsyncThunk<VideoItem[], FetchOptions | void>(
  "videos/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFavoriteVideos();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch favorite videos");
    }
  }
  ,
  {
    condition: (options, { getState }) => {
      if (options && typeof options === "object" && options.force) return true;
      const state = getState() as { videos: VideosState };
      return !state.videos.favoritesLoaded;
    },
  }
);

export const fetchViewedVideos = createAsyncThunk<VideoItem[], FetchOptions | void>(
  "videos/fetchViewed",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getViewedVideos();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch viewed videos");
    }
  }
  ,
  {
    condition: (options, { getState }) => {
      if (options && typeof options === "object" && options.force) return true;
      const state = getState() as { videos: VideosState };
      return !state.videos.viewedLoaded;
    },
  }
);

export const addToFavoritesVideosAsync = createAsyncThunk(
  "videos/addToFavorites",
  async (data: Parameters<typeof addVideoToFavorites>[0], { rejectWithValue }) => {
    try {
      const result = await addVideoToFavorites(data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to add to favorites");
    }
  }
);

export const addToViewedVideosAsync = createAsyncThunk(
  "videos/addToViewed",
  async (data: Parameters<typeof addVideoToViewed>[0], { rejectWithValue }) => {
    try {
      const result = await addVideoToViewed(data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to add to viewed");
    }
  }
);

export const removeFromFavoritesVideosAsync = createAsyncThunk(
  "videos/removeFromFavorites",
  async (videoId: string, { rejectWithValue }) => {
    try {
      await removeVideoFromFavorites(videoId);
      return videoId;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to remove from favorites");
    }
  }
);

export const removeFromViewedVideosAsync = createAsyncThunk(
  "videos/removeFromViewed",
  async (videoId: string, { rejectWithValue }) => {
    try {
      await removeVideoFromViewed(videoId);
      return videoId;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to remove from viewed");
    }
  }
);

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoritesVideos.fulfilled, (state, action: PayloadAction<VideoItem[]>) => {
        state.loading = false;
        state.favorites = action.payload;
        state.favoritesLoaded = true;
      })
      .addCase(fetchFavoritesVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchViewedVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchViewedVideos.fulfilled, (state, action: PayloadAction<VideoItem[]>) => {
        state.loading = false;
        state.viewed = action.payload;
        state.viewedLoaded = true;
      })
      .addCase(fetchViewedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToFavoritesVideosAsync.fulfilled, (state, action: PayloadAction<VideoItem>) => {
        state.favorites.push(action.payload);
      })
      .addCase(addToViewedVideosAsync.fulfilled, (state, action: PayloadAction<VideoItem>) => {
        state.viewed.push(action.payload);
      })
      .addCase(removeFromFavoritesVideosAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.favorites = state.favorites.filter((video) => video.videoId !== action.payload);
      })
      .addCase(removeFromViewedVideosAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.viewed = state.viewed.filter((video) => video.videoId !== action.payload);
      });
  },
});

export const { clearError } = videosSlice.actions;
export default videosSlice.reducer;