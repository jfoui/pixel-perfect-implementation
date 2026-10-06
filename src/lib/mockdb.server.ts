// In-memory mock database for the prototype API. Swap with Lovable Cloud tables later.
export { updatesFor } from "@/data/updates";

export const db = {
  pets: [] as Record<string, unknown>[],
  bookings: [] as Record<string, unknown>[],
};

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
