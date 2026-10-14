import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, MessageCircle, ShieldCheck, Syringe } from "lucide-react";
import { PageContainer } from "@/components/AppShell";

export const Route = createFileRoute("/bantuan")({
  head: () => ({ meta: [{ title: "Bantuan — PawStay" }] }),
  component: Help,
});

const FAQ = [
  {
    q: "Apakah pembayaran di PawStay sungguhan?",
    a: "Belum. Ini prototype — pembayaran via Virtual Account, QRIS, dan e-wallet hanya simulasi dan tidak menagih uang asli.",
  },
  {
    q: "Apa yang harus dibawa saat check-in?",
    a: "Bawa makanan hewanmu, bukti/buku vaksin, dan datang sesuai waktu check-in mulai pukul 14.00. Check-out maksimal pukul 12.00.",
  },
  {
    q: "Bagaimana jika hewan saya sakit saat menginap?",
    a: "Hotel partner akan menghubungi kontak daruratmu. Beberapa hotel memiliki dokter hewan partner yang bisa dipanggil.",
  },
  {
    q: "Bagaimana cara melihat kabar hewan saya?",
    a: "Buka menu Pesanan, pilih booking aktif, lalu ketuk tombol Kabar hewan untuk melihat timeline makan, bermain, dan istirahat.",
  },
];

function Help() {
  return (
    <PageContainer className="max-w-3xl">
      <span className="tag">🛟 Bantuan</span>
      <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Butuh bantuan?</h1>
      <p className="mt-2 text-muted-foreground">
        Tim PawStay dan hotel partner siap membantu selama hewanmu menginap.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => alert("Prototype: membuka chat hotel…")}
          className="card-soft flex items-center gap-3 p-5 text-left transition hover:shadow-lift"
        >
          <MessageCircle className="h-6 w-6 text-primary" />
          <span>
            <span className="block font-bold">Chat hotel</span>
            <span className="text-sm text-muted-foreground">
              Tanya langsung ke Paw Garden Hotel
            </span>
          </span>
        </button>
        <button
          onClick={() => alert("Prototype: menghubungi dukungan PawStay…")}
          className="card-soft flex items-center gap-3 p-5 text-left transition hover:shadow-lift"
        >
          <LifeBuoy className="h-6 w-6 text-primary" />
          <span>
            <span className="block font-bold">Hubungi dukungan PawStay</span>
            <span className="text-sm text-muted-foreground">Setiap hari 08.00–21.00 WIB</span>
          </span>
        </button>
      </div>
      <div className="card-sage mt-4 flex gap-3 p-5">
        <ShieldCheck className="h-6 w-6 shrink-0 text-primary" />
        <p className="text-sm">
          <strong>Keamanan terjaga.</strong> Semua hotel terverifikasi, vaksin wajib{" "}
          <Syringe className="inline h-4 w-4" />, dan update harian dikirim selama menginap.
        </p>
      </div>
      <h2 className="mt-8 text-xl font-bold">Pertanyaan umum</h2>
      <div className="mt-3 space-y-3">
        {FAQ.map((f) => (
          <details key={f.q} className="card-soft group p-5">
            <summary className="cursor-pointer font-semibold marker:text-primary">{f.q}</summary>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </PageContainer>
  );
}
