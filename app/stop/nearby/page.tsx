import DataAttribution from "@/ui/DataAttribution";
import Breadcrumbs from "@/ui/Breadcrumbs";
import fetchStops from "../fetchStops";
import { Metadata } from "next";
import NearbyStopsList from "./NearbyStopsList";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Nearby stops - Muni On the Go`,
    description: `Find your nearest Muni stop`,
  };
}

export default async function Page() {
  const stopsResponse = await fetchStops();

  return (
    <main>
      <header>
        <Breadcrumbs
          links={[
            <span className="-ml-1" key={"a"}>
              🚏
            </span>,
          ]}
        />{" "}
        <div className="flex items-center justify-between mt-3">
          <h1 className="text-xl font-bold">Nearby stops</h1>
        </div>
      </header>

      <section className="my-4">
        <NearbyStopsList
          stops={stopsResponse.Contents.dataObjects.ScheduledStopPoint}
        />
      </section>
      <DataAttribution />
    </main>
  );
}
