import { createFileRoute } from "@tanstack/react-router";
import { getHotel } from "@/data/hotels";
import { json } from "@/lib/mockdb.server";

export const Route = createFileRoute("/api/hotels/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const h = getHotel(params.id);
        return h ? json(h) : json({ error: "Hotel tidak ditemukan" }, 404);
      },
    },
  },
});
