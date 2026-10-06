import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  Check,
  ClipboardList,
  Home,
  PackageCheck,
  Sparkles,
  Syringe,
  Clock,
} from "lucide-react";
import { getHotel } from "@/data/hotels";
import { PageContainer } from "@/components/AppShell";
import { rangeLabel } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/sukses/$id")({
  head: () => ({ meta: [{ title: "Booking Berhasil — PawStay" }] }),
  component: Success,
});

function Success() {
  const { id } = Route.useParams();
  const { bookings, pets } = useStore();
  const booking = bookings.find((b) => b.id === id);
  const hotel = booking ? getHotel(booking.hotelId) : undefined;
  const pet = booking ? pets.find((p) => p.id === booking.petId) : undefined;
  const petName = pet?.name ?? "Milo";
  const emoji = pet?.species === "kucing" ? "🐱" : "🐶";

  return (
    <PageContainer className="max-w-2xl text-center">
      <div className="card-soft overflow-hidden p-0">
        <div className="bg-surface px-6 py-10">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift animate-in zoom-in duration-500">
            <Check className="h-10 w-10" strokeWidth={3} />
          </span>
          <span className="tag mt-5">Screen 06 · Booking Berhasil</span>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
            {petName} siap menginap! {emoji}
          </h1>
          <p className="mt-2 inline-flex items-center gap-2 font-semibold text-success">
            <Sparkles className="h-4 w-4" /> Pesanan terkonfirmasi
          </p>
        </div>
        <div className="space-y-3 p-6 text-left">
          <Row label="Booking ID" value={id} strong />
          <Row label="Hotel" value={hotel?.name ?? "Paw Garden Hotel"} />
          <Row
            label="Tanggal"
            value={
              booking ? rangeLabel(booking.checkIn, booking.checkOut, true) : "12–14 Oktober 2026"
            }
          />
          {booking && (
            <Row
              label="Status"
              value={booking.status === "confirmed" ? "Pesanan terkonfirmasi" : booking.status}
            />
          )}
        </div>
      </div>

      <div className="card-sage mt-4 p-6 text-left">
        <h2 className="flex items-center gap-2 font-bold">
          <PackageCheck className="h-5 w-5 text-primary" /> Sebelum check-in
        </h2>
        <ul className="mt-3 space-y-2.5 text-sm">
          <li className="flex gap-2">
            <span>🍽️</span> Bawa makanan {petName}
          </li>
          <li className="flex gap-2">
            <Syringe className="h-4 w-4 shrink-0 text-primary" /> Bawa bukti vaksin
          </li>
          <li className="flex gap-2">
            <Clock className="h-4 w-4 shrink-0 text-primary" /> Datang maksimal sesuai waktu
            check-in (mulai 14.00)
          </li>
          <li className="flex gap-2">
            <CalendarCheck className="h-4 w-4 shrink-0 text-primary" /> Sampaikan perubahan kondisi{" "}
            {petName}
          </li>
        </ul>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link to="/pesanan" className="btn-primary w-full">
          <ClipboardList className="h-4 w-4" /> Lihat detail pesanan
        </Link>
        <Link to="/" className="btn-ghost w-full">
          <Home className="h-4 w-4" /> Kembali ke beranda
        </Link>
      </div>
    </PageContainer>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={strong ? "font-display font-bold" : "font-semibold"}>{value}</span>
    </div>
  );
}
