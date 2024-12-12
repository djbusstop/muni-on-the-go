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
    <section className="mt-7">
      <h2 className="text-xl font-bold">❤️ Favorites</h2>
      <ul className="mt-3">
        {favorites.map((favoriteStop) => {
          return (
            <li className="mb-2" key={favoriteStop.StopPointRef}>
              <Link
                href={`/stop/${favoriteStop.StopPointRef}`}
                className="hover:underline text-lg"
              >
                {favoriteStop.StopPointName} -{" "}
                {favoriteStop.DirectionRef === "OB" && "Outbound"}
                {favoriteStop.DirectionRef === "IB" && "Inbound"}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FavoriteStopsList;
