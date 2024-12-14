"use client";

import useLocalStorage from "@/ui/useLocalStorage";
import { FAVORITES_LOCAL_STORAGE_KEY, FavoriteStop } from "./constants";

const FavoriteStopButton = ({
  stopOptions,
}: {
  // Requires Monitored Call
  stopOptions: FavoriteStop;
}) => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteStop[]>(
    FAVORITES_LOCAL_STORAGE_KEY,
    []
  );

  const isCurrentStopInFavorites = favorites.find(
    (favorite) => favorite.id === stopOptions.id
  );

  const addStopToFavorites = () => {
    // If already in favorites, do nothing
    if (isCurrentStopInFavorites) return;

    // Append to list
    setFavorites([...favorites, stopOptions]);
  };

  const removeStopFromFavorites = () => {
    // If not in favorites, do nothing
    if (!isCurrentStopInFavorites) return;
    const favoritesWithoutCurrentStop = favorites.filter(
      (existingFavorite) => existingFavorite.id !== stopOptions.id
    );
    setFavorites(favoritesWithoutCurrentStop);
  };

  return (
    <button
      aria-label="Save stop as favorite"
      className="text-2xl"
      onClick={() => {
        if (isCurrentStopInFavorites) removeStopFromFavorites();
        else addStopToFavorites();
      }}
    >
      {/* Red if in favorites, white if not */}
      {isCurrentStopInFavorites ? <>❤️</> : <>🤍</>}
    </button>
  );
};
export default FavoriteStopButton;
