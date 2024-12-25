import { notFound } from "next/navigation";
import fetchVehicleMonitoring, {
  getStops,
  getVehicleJourney,
} from "../fetchVehicleMonitoring";
import DataAttribution from "@/ui/DataAttribution";
import Link from "next/link";
import Breadcrumbs from "@/ui/Breadcrumbs";
import Alert from "@/ui/Alert";
import OnwardCallList from "./OnwardCallList";
import RouteDisplay from "@/ui/RouteDisplay";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vehicleId: string }>;
}): Promise<Metadata> {
  const vehicleId = (await params).vehicleId;

  return {
    title: `Vehicle #${vehicleId} - Muni On the Go`,
    description: `Live journey monitoring for vehicle #${vehicleId}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ vehicleId: string }>;
  searchParams: Promise<{ boardingAt?: string }>;
}) {
  const vehicleIdSlug = (await params).vehicleId;
  const boardingStopId = (await searchParams).boardingAt;

  // Parse vehicle ID to number
  const vehicleId = parseInt(vehicleIdSlug);
  if (isNaN(vehicleId)) notFound();

  const vehicleMonitoringResponse = await fetchVehicleMonitoring(vehicleId);
  const vehicleJourney = getVehicleJourney(vehicleMonitoringResponse);

  if (!vehicleJourney) notFound();

  const stops = getStops(vehicleJourney);

  return (
    <main>
      <header>
        <Breadcrumbs links={[<span key={vehicleId}>🚌</span>]} />

        <h1 className="text-xl font-bold mt-3">
          <RouteDisplay route={vehicleJourney.LineRef} />{" "}
          {vehicleJourney.PublishedLineName}
        </h1>
        {vehicleJourney.DestinationRef && (
          <h2 className="text-md">
            to{" "}
            <Link
              href={`/stop/${vehicleJourney.DestinationRef}`}
              className="hover:underline"
            >
              {vehicleJourney.DestinationName}
            </Link>
          </h2>
        )}
      </header>

      <section className="my-3">
        {stops.length ? (
          <OnwardCallList
            onwardCalls={stops}
            vehicleId={vehicleId}
            boardingStopId={boardingStopId}
          />
        ) : (
          <Alert label="Tracking is not available. Refresh to try again." />
        )}
      </section>
      <DataAttribution />
    </main>
  );
}
