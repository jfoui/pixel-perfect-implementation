import { createFileRoute } from "@tanstack/react-router";
import { db, json } from "@/lib/mockdb.server";

export const Route = createFileRoute("/api/pets/$id")({
  server: {
    handlers: {
      PUT: async ({ params, request }) => {
        const body = (await request.json()) as Record<string, unknown>;
        const pet = { ...body, id: params.id };
        db.pets = [...db.pets.filter((p) => p.id !== params.id), pet];
        return json(pet);
      },
    },
  },
});
