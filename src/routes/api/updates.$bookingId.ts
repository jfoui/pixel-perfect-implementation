import { createFileRoute } from "@tanstack/react-router";
import { json, updatesFor } from "@/lib/mockdb.server";

export const Route = createFileRoute("/api/updates/$bookingId")({
  server: {
    handlers: {
      GET: async ({ params }) => json(updatesFor(params.bookingId)),
    },
  },
});
