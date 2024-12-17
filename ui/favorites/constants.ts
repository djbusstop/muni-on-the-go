export const FAVORITES_LOCAL_STORAGE_KEY = "motg-favorites";

export interface FavoriteStop {
  name: string;
  id?: string;
  direction?: "IB" | "OB" | string;
}
