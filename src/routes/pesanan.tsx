import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Camera, ClipboardList, MapPin, Search } from "lucide-react";
import { getHotel } from "@/data/hotels";
import { PageContainer } from "@/components/AppShell";
import { rangeLabel, rupiah } from "@/lib/format";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/pesanan")({
  head: () => ({
    meta: [
      { title: "Pesanan Saya — PawStay" },
      { name: "description", content: "Daftar booking pet hotel kamu di PawStay." },
    ],
  }),
  component: Orders,
});

function Orders() {
  const { bookings, pets, ready } = useStore();

  return (
    <PageContainer>
      <span className="tag">📋 Pesanan</span>
      <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Pesanan saya</h1>
      <p className="mt-2 text-muted-foreground">
        Semua booking aktif dan riwayat menginap hewanmu ada di sini.
      </p>

      {!ready ? (
        <div className="mt-6 space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="card-soft h-36 animate-pulse bg-muted" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="card-sage mt-6 flex flex-col items-center p-10 text-center animate-in fade-in">
          <ClipboardList className="h-11 w-11 text-primary" />
          <h2 className="mt-3 text-xl font-bold">Belum ada pesanan</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Kamu belum pernah memesan pet hotel. Yuk cari tempat menginap terbaik untuk sahabat
            berbulumu.
          </p>
          <Link to="/cari" className="btn-primary mt-6">
            <Search className="h-4 w-4" /> Cari pet hotel
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {bookings.map((b) => {
            const hotel = getHotel(b.hotelId);
            const room = hotel?.rooms.find((r) => r.id === b.roomId);
            const pet = pets.find((p) => p.id === b.petId);
            const petName = pet?.name ?? "Milo";
            return (
              <article
                key={b.id}
                className="card-soft overflow-hidden transition hover:shadow-lift md:flex"
              >
                <img
                  src={hotel?.cover}
                  alt={hotel?.name}
                  className="h-44 w-full object-cover md:h-auto md:w-56"
                />
                <div className="flex-1 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tag bg-secondary">
                      {b.status === "confirmed" ? "Pesanan terkonfirmasi" : b.status}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">{b.id}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-bold">
                    {petName} di {hotel?.name ?? "Paw Garden Hotel"}
                  </h2>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {hotel?.area}, {hotel?.city} · {room?.name}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" /> {rangeLabel(b.checkIn, b.checkOut, true)} ·{" "}
                    {b.nights} malam
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-lg font-bold">
                      {rupiah(b.total)}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        · {b.method}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to="/update/$id"
                        params={{ id: b.id }}
                        className="btn-ghost h-10 px-4 text-sm"
                      >
                        <Camera className="h-4 w-4" /> Kabar {petName}
                      </Link>
                      <Link
                        to="/sukses/$id"
                        params={{ id: b.id }}
                        className="btn-primary h-10 px-4 text-sm"
                      >
                        Lihat detail pesanan
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
