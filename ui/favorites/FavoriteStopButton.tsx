"use client";

import useLocalStorage from "@/lib/useLocalStorage";
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

  console.log(favorites);

  const isCurrentStopInFavorites = favorites.find((favorite) => {
    // Check if stop with id in favorites
    if (favorite.id && stopOptions.id) {
      return favorite.id === stopOptions.id;
    }
    if (!favorite.id && !stopOptions.id) {
      return favorite.name === stopOptions.name;
    }
    return false;
  });

  const addStopToFavorites = () => {
    // If already in favorites, do nothing
    if (isCurrentStopInFavorites) return;

    // Append to list
    setFavorites([...favorites, stopOptions]);
  };

  const removeStopFromFavorites = () => {
    // If not in favorites, do nothing
    if (!isCurrentStopInFavorites) return;

    const favoritesWithoutCurrentStop = favorites.filter((existingFavorite) => {
      return existingFavorite !== isCurrentStopInFavorites;
    });

    setFavorites(favoritesWithoutCurrentStop);
  };

  return (
    <button
      aria-label={
        isCurrentStopInFavorites
          ? "Remove stop from favorites"
          : "Save stop as favorite"
      }
      title={
        isCurrentStopInFavorites
          ? "Remove stop from favorites"
          : "Save stop as favorite"
      }
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
