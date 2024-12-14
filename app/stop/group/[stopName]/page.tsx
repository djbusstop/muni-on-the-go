import { notFound } from "next/navigation";
import DataAttribution from "@/ui/DataAttribution";
import Link from "next/link";
import Breadcrumbs from "@/ui/Breadcrumbs";
import fetchStops from "../../fetchStops";
import getStopsByName from "../../getStopsByName";

export default async function Page({
  params,
}: {
  params: Promise<{ stopName: string }>;
}) {
  const stopNameSlug = (await params).stopName;
  const stopName = decodeURIComponent(stopNameSlug);

  const stopsResponse = await fetchStops();

  const stops = getStopsByName(
    stopName,
    stopsResponse.Contents.dataObjects.ScheduledStopPoint
  );

  if (stops.length === 0) notFound();

  console.log(stops);

  return (
    <main>
      <header>
        <Breadcrumbs
          links={[
            <span key="stop">Stop</span>,
            <span key={stopName}>{stopName}</span>,
          ]}
        />
        <div className="flex items-center justify-between mt-3">
          <h1 className="text-xl font-bold">
            <Link
              className="hover:underline"
              href={`//maps.apple.com?q=${encodeURIComponent(
                `${stopName}, San Francisco`
              )}`}
            >
              {stopName}
            </Link>
          </h1>
        </div>
      </header>

      <DataAttribution />
    </main>
  );
}
