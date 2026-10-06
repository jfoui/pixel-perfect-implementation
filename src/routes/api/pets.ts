import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { db, json } from "@/lib/mockdb.server";

const PetSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Nama hewan wajib diisi"),
  species: z.enum(["anjing", "kucing"]),
  weight: z.number().positive("Berat harus angka"),
}).passthrough();

export const Route = createFileRoute("/api/pets")({
  server: {
    handlers: {
      GET: async () => json(db.pets),
      POST: async ({ request }) => {
        const parsed = PetSchema.safeParse(await request.json());
        if (!parsed.success) return json({ error: parsed.error.issues[0].message }, 400);
        db.pets = [...db.pets.filter((p) => p.id !== parsed.data.id), parsed.data];
        return json(parsed.data, 201);
      },
    },
  },
});
