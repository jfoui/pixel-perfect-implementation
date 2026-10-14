import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, LifeBuoy, MessageCircle, Moon, Play, Utensils } from "lucide-react";
import { getHotel } from "@/data/hotels";
import { updatesFor } from "@/data/updates";
import { PageContainer } from "@/components/AppShell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/update/$id")({
  head: () => ({ meta: [{ title: "Kabar Hewan Hari Ini — PawStay" }] }),
  component: UpdatePage,
});

const ICONS = { makan: Utensils, main: Play, tidur: Moon } as const;

function UpdatePage() {
  const { id } = Route.useParams();
  const { bookings, pets } = useStore();
  const booking = bookings.find((b) => b.id === id);
  const hotel = booking ? getHotel(booking.hotelId) : undefined;
  const pet = booking ? pets.find((p) => p.id === booking.petId) : undefined;
  const petName = pet?.name ?? "Milo";
  const data = updatesFor(id);

  return (
    <PageContainer className="max-w-3xl">
      <Link
        to="/pesanan"
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Pesanan saya
      </Link>
      <span className="tag">📸 Screen 07 · Update Hewan</span>
      <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Kabar {petName} hari ini</h1>
      <p className="mt-2 text-muted-foreground">
        {data.day}
        {hotel ? ` · ${hotel.name}` : " · Paw Garden Hotel"}
      </p>

      <div className="relative mt-8 space-y-4 before:absolute before:bottom-4 before:left-[27px] before:top-2 before:w-px before:bg-border">
        {data.items.map((u) => {
          const Icon = ICONS[u.kind as keyof typeof ICONS] ?? Clock;
          return (
            <article
              key={u.time}
              className="relative flex gap-4 animate-in fade-in slide-in-from-bottom-2"
            >
              <span className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
                <Icon className="h-6 w-6" />
              </span>
              <div className="card-soft flex-1 p-5">
                <p className="text-sm font-bold text-primary">
                  {u.time} · {u.title}
                </p>
                {u.photo && (
                  <div className="relative mt-3 overflow-hidden rounded-2xl">
                    <img
                      src={hotel?.gallery[3]?.src ?? hotel?.cover}
                      alt={`${petName} bermain`}
                      className="aspect-[16/9] w-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold">
                      Foto / video placeholder
                    </span>
                  </div>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  {petName} {u.body.charAt(0).toLowerCase() + u.body.slice(1)}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="card-sage mt-6 flex items-center gap-3 p-5">
        <Clock className="h-6 w-6 shrink-0 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Update berikutnya</p>
          <p className="font-display text-lg font-bold">{data.next}</p>
        </div>
      </div>

      <div className="card-soft mt-4 p-5">
        <h2 className="font-bold">Butuh bantuan?</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            onClick={() => alert("Prototype: membuka chat dengan hotel…")}
            className="btn-ghost w-full text-sm"
          >
            <MessageCircle className="h-4 w-4" /> Chat hotel
          </button>
          <button
            onClick={() => alert("Prototype: menghubungi dukungan PawStay…")}
            className="btn-ghost w-full text-sm"
          >
            <LifeBuoy className="h-4 w-4" /> Hubungi dukungan PawStay
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
