import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, Search, X, SearchX } from "lucide-react";
import { FACILITIES, type Facility } from "@/data/hotels";
import { DEFAULT_FILTERS, filterHotels, type Filters, type SortKey } from "@/lib/search";
import { HotelCard } from "@/components/HotelCard";
import { PageContainer } from "@/components/AppShell";
import { useActivePet, useStore } from "@/lib/store";
import { nights, rangeLabel, rupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cari")({
  head: () => ({
    meta: [
      { title: "Cari Pet Hotel — PawStay" },
      { name: "description", content: "Bandingkan pet hotel berdasarkan jarak, harga, rating, dan fasilitas." },
      { property: "og:title", content: "Cari Pet Hotel — PawStay" },
      { property: "og:description", content: "Filter pet hotel anjing & kucing sesuai kebutuhanmu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

const PRICES = [150000, 200000, 250000, 350000, 500000];
const SORTS: { k: SortKey; l: string }[] = [
  { k: "terdekat", l: "Terdekat" },
  { k: "harga", l: "Harga terendah" },
  { k: "rating", l: "Rating tertinggi" },
];

function SearchPage() {
  const { search } = useStore();
  const pet = useActivePet();
  const [f, setF] = useState<Filters>(DEFAULT_FILTERS);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pet) setF((x) => ({ ...x, species: pet.species }));
  }, [pet?.id]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [f]);

  const results = useMemo(() => filterHotels(f), [f]);
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setF((x) => ({ ...x, [k]: v }));
  const toggleFac = (x: Facility) => set("facilities", f.facilities.includes(x) ? f.facilities.filter((y) => y !== x) : [...f.facilities, x]);
  const n = nights(search.checkIn, search.checkOut);
  const activeCount = f.facilities.length + (f.maxPrice < 500000 ? 1 : 0) + (f.minRating ? 1 : 0) + (f.size !== "semua" ? 1 : 0) + (f.maxDistance < 20 ? 1 : 0);

  const filterPanel = (
    <div className="space-y-6">
      <Group title="Jenis hewan">
        {(["semua", "anjing", "kucing"] as const).map((s) => (
          <Chip key={s} on={f.species === s} onClick={() => set("species", s)}>{s === "semua" ? "Semua" : s === "anjing" ? "🐶 Anjing" : "🐱 Kucing"}</Chip>
        ))}
      </Group>
      <Group title="Harga maks / malam">
        {PRICES.map((p) => (
          <Chip key={p} on={f.maxPrice === p} onClick={() => set("maxPrice", p)}>{p === 500000 ? "Semua" : `≤ ${rupiah(p)}`}</Chip>
        ))}
      </Group>
      <Group title="Jarak">
        {[3, 5, 10, 20].map((d) => (
          <Chip key={d} on={f.maxDistance === d} onClick={() => set("maxDistance", d)}>{d === 20 ? "Semua" : `≤ ${d} km`}</Chip>
        ))}
      </Group>
      <Group title="Rating">
        {[0, 4.5, 4.8].map((r) => (
          <Chip key={r} on={f.minRating === r} onClick={() => set("minRating", r)}>{r === 0 ? "Semua" : `★ ${r}+`}</Chip>
        ))}
      </Group>
      <Group title="Ukuran kandang">
        {(["semua", "kecil", "sedang", "besar"] as const).map((s) => (
          <Chip key={s} on={f.size === s} onClick={() => set("size", s)}>{s[0].toUpperCase() + s.slice(1)}</Chip>
        ))}
      </Group>
      <Group title="Fasilitas">
        {FACILITIES.map((x) => (
          <Chip key={x} on={f.facilities.includes(x)} onClick={() => toggleFac(x)}>{x}</Chip>
        ))}
      </Group>
      <button onClick={() => setF({ ...DEFAULT_FILTERS, species: f.species })} className="text-sm font-semibold text-primary hover:underline">
        Reset filter
      </button>
    </div>
  );

  return (
    <PageContainer>
      <div className="mb-6">
        <p className="text-sm font-medium text-muted-foreground">
          {search.location.split("&")[0].trim()} · {rangeLabel(search.checkIn, search.checkOut)} · {n} malam
          <Link to="/" className="ml-2 font-semibold text-primary hover:underline">Ubah</Link>
        </p>
        <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">Tempat terbaik untuk {pet?.name ?? "sahabatmu"}</h1>
      </div>

      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input className="field-input pl-11" placeholder="Cari nama hotel atau area…" value={f.q} onChange={(e) => set("q", e.target.value)} />
        </div>
        <button onClick={() => setOpen(true)} className="btn-ghost relative px-4 lg:hidden" aria-label="Filter">
          <SlidersHorizontal className="h-4 w-4" />
          {activeCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[11px] text-primary-foreground">{activeCount}</span>}
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {SORTS.map((s) => (
          <Chip key={s.k} on={f.sort === s.k} onClick={() => set("sort", s.k)}>{s.l}</Chip>
        ))}
        <Chip on={f.facilities.includes("AC")} onClick={() => toggleFac("AC")}>AC</Chip>
        <Chip on={f.facilities.includes("Area bermain")} onClick={() => toggleFac("Area bermain")}>Area bermain</Chip>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="card-soft sticky top-24 p-5">{filterPanel}</div>
        </aside>

        <div>
          <p className="mb-3 text-sm text-muted-foreground">{loading ? "Mencari…" : `${results.length} pet hotel ditemukan`}</p>
          {loading ? (
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="card-soft h-44 animate-pulse bg-muted" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="card-sage flex flex-col items-center p-10 text-center">
              <SearchX className="h-10 w-10 text-primary" />
              <h3 className="mt-3 text-lg font-bold">Belum ada hotel yang cocok</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">Coba longgarkan filter harga, jarak, atau fasilitas.</p>
              <button onClick={() => setF(DEFAULT_FILTERS)} className="btn-primary mt-5">Reset semua filter</button>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 animate-in fade-in" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-background p-5 pb-8 animate-in slide-in-from-bottom duration-300">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Filter</h2>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface" aria-label="Tutup"><X className="h-5 w-5" /></button>
            </div>
            {filterPanel}
            <button onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">Tampilkan {results.length} hotel</button>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="field-label">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={cn("chip shrink-0 whitespace-nowrap", on && "chip-active")}>
      {children}
    </button>
  );
}
