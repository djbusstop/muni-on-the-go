"use client";

import useLocalStorage from "@/ui/useLocalStorage";
import { FAVORITES_LOCAL_STORAGE_KEY, FavoriteStop } from "./constants";

const FavoriteStopButton = ({
  currentStop,
}: {
  // Requires Monitored Call
  currentStop: MonitoredVehicleJourney;
}) => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteStop[]>(
    FAVORITES_LOCAL_STORAGE_KEY,
    []
  );

  const isCurrentStopInFavorites = favorites.find(
    (favorite) =>
      favorite.StopPointRef === currentStop.MonitoredCall?.StopPointRef
  );

  const addStopToFavorites = () => {
    // If already in favorites, do nothing
    if (isCurrentStopInFavorites) return;
    if (!currentStop.MonitoredCall) return;
    const favoriteStopObject = {
      DirectionRef: currentStop.DirectionRef,
      StopPointRef: currentStop.MonitoredCall.StopPointRef,
      StopPointName: currentStop.MonitoredCall.StopPointName,
    };
    // Append to list
    setFavorites([...favorites, favoriteStopObject]);
  };

  const removeStopFromFavorites = () => {
    // If not in favorites, do nothing
    if (!isCurrentStopInFavorites) return;
    if (!currentStop.MonitoredCall) return;
    const favoritesWithoutCurrentStop = favorites.filter(
      (existingFavorite) =>
        existingFavorite.StopPointRef !==
        currentStop.MonitoredCall?.StopPointRef
    );
    setFavorites(favoritesWithoutCurrentStop);
  };

  return (
    <button
      aria-label="Save stop as favorite"
      className="text-4xl"
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
