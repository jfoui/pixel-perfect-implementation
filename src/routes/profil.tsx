import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/AppShell";

export const Route = createFileRoute("/profil")({
  head: () => ({ meta: [{ title: "Profil — PawStay" }, { name: "description", content: "Profil di PawStay." }, { property: "og:title", content: "Profil — PawStay" }, { property: "og:description", content: "Profil di PawStay." }] }),
  component: () => (
    <PageContainer>
      <h1 className="text-3xl font-extrabold">Profil</h1>
      <p className="mt-2 text-muted-foreground">Halaman ini sedang disiapkan.</p>
      <Link to="/cari" className="btn-primary mt-6">Cari pet hotel</Link>
    </PageContainer>
  ),
});
