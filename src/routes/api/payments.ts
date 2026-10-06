import { createFileRoute } from "@tanstack/react-router";
import { db, json } from "@/lib/mockdb.server";

// Simulated payment — no real money moves.
export const Route = createFileRoute("/api/payments")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { bookingId, method } = (await request.json()) as { bookingId?: string; method?: string };
        if (!bookingId || !method) return json({ error: "Data pembayaran tidak lengkap" }, 400);
        await new Promise((r) => setTimeout(r, 1000));
        const b = db.bookings.find((x) => x.id === bookingId);
        if (b) b.status = "confirmed";
        return json({ bookingId, method, status: "paid", paidAt: new Date().toISOString() });
      },
    },
  },
});
