/**
 * Normalise the stops name so that all stops at the same junction have the same name.
 */
export const normalizeStopName = (name: string) => {
  const nameParts = name
    .split("&")
    .map((part) => part.trim())
    .sort();
  return nameParts.join(" & ");
};

/**
 * The key is the stop name, the value is all the stops with that name.
 */
export const groupStopsByName = (stops: ScheduledStopPoint[]) => {
  // Hashmap of stops with the same name
  const stopGroupings = stops.reduce(
    (acc: Record<string, { stops: ScheduledStopPoint[] }>, stop) => {
      if (!stop) return acc;
      // Normalise names so that all stops at the same junction or place names have the same name
      const nameKey = normalizeStopName(stop.Name);
      if (nameKey in acc) {
        // Add stop to list of existing stops
        return {
          ...acc,
          [nameKey]: {
            ...acc[nameKey],
            stops: [...acc[nameKey].stops, stop],
          },
        };
      }
      // Create entry for list of stops
      return {
        ...acc,
        [nameKey]: {
          stops: [stop],
        },
      };
    },
    {}
  );
  return stopGroupings;
};

/**
 * Return all stops with the same normalised name, optinally excluding the provided stop IDs
 */
const getStopsByName = (
  normalizedStopName: string,
  allStops: ScheduledStopPoint[],
  options?: { exclude?: string[] }
) => {
  const groupedStops = groupStopsByName(allStops);
  if (normalizedStopName in groupedStops) {
    const stopsWithSameName = groupedStops[normalizedStopName].stops;
    if (options?.exclude) {
      return stopsWithSameName.filter(
        (stop) => !options.exclude?.includes(stop.id)
      );
    }
    return stopsWithSameName;
  }
  return [];
};

export default getStopsByName;
