import { createFileRoute } from "@tanstack/react-router";
import { DEFAULT_FILTERS, filterHotels, type Filters } from "@/lib/search";
import { json } from "@/lib/mockdb.server";

export const Route = createFileRoute("/api/hotels")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const p = new URL(request.url).searchParams;
        const f: Filters = {
          ...DEFAULT_FILTERS,
          q: p.get("q") ?? "",
          species: (p.get("species") as Filters["species"]) ?? "semua",
          maxPrice: Number(p.get("maxPrice") ?? DEFAULT_FILTERS.maxPrice),
          minRating: Number(p.get("minRating") ?? 0),
          facilities: (p.get("facilities")?.split(",").filter(Boolean) ?? []) as Filters["facilities"],
          sort: (p.get("sort") as Filters["sort"]) ?? "terdekat",
        };
        return json(filterHotels(f));
      },
    },
  },
});
