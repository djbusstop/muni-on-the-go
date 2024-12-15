"use client";
import useLocalStorage from "@/ui/useLocalStorage";
import { FAVORITES_LOCAL_STORAGE_KEY, FavoriteStop } from "./constants";
import Link from "next/link";

const FavoriteStopsList = () => {
  const [favorites] = useLocalStorage<FavoriteStop[]>(
    FAVORITES_LOCAL_STORAGE_KEY,
    []
  );

  if (favorites.length === 0) return null;

  return (
    <>
      <h2 className="text-xl font-bold">❤️ Favorites</h2>
      <ul className="mt-1">
        {favorites.map((favoriteStop, index) => {
          const isIndividualStop = Boolean(favoriteStop.id);

          return (
            <li
              className="mb-1 last:mb-0"
              key={index.toString() + favoriteStop.id}
            >
              <Link
                href={
                  isIndividualStop
                    ? `/stop/${favoriteStop.id}`
                    : `/stop/group/${encodeURIComponent(favoriteStop.name)}`
                }
                className="hover:underline text-lg"
              >
                {favoriteStop.name}
                {isIndividualStop && (
                  // Direction if is individual stop
                  <>
                    {" "}
                    - {favoriteStop.direction === "OB" && "Outbound"}
                    {favoriteStop.direction === "IB" && "Inbound"}
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FavoriteStopsList;
