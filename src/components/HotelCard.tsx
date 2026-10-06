import { Link } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import type { Hotel } from "@/data/hotels";
import { rupiah } from "@/lib/format";

export function HotelCard({ hotel, compact }: { hotel: Hotel; compact?: boolean }) {
  return (
    <Link
      to="/hotel/$id"
      params={{ id: hotel.id }}
      className="group card-soft flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lift sm:flex-row"
    >
      <div className={compact ? "relative aspect-[4/3] w-full" : "relative aspect-[4/3] w-full sm:aspect-auto sm:w-64 sm:shrink-0"}>
        <img src={hotel.cover} alt={hotel.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-xs font-bold">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {hotel.rating}
          <span className="font-normal text-muted-foreground">({hotel.reviews})</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div>
          <h3 className="text-lg font-bold leading-tight">{hotel.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {hotel.distanceKm} km · {hotel.area}
          </p>
        </div>
        {!compact && (
          <div className="flex flex-wrap gap-1.5">
            {hotel.facilities.slice(0, 4).map((f) => (
              <span key={f} className="tag">{f}</span>
            ))}
            <span className="tag bg-muted text-muted-foreground">{hotel.species.includes("kucing") ? "Anjing & kucing" : "Khusus anjing"}</span>
          </div>
        )}
        <div className="mt-auto flex items-end justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            mulai <span className="font-display text-lg font-bold text-foreground">{rupiah(hotel.priceFrom)}</span> / malam
          </p>
          {!compact && <span className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Lihat detail</span>}
        </div>
      </div>
    </Link>
  );
}
