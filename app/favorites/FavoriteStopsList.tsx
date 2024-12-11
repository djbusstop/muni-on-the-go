"use client";
import useLocalStorage from "@/app/_components/useLocalStorage";
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
      <h2 className="text-2xl font-bold">❤️ Favorites</h2>
      <ul className="mt-2 leading-loose">
        {favorites.map((favoriteStop) => {
          return (
            <li key={favoriteStop.StopPointRef}>
              <Link
                href={`/stop/${favoriteStop.StopPointRef}`}
                className="hover:underline text-xl"
              >
                {favoriteStop.StopPointName} -{" "}
                {favoriteStop.DirectionRef === "OB" ? "Outbound" : "Inbound"}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FavoriteStopsList;
