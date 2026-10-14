import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Mail, PawPrint, Pencil, Phone, Save, User } from "lucide-react";
import { getHotel } from "@/data/hotels";
import { PageContainer } from "@/components/AppShell";
import { rangeLabel } from "@/lib/format";
import { useActivePet, useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/profil")({
  head: () => ({ meta: [{ title: "Profil — PawStay" }] }),
  component: Profile,
});

function Profile() {
  const pet = useActivePet();
  const { bookings } = useStore();
  const active = bookings.find((b) => b.status === "confirmed");
  const hotel = active ? getHotel(active.hotelId) : undefined;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Andi",
    email: "andi@email.com",
    phone: "0812-3456-7890",
  });

  const save = () => {
    setEditing(false);
    toast.success("Profil diperbarui (prototype)");
  };

  return (
    <PageContainer className="max-w-2xl">
      <span className="tag">👤 Profil User</span>
      <div className="card-soft mt-4 p-6">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-primary font-display text-2xl font-bold text-primary-foreground">
            {form.name.charAt(0)}
          </span>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold">{form.name}</h1>
            <p className="text-sm text-muted-foreground">Member PawStay sejak 2026</p>
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} className="btn-ghost h-10 px-4 text-sm">
              <Pencil className="h-4 w-4" /> Edit profil
            </button>
          )}
        </div>
        <div className="mt-6 space-y-3">
          {editing ? (
            <>
              <FieldEdit
                icon={User}
                label="Nama"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <FieldEdit
                icon={Mail}
                label="Email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <FieldEdit
                icon={Phone}
                label="Nomor telepon"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
              />
              <button onClick={save} className="btn-primary w-full">
                <Save className="h-4 w-4" /> Simpan perubahan
              </button>
            </>
          ) : (
            <>
              <Row icon={User} label="Nama" value={form.name} />
              <Row icon={Mail} label="Email" value={form.email} />
              <Row
                icon={Phone}
                label="Nomor telepon"
                value={form.phone.replace(/(\d{4})\d+/, "$1xxxxxxxx")}
              />
            </>
          )}
        </div>
      </div>

      <div className="card-sage mt-4 p-6">
        <h2 className="flex items-center gap-2 font-bold">
          <PawPrint className="h-5 w-5 text-primary" /> Hewan saya
        </h2>
        {pet ? (
          <Link
            to="/hewan"
            className="card-soft mt-3 flex items-center gap-4 p-4 transition hover:shadow-lift"
          >
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-surface text-xl">
              {pet.photo ? (
                <img src={pet.photo} alt={pet.name} className="h-full w-full object-cover" />
              ) : pet.species === "anjing" ? (
                "🐶"
              ) : (
                "🐱"
              )}
            </span>
            <span>
              <span className="block font-bold">{pet.name}</span>
              <span className="block text-sm text-muted-foreground">
                {pet.breed} · {pet.weight} kg
              </span>
            </span>
          </Link>
        ) : (
          <Link to="/hewan" className="btn-primary mt-3">
            Tambah profil hewan
          </Link>
        )}
      </div>

      <div className="card-soft mt-4 p-6">
        <h2 className="flex items-center gap-2 font-bold">
          <Calendar className="h-5 w-5 text-primary" /> Booking aktif
        </h2>
        {active && hotel ? (
          <Link
            to="/pesanan"
            className="mt-3 block rounded-2xl bg-surface p-4 transition hover:ring-2 hover:ring-primary/20"
          >
            <p className="font-bold">{hotel.name}</p>
            <p className="text-sm text-muted-foreground">
              {pet?.name ?? "Milo"} · {rangeLabel(active.checkIn, active.checkOut, true)} ·{" "}
              {active.id}
            </p>
          </Link>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Belum ada booking aktif.{" "}
            <Link to="/cari" className="font-semibold text-primary hover:underline">
              Cari pet hotel
            </Link>
          </p>
        )}
      </div>
    </PageContainer>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface p-4">
      <Icon className="h-5 w-5 text-primary" />
      <span className="flex-1 text-sm text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
function FieldEdit({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: typeof User;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="field-label flex items-center gap-1">
        <Icon className="h-3.5 w-3.5" /> {label}
      </label>
      <input className="field-input" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
