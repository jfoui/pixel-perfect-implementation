import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Camera, Check, PawPrint, Phone, Save } from "lucide-react";
import { PageContainer } from "@/components/AppShell";
import { useActivePet, useStore, type Pet } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hewan")({
  validateSearch: (s: Record<string, unknown>) => ({
    lanjut: typeof s.lanjut === "string" ? s.lanjut : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Profil Hewan — PawStay" },
      {
        name: "description",
        content: "Buat profil hewan peliharaanmu sebelum checkout di PawStay.",
      },
    ],
  }),
  component: PetPage,
});

const TEMPERAMENTS = ["Tenang", "Aktif", "Pemalu", "Ramah", "Mudah cemas"];

function PetPage() {
  const { savePet } = useStore();
  const existing = useActivePet();
  const navigate = useNavigate();
  const { lanjut } = Route.useSearch();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Pet>(
    () =>
      existing ?? {
        id: "pet-milo",
        name: "Milo",
        species: "anjing",
        breed: "Poodle",
        age: "3 tahun",
        weight: 8,
        sex: "jantan",
        temperament: ["Ramah"],
        vaccinated: true,
        health: "Tidak cocok dengan makanan tertentu.",
        feeding: "2x sehari, pagi dan malam.",
        emergencyName: "Andi",
        emergencyPhone: "0812-0000-0000",
        photo: undefined,
      },
  );

  const set = <K extends keyof Pet>(k: K, v: Pet[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };
  const toggleTemp = (t: string) =>
    set(
      "temperament",
      form.temperament.includes(t)
        ? form.temperament.filter((x) => x !== t)
        : [...form.temperament, t],
    );

  const onPhoto = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("photo", String(reader.result));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Nama hewan wajib diisi.");
    if (!form.breed.trim()) return setError("Ras hewan wajib diisi.");
    if (!form.emergencyName.trim() || !form.emergencyPhone.trim())
      return setError("Kontak darurat wajib diisi.");
    setError("");
    savePet({ ...form, id: existing?.id ?? form.id });
    setSaved(true);
    toast.success(`Profil ${form.name} tersimpan`);
    if (lanjut === "checkout") setTimeout(() => navigate({ to: "/checkout" }), 600);
  };

  return (
    <PageContainer className="max-w-3xl">
      <span className="tag">🐾 Screen 04 · Profil Hewan</span>
      <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Kenalan dengan hewanmu</h1>
      <p className="mt-2 text-muted-foreground">
        Profil ini membantu hotel menyiapkan kamar, makanan, dan perawatan yang tepat.
      </p>

      <form onSubmit={submit} className="card-soft mt-6 space-y-6 p-5 md:p-7">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-3xl bg-surface text-primary transition hover:ring-4 hover:ring-primary/10"
          >
            {form.photo ? (
              <img src={form.photo} alt={form.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-4xl">🐶</span>
            )}
            <span className="absolute bottom-1 right-1 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
              <Camera className="h-3.5 w-3.5" />
            </span>
          </button>
          <div>
            <p className="font-bold">Foto hewan</p>
            <p className="text-sm text-muted-foreground">
              Upload image — klik foto untuk mengganti.
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPhoto(e.target.files?.[0])}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nama">
            <input
              className="field-input"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Milo"
            />
          </Field>
          <Field label="Ras">
            <input
              className="field-input"
              value={form.breed}
              onChange={(e) => set("breed", e.target.value)}
              placeholder="Poodle"
            />
          </Field>
          <Field label="Umur">
            <input
              className="field-input"
              value={form.age}
              onChange={(e) => set("age", e.target.value)}
              placeholder="3 tahun"
            />
          </Field>
          <Field label="Berat (kg)">
            <input
              className="field-input"
              type="number"
              min="0"
              step="0.1"
              value={form.weight}
              onChange={(e) => set("weight", Number(e.target.value))}
              placeholder="8"
            />
          </Field>
        </div>

        <Choice
          label="Jenis"
          value={form.species}
          options={[
            ["anjing", "🐶 Anjing"],
            ["kucing", "🐱 Kucing"],
          ]}
          onChange={(v) => set("species", v as Pet["species"])}
        />
        <Choice
          label="Jenis kelamin"
          value={form.sex}
          options={[
            ["jantan", "Jantan"],
            ["betina", "Betina"],
          ]}
          onChange={(v) => set("sex", v as Pet["sex"])}
        />
        <Choice
          label="Status vaksin"
          value={form.vaccinated ? "sudah" : "belum"}
          options={[
            ["sudah", "Sudah"],
            ["belum", "Belum"],
          ]}
          onChange={(v) => set("vaccinated", v === "sudah")}
        />

        <div>
          <p className="field-label">Temperamen</p>
          <div className="flex flex-wrap gap-2">
            {TEMPERAMENTS.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => toggleTemp(t)}
                className={cn("chip", form.temperament.includes(t) && "chip-active")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <Field label="Catatan kesehatan">
          <textarea
            className="field-input h-auto py-3"
            rows={3}
            value={form.health}
            onChange={(e) => set("health", e.target.value)}
            placeholder="Tidak cocok dengan makanan tertentu."
          />
        </Field>
        <Field label="Kebiasaan makan">
          <textarea
            className="field-input h-auto py-3"
            rows={2}
            value={form.feeding}
            onChange={(e) => set("feeding", e.target.value)}
            placeholder="2x sehari, pagi dan malam."
          />
        </Field>

        <div>
          <p className="field-label flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" /> Kontak darurat
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className="field-input"
              value={form.emergencyName}
              onChange={(e) => set("emergencyName", e.target.value)}
              placeholder="Nama"
            />
            <input
              className="field-input"
              value={form.emergencyPhone}
              onChange={(e) => set("emergencyPhone", e.target.value)}
              placeholder="Nomor telepon"
            />
          </div>
        </div>

        {error && <p className="field-error">{error}</p>}
        <button type="submit" className="btn-primary w-full">
          <Save className="h-4 w-4" /> Simpan profil hewan
        </button>
      </form>

      {(saved || existing) && (
        <div className="card-sage mt-5 flex items-center gap-4 p-5 animate-in fade-in slide-in-from-bottom-2">
          <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-card text-2xl">
            {form.photo ? (
              <img src={form.photo} alt={form.name} className="h-full w-full object-cover" />
            ) : form.species === "anjing" ? (
              "🐶"
            ) : (
              "🐱"
            )}
          </span>
          <div className="flex-1">
            <p className="flex items-center gap-2 font-bold">
              {form.name}{" "}
              <span className="tag">
                <Check className="h-3 w-3" /> Profil tersimpan
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              {form.breed} · {form.age} · {form.weight} kg · {form.temperament.join(", ") || "—"}
            </p>
          </div>
          <PawPrint className="h-5 w-5 text-primary" />
        </div>
      )}
      {lanjut === "checkout" && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Setelah menyimpan, kamu akan lanjut ke checkout.{" "}
          <Link to="/checkout" className="font-semibold text-primary hover:underline">
            Lewati ke checkout
          </Link>
        </p>
      )}
    </PageContainer>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}
function Choice({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="field-label">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(([v, l]) => (
          <button
            type="button"
            key={v}
            onClick={() => onChange(v)}
            className={cn("chip", value === v && "chip-active")}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
