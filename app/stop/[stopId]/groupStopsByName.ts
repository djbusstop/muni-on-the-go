export const normalizeName = (name: string) => {
  // Normalise names so that all stops at the same junction or place names have the same name
  const nameParts = name
    .split("&")
    .map((part) => part.trim())
    .sort();
  return nameParts.join("& ");
};
/**
 * The key is the stop name, the value is all the stops with that name.
 */
const groupStopsByName = (stops: ScheduledStopPoint[]) => {
  // Hashmap of stops with the same name
  const stopGroupings = stops.reduce(
    (acc: Record<string, { stops: ScheduledStopPoint[] }>, stop) => {
      if (!stop) return acc;
      // Normalise names so that all stops at the same junction or place names have the same name
      const nameKey = normalizeName(stop.Name);
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
export default groupStopsByName;
