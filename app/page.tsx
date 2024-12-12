import SearchForm from "@/ui/SearchForm";
import RandomVehicleButton from "./vehicle/[vehicleId]/components/RandomVehicleButton";
import FavoriteStopsList from "./favorites/FavoriteStopsList";
import Footer from "../ui/Footer";

export default function Home() {
  return (
    <main className="flex justify-center w-full -mt-3">
      <div className="flex flex-col max-w-lg">
        {process.env.NODE_ENV === "development" && <RandomVehicleButton />}
        <span className="text-[88px] leading-none text-center">🌁</span>
        <h1 className="text-3xl leading-tight font-extrabold mt-2 mb-1 text-center">
          MUNI On the Go
        </h1>
        <p className="text-center">
          The SF transit app for locals who already know where they&apos;re
          going.
        </p>
        <section className="mt-5">
          <SearchForm />
        </section>
        <FavoriteStopsList />
        <div className="mt-3">
          <Footer />
        </div>
      </div>
    </main>
  );
}
