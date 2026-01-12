/**
 * Custom hook for managing favorites
 * Provides simple API for adding/removing favorites
 */

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addFavorite, removeFavorite } from "@/store/slices/favoritesSlice";

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      if (isFavorite(id)) {
        dispatch(removeFavorite(id));
      } else {
        dispatch(addFavorite(id));
      }
    },
    [dispatch, isFavorite],
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite: useCallback((id: string) => dispatch(addFavorite(id)), [dispatch]),
    removeFavorite: useCallback((id: string) => dispatch(removeFavorite(id)), [dispatch]),
  };
};
