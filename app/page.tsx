import SearchForm from "@/app/_components/SearchForm";
import RandomVehicleButton from "./vehicle/[vehicleId]/components/RandomVehicleButton";

export default function Home() {
  return (
    <main className="flex gap-4 flex-col h-[85vh] text-center items-center">
      {process.env.NODE_ENV === "development" && <RandomVehicleButton />}
      <div>
        <span className="text-[88px] leading-none">🌁</span>
        <h1 className="text-4xl leading-tight font-extrabold mt-2">
          MUNI On the Go
        </h1>
        <p>
          See the live schedule of the SF MUNI bus or train you&apos;re
          currently riding.
        </p>
      </div>
      {/* Vertically centered */}
      <div className="flex flex-col flex-grow justify-center items-center w-full max-w-lg">
        <SearchForm />
      </div>
    </main>
  );
}
