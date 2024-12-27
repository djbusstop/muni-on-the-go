import Breadcrumbs from "@/ui/Breadcrumbs";
import clsx from "clsx";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `About - Muni On the Go`,
  };
}

export default async function Page() {
  return (
    <main className={clsx(["w-full", "flex", "flex-col", "items-center"])}>
      <header className="max-w-lg">
        <div className="flex items-center justify-between mt-3">
          <h1 className="text-xl font-bold">About</h1>
        </div>
      </header>
      <section className="my-3 flex flex-col gap-2 max-w-lg">
        <p>
          Muni On the Go is made by a mysterious train-loving hacker who always
          found apps lacking one specific feature. They thought, &quot;Why
          can&apos;t I easily see the live timetable for the bus I&apos;m
          currently on?&quot; So they made an app to do just that. This app aims
          to help Muni riders do simple things easily: viewing the departures at
          a stop and the live schedule of a vehicle. It compliments other apps
          which do more complicated things like journey planning.
        </p>

        <p>
          The code for Muni On the Go is open source and it&apos;s available on{" "}
          <a
            href="https://github.com/djbusstop/muni-on-the-go"
            className="underline"
          >
            Github
          </a>
          . Please raise an issue if you see a bug, have a feature request, or
          would like to contribute.
        </p>

        <p>
          If you love SF Muni, check out{" "}
          <a href="muniroutle.com" className="underline">
            Muni Routle
          </a>
          , a daily quiz game to test your knowledge of Muni routes.
        </p>
      </section>
    </main>
  );
}
