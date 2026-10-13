import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/AppShell";

export const Route = createFileRoute("/hewan")({
  validateSearch: (s: Record<string, unknown>) => ({ lanjut: typeof s["lanjut"] === "string" ? s["lanjut"] : undefined }),
  head: () => ({ meta: [{ title: "Profil Hewan — PawStay" }, { name: "description", content: "Profil hewan peliharaan di PawStay." }, { property: "og:title", content: "Profil Hewan — PawStay" }, { property: "og:description", content: "Profil hewan peliharaan." }] }),
  component: () => (
    <PageContainer>
      <h1 className="text-3xl font-extrabold">Kenalan dengan hewanmu</h1>
      <p className="mt-2 text-muted-foreground">Form profil hewan sedang disiapkan.</p>
      <Link to="/cari" className="btn-primary mt-6">Cari pet hotel</Link>
    </PageContainer>
  ),
});
