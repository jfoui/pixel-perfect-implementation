import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, MapPin, ShieldCheck, Clock, Syringe, Utensils } from "lucide-react";
import { getHotel } from "@/data/hotels";
import { PageContainer } from "@/components/AppShell";
import { rupiah } from "@/lib/format";
import { useActivePet, useStore } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hotel/$id")({
  loader: ({ params }) => {
    const hotel = getHotel(params.id);
    if (!hotel) throw notFound();
    return { hotel };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.hotel.name ?? "Pet hotel"} — PawStay` },
      {
        name: "description",
        content: loaderData?.hotel.description ?? "Detail pet hotel di PawStay.",
      },
      { property: "og:title", content: `${loaderData?.hotel.name ?? "Pet hotel"} — PawStay` },
      { property: "og:description", content: loaderData?.hotel.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HotelDetail,
});

const policyIcons = [Syringe, Utensils, Clock, Clock];

function HotelDetail() {
  const { hotel } = Route.useLoaderData();
  const { setDraft } = useStore();
  const pet = useActivePet();
  const navigate = useNavigate();
  const [img, setImg] = useState(0);

  const choose = (roomId: string) => {
    const room = hotel.rooms.find((r) => r.id === roomId)!;
    if (pet && !room.species.includes(pet.species)) {
      toast.error(`${room.name} tidak menerima ${pet.species}. Pilih kamar lain.`);
      return;
    }
    setDraft({ hotelId: hotel.id, roomId });
    navigate(pet ? { to: "/checkout" } : { to: "/hewan", search: { lanjut: "checkout" } });
  };

  return (
    <PageContainer>
      <Link
        to="/cari"
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Hasil pencarian
      </Link>

      <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={hotel.gallery[img].src}
            alt={hotel.gallery[img].label}
            className="aspect-[4/3] w-full object-cover md:aspect-[16/10]"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold">
            {hotel.gallery[img].label}
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto md:grid md:grid-cols-2 md:content-start">
          {hotel.gallery.map((g, i) => (
            <button
              key={i}
              onClick={() => setImg(i)}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-2xl ring-2 ring-transparent transition",
                i === img && "ring-primary",
              )}
            >
              <img
                src={g.src}
                alt={g.label}
                loading="lazy"
                className="aspect-square h-20 w-20 object-cover md:h-auto md:w-full"
              />
              <span className="absolute inset-x-0 bottom-0 hidden bg-foreground/50 py-1 text-[11px] font-medium text-background md:block">
                {g.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold md:text-4xl">{hotel.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                <span aria-label={`Rating ${hotel.rating} dari 5`}>
                  {"★".repeat(Math.round(hotel.rating))}
                  {"☆".repeat(5 - Math.round(hotel.rating))}
                </span>{" "}
                {hotel.rating}{" "}
                <span className="font-normal text-muted-foreground">({hotel.reviews} ulasan)</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {hotel.area}, {hotel.city} · {hotel.distanceKm} km
              </span>
              <span className="inline-flex items-center gap-1 text-success">
                <ShieldCheck className="h-4 w-4" /> Terverifikasi
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-muted-foreground">{hotel.description}</p>
          </div>

          <section>
            <h2 className="text-xl font-bold">Fasilitas</h2>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {hotel.facilities.map((f) => (
                <div
                  key={f}
                  className="card-sage flex items-center gap-2 px-3 py-3 text-sm font-medium"
                >
                  <Check className="h-4 w-4 text-primary" /> {f}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold">Pilihan kamar</h2>
            <div className="mt-3 space-y-3">
              {hotel.rooms.map((r) => {
                const mismatch = pet && !r.species.includes(pet.species);
                return (
                  <div
                    key={r.id}
                    className={cn(
                      "card-soft flex flex-col gap-4 p-5 sm:flex-row sm:items-center",
                      mismatch && "opacity-60",
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold">{r.name}</h3>
                        <span className="tag">{r.forText}</span>
                      </div>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        {r.features.map((x) => (
                          <li key={x} className="inline-flex items-center gap-1">
                            <Check className="h-3.5 w-3.5 text-primary" /> {x}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Sisa {r.capacity} slot pada tanggal ini
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <p>
                        <span className="font-display text-xl font-bold">{rupiah(r.price)}</span>{" "}
                        <span className="text-sm text-muted-foreground">/ malam</span>
                      </p>
                      <button onClick={() => choose(r.id)} className="btn-primary h-11">
                        Pilih kamar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside>
          <div className="card-sage sticky top-24 p-5">
            <h2 className="text-lg font-bold">Kebijakan hotel</h2>
            <ul className="mt-3 space-y-3">
              {hotel.policies.map((p, i) => {
                const Icon = policyIcons[i] ?? Check;
                return (
                  <li key={p} className="flex gap-3 text-sm">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {p}
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 rounded-xl bg-card p-4 text-sm">
              <p className="text-muted-foreground">Harga mulai</p>
              <p className="font-display text-2xl font-bold">
                {rupiah(hotel.priceFrom)}
                <span className="text-sm font-normal text-muted-foreground"> / malam</span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
