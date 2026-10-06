export interface PetUpdate {
  time: string;
  title: string;
  body: string;
  kind: "makan" | "main" | "tidur";
  photo?: boolean;
}

export const updatesFor = (bookingId: string) => ({
  bookingId,
  day: "13 Oktober · Hari ke-2 menginap",
  next: "17.00 WIB",
  items: [
    { time: "09.00", title: "Sarapan selesai", body: "Menghabiskan makanannya. Air minum tersedia.", kind: "makan" },
    { time: "10.30", title: "Waktunya bermain", body: "Bermain selama 20 menit di area bermain bersama teman baru.", kind: "main", photo: true },
    { time: "12.00", title: "Istirahat", body: "Sedang tenang di kamarnya.", kind: "tidur" },
  ] as PetUpdate[],
});
