import SearchForm from "@/app/_components/SearchForm";
import RandomVehicleButton from "./vehicle/[vehicleId]/components/RandomVehicleButton";

export default function Home() {
  return (
    <main className="flex justify-center text-center w-full">
      <div className="flex flex-col max-w-lg">
        {process.env.NODE_ENV === "development" && <RandomVehicleButton />}
        <span className="text-[88px] leading-none">🌁</span>
        <h1 className="text-3xl leading-tight font-extrabold mt-2 mb-1">
          MUNI On the Go
        </h1>
        <p>
          See the live schedule of the SF MUNI bus or train you&apos;re
          currently riding.
        </p>
        <div className="mt-5">
          <SearchForm />
        </div>
      </div>
    </main>
  );
}
