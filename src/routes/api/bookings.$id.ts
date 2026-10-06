import { createFileRoute } from "@tanstack/react-router";
import { db, json } from "@/lib/mockdb.server";

export const Route = createFileRoute("/api/bookings/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const b = db.bookings.find((x) => x.id === params.id);
        return b ? json(b) : json({ error: "Pesanan tidak ditemukan" }, 404);
      },
    },
  },
});
