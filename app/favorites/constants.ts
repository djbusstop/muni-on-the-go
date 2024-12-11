export const FAVORITES_LOCAL_STORAGE_KEY = "motg-favorites";

// {
//   DirectionRef: string;
//   StopPointRef: string;
//   StopPointName: string;
// }
export type FavoriteStop = Pick<MonitoredVehicleJourney, "DirectionRef"> &
  Pick<MonitoredCall, "StopPointRef" | "StopPointName">;
