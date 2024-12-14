export const FAVORITES_LOCAL_STORAGE_KEY = "motg-favorites";

// {
//   DirectionRef?: string;
//   StopPointRef: string;
//   StopPointName?: string;
// }

export interface FavoriteStop {
  name: string;
  id?: string;
  direction?: "IB" | "OB" | string;
}
