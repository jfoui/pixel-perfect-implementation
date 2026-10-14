import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Building2, Check, CreditCard, Loader2, QrCode, Wallet } from "lucide-react";
import { getHotel } from "@/data/hotels";
import { PageContainer } from "@/components/AppShell";
import { nights, rangeLabel, rupiah, shortDate } from "@/lib/format";
import { useActivePet, useStore, type Booking } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Ringkasan Pesanan — PawStay" },
      { name: "description", content: "Checkout dan pembayaran simulasi PawStay." },
    ],
  }),
  component: Checkout,
});

const METHODS = [
  { id: "Virtual Account", icon: Building2, desc: "BCA, BRI, Mandiri, dan lainnya" },
  { id: "QRIS", icon: QrCode, desc: "Scan sekali, langsung terbayar" },
  { id: "E-wallet", icon: Wallet, desc: "OVO, DANA, GoPay, ShopeePay" },
];

function Checkout() {
  const { draft, search, bookings, addBooking } = useStore();
  const pet = useActivePet();
  const navigate = useNavigate();
  const [method, setMethod] = useState("QRIS");
  const [paying, setPaying] = useState(false);

  const hotel = draft ? getHotel(draft.hotelId) : undefined;
  const room = hotel?.rooms.find((r) => r.id === draft?.roomId);
  const n = nights(search.checkIn, search.checkOut);
  const subtotal = room ? room.price * n : 0;

  const bookingPreview = useMemo(
    () => `PS-DEMO-${String(bookings.length + 1).padStart(3, "0")}`,
    [bookings.length],
  );

  if (!draft || !hotel || !room) {
    return (
      <PageContainer className="max-w-2xl text-center">
        <div className="card-sage p-10">
          <CreditCard className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-3 text-2xl font-bold">Belum ada pesanan untuk dibayar</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pilih pet hotel dan kamar dulu, baru lanjut ke ringkasan pesanan.
          </p>
          <Link to="/cari" className="btn-primary mt-6">
            Cari pet hotel
          </Link>
        </div>
      </PageContainer>
    );
  }
  if (!pet) {
    return (
      <PageContainer className="max-w-2xl text-center">
        <div className="card-sage p-10">
          <h1 className="text-2xl font-bold">Profil hewan belum dibuat</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sebelum checkout, buat profil hewan dulu ya.
          </p>
          <Link to="/hewan" search={{ lanjut: "checkout" }} className="btn-primary mt-6">
            Buat profil hewan
          </Link>
        </div>
      </PageContainer>
    );
  }

  const pay = () => {
    setPaying(true);
    setTimeout(() => {
      const booking: Booking = {
        id: bookingPreview,
        hotelId: hotel.id,
        roomId: room.id,
        petId: pet.id,
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        nights: n,
        total: subtotal,
        method,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
      addBooking(booking);
      toast.success("Pembayaran berhasil (simulasi)");
      navigate({ to: "/sukses/$id", params: { id: booking.id } });
    }, 1100);
  };

  return (
    <PageContainer className="max-w-3xl">
      <Link
        to="/hotel/$id"
        params={{ id: hotel.id }}
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke detail hotel
      </Link>
      <span className="tag block w-fit">Screen 05 · Checkout</span>
      <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Ringkasan pesanan</h1>

      <div className="card-soft mt-6 overflow-hidden">
        <img src={hotel.cover} alt={hotel.name} className="h-44 w-full object-cover" />
        <div className="space-y-4 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Hotel</p>
              <h2 className="text-xl font-bold">
                {pet.name} di {hotel.name.replace(" Hotel", "").replace(" Pet Hotel", "")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {hotel.name} · {hotel.area}, {hotel.city}
              </p>
            </div>
            <span className="tag shrink-0">{room.name}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <Info label="Check-in" value={`${shortDate(search.checkIn)} · 14.00`} />
            <Info label="Check-out" value={`${shortDate(search.checkOut)} · 12.00`} />
            <Info label="Durasi" value={`${n} malam`} />
          </div>
          <p className="text-sm text-muted-foreground">
            {search.checkIn} → {search.checkOut} ·{" "}
            {rangeLabel(search.checkIn, search.checkOut, true)}
          </p>
        </div>
      </div>

      <div className="card-soft mt-4 p-5 md:p-6">
        <h2 className="text-lg font-bold">Rincian biaya</h2>
        <div className="mt-3 space-y-2 text-sm">
          <Row left={`${n} × ${rupiah(room.price)}`} right={rupiah(subtotal)} />
          <Row left="Biaya tambahan" right={rupiah(0)} />
          <div className="border-t border-border pt-3">
            <Row
              left={<span className="font-bold text-foreground">Total</span>}
              right={<span className="font-display text-xl font-bold">{rupiah(subtotal)}</span>}
            />
          </div>
        </div>
      </div>

      <div className="card-soft mt-4 p-5 md:p-6">
        <h2 className="text-lg font-bold">Metode pembayaran</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Untuk prototype, ini simulasi — tidak ada pembayaran sungguhan.
        </p>
        <div className="mt-4 space-y-2">
          {METHODS.map(({ id, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => setMethod(id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition hover:border-primary/50",
                method === id ? "border-primary bg-surface" : "border-border bg-card",
              )}
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="flex-1">
                <span className="block font-semibold">{id}</span>
                <span className="block text-sm text-muted-foreground">{desc}</span>
              </span>
              {method === id && (
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </button>
          ))}
        </div>
        <button onClick={pay} disabled={paying} className="btn-primary mt-5 w-full">
          {paying ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Memproses pembayaran simulasi…
            </>
          ) : (
            <>Bayar {rupiah(subtotal)}</>
          )}
        </button>
      </div>
    </PageContainer>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}
function Row({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{left}</span>
      <span className="font-semibold">{right}</span>
    </div>
  );
}
