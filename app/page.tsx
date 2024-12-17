import SearchForm from "@/ui/SearchForm";
import RandomVehicleButton from "./vehicle/[vehicleId]/RandomVehicleButton";
import FavoriteStopsList from "../ui/favorites/FavoriteStopsList";

export default function Home() {
  return (
    <main className="flex justify-center w-full p-2">
      <div className="flex flex-col max-w-lg">
        {process.env.NODE_ENV === "development" && <RandomVehicleButton />}
        <span className="text-[88px] leading-none text-center">🌁</span>
        <h1 className="text-3xl leading-tight font-extrabold mt-3 mb-2 text-center">
          Muni On the Go
        </h1>
        <p className="text-center">
          The SF transit app for locals who already know where they&apos;re
          going.
        </p>
        <section className="mt-5">
          <SearchForm />
        </section>
        <section className="mt-5">
          <FavoriteStopsList />
        </section>
      </div>
    </main>
  );
}
