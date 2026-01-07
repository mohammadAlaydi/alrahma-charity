import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavoritesState = {
  favorites: Record<string, boolean>;
};

const initialState: FavoritesState = {
  favorites: {},
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.favorites[id] = !state.favorites[id];
      // Remove from favorites if it's false
      if (!state.favorites[id]) {
        delete state.favorites[id];
      }
    },
    addFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.favorites[id] = true;
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state.favorites[id];
    },
    clearFavorites(state) {
      state.favorites = {};
    },
  },
});

export const { toggleFavorite, addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

