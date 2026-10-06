import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getHotel } from "@/data/hotels";
import { db, json } from "@/lib/mockdb.server";

const BookingSchema = z
  .object({
    hotelId: z.string(),
    roomId: z.string(),
    petId: z.string().min(1, "Profil hewan belum lengkap"),
    checkIn: z.string(),
    checkOut: z.string(),
    method: z.string(),
  })
  .refine((b) => b.checkOut > b.checkIn, "Tanggal checkout tidak boleh sebelum check-in");

export const Route = createFileRoute("/api/bookings")({
  server: {
    handlers: {
      GET: async () => json(db.bookings),
      POST: async ({ request }) => {
        const parsed = BookingSchema.safeParse(await request.json());
        if (!parsed.success) return json({ error: parsed.error.issues[0].message }, 400);
        const b = parsed.data;
        const room = getHotel(b.hotelId)?.rooms.find((r) => r.id === b.roomId);
        if (!room) return json({ error: "Kamar tidak ditemukan" }, 404);
        const n = Math.round((Date.parse(b.checkOut) - Date.parse(b.checkIn)) / 86400000);
        const seq = String(db.bookings.length + 1).padStart(3, "0");
        const booking = { ...b, id: `PS-DEMO-${seq}-${Date.now().toString(36).slice(-3).toUpperCase()}`, nights: n, total: n * room.price, status: "pending", createdAt: new Date().toISOString() };
        db.bookings.push(booking);
        return json(booking, 201);
      },
    },
  },
});
