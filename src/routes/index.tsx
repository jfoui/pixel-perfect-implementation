import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, PawPrint, ShieldCheck, Sparkles, Camera, CreditCard, ArrowRight, LocateFixed } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { HOTELS } from "@/data/hotels";
import { HotelCard } from "@/components/HotelCard";
import { PageContainer } from "@/components/AppShell";
import { useActivePet, useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PawStay — Titip Nyaman, Pulang Bahagia" },
      { name: "description", content: "Temukan pet hotel terpercaya untuk anjing dan kucing kesayanganmu di Jabodetabek." },
      { property: "og:title", content: "PawStay — Titip Nyaman, Pulang Bahagia" },
      { property: "og:description", content: "Temukan pet hotel terpercaya untuk anjing dan kucing kesayanganmu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHY = [
  { icon: ShieldCheck, title: "Hotel terverifikasi", body: "Setiap mitra dikunjungi & dicek standar kebersihannya." },
  { icon: Sparkles, title: "Fasilitas sesuai kebutuhan", body: "Filter AC, ukuran kandang, area bermain, hingga dokter." },
  { icon: Camera, title: "Update selama menginap", body: "Foto & kabar harian langsung dari hotel." },
  { icon: CreditCard, title: "Booking mudah & aman", body: "Bayar via VA, QRIS, atau e-wallet dalam hitungan detik." },
];

function Index() {
  const { search, setSearch } = useStore();
  const pet = useActivePet();
  const navigate = useNavigate();
  const [form, setForm] = useState(search);
  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.location.trim()) return setError("Lokasi wajib diisi.");
    if (!form.checkIn || !form.checkOut) return setError("Pilih tanggal menginap.");
    if (form.checkOut <= form.checkIn) return setError("Tanggal checkout tidak boleh sebelum atau sama dengan check-in.");
    setError("");
    setSearch(form);
    navigate({ to: "/cari" });
  };

  const useMyLocation = () => {
    setLocating(true);
    setTimeout(() => {
      setForm((f) => ({ ...f, location: "Lokasi saya · BSD City" }));
      setLocating(false);
    }, 700);
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <PageContainer className="grid items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12 md:py-16">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="tag mb-4">🐾 Khusus anjing & kucing</span>
            <h1 className="text-[2.6rem] font-extrabold leading-[1.02] text-primary md:text-6xl">
              Titip Nyaman,
              <br />
              <span className="text-foreground">Pulang Bahagia.</span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              Temukan pet hotel terpercaya untuk anjing dan kucing kesayanganmu.
            </p>

            <form onSubmit={submit} className="card-soft mt-7 space-y-3 p-4 md:p-5">
              <div>
                <label className="field-label" htmlFor="loc">Lokasi</label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <input id="loc" className="field-input pl-11 pr-28" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="BSD & Gading Serpong" />
                  <button type="button" onClick={useMyLocation} className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-primary hover:bg-surface">
                    <LocateFixed className={locating ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"} /> Lokasi saya
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label" htmlFor="ci">Check-in</label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                    <input id="ci" type="date" className="field-input pl-11 text-sm" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="field-label" htmlFor="co">Check-out</label>
                  <input id="co" type="date" className="field-input text-sm" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} />
                </div>
              </div>
              <div>
                <span className="field-label">Hewan</span>
                <Link to="/hewan" className="field-input flex items-center gap-3 hover:border-primary/50">
                  <PawPrint className="h-4 w-4 text-primary" />
                  {pet ? (
                    <span>{pet.name} · {pet.species === "anjing" ? "Anjing" : "Kucing"} · {pet.weight} kg</span>
                  ) : (
                    <span className="text-muted-foreground">Tambah profil hewan (mis. Milo · Anjing · 8 kg)</span>
                  )}
                </Link>
              </div>
              {error && <p className="field-error">{error}</p>}
              <button type="submit" className="btn-primary w-full">
                Cari pet hotel <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-sage/50 blur-2xl" />
            <img src={hero} alt="Anjing dan kucing bersantai di pet hotel" width={1280} height={960} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lift" />
            <div className="card-soft absolute -bottom-5 -left-6 flex items-center gap-3 p-3 pr-5 animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-lg">📸</span>
              <div>
                <p className="text-sm font-semibold">Kabar Milo hari ini</p>
                <p className="text-xs text-muted-foreground">10.30 · Waktunya bermain</p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-4 md:py-8">
        <h2 className="text-2xl font-bold md:text-3xl">Kenapa PawStay?</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {WHY.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card-sage p-4 md:p-5">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 text-[15px] font-bold leading-snug">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </PageContainer>

      <PageContainer className="py-4 md:py-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">Pet hotel populer</h2>
          <Link to="/cari" className="text-sm font-semibold text-primary hover:underline">Lihat semua</Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...HOTELS].sort((a, b) => b.reviews - a.reviews).slice(0, 3).map((h) => (
            <HotelCard key={h.id} hotel={h} compact />
          ))}
        </div>
      </PageContainer>
    </>
  );
}
