import { HOTELS, type Facility, type Hotel, type RoomSize, type Species } from "@/data/hotels";

export type SortKey = "terdekat" | "harga" | "rating";
export interface Filters {
  q: string;
  species: Species | "semua";
  maxPrice: number;
  minRating: number;
  maxDistance: number;
  facilities: Facility[];
  size: RoomSize | "semua";
  sort: SortKey;
}

export const DEFAULT_FILTERS: Filters = {
  q: "",
  species: "semua",
  maxPrice: 500000,
  minRating: 0,
  maxDistance: 20,
  facilities: [],
  size: "semua",
  sort: "terdekat",
};

export function filterHotels(f: Filters, list: Hotel[] = HOTELS): Hotel[] {
  const q = f.q.trim().toLowerCase();
  return list
    .filter((h) => {
      if (q && !`${h.name} ${h.area} ${h.city}`.toLowerCase().includes(q)) return false;
      const rooms = h.rooms.filter(
        (r) =>
          (f.species === "semua" || r.species.includes(f.species)) &&
          (f.size === "semua" || r.size === f.size) &&
          r.price <= f.maxPrice,
      );
      if (rooms.length === 0) return false;
      if (h.rating < f.minRating) return false;
      if (h.distanceKm > f.maxDistance) return false;
      return f.facilities.every((x) => h.facilities.includes(x));
    })
    .sort((a, b) =>
      f.sort === "harga" ? a.priceFrom - b.priceFrom : f.sort === "rating" ? b.rating - a.rating : a.distanceKm - b.distanceKm,
    );
}
