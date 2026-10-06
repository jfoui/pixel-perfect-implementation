// In-memory mock database for the prototype API. Swap with Lovable Cloud tables later.
export const db = {
  pets: [] as Record<string, unknown>[],
  bookings: [] as Record<string, unknown>[],
};

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

export const updatesFor = (bookingId: string) => ({
  bookingId,
  day: "13 Oktober · Hari ke-2 menginap",
  next: "17.00 WIB",
  items: [
    { time: "09.00", title: "Sarapan selesai", body: "Menghabiskan makanannya. Air minum tersedia.", kind: "makan" },
    { time: "10.30", title: "Waktunya bermain", body: "Bermain selama 20 menit di area bermain bersama teman baru.", kind: "main", photo: true },
    { time: "12.00", title: "Istirahat", body: "Sedang tenang di kamarnya.", kind: "tidur" },
  ],
});
