import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/AppShell";

export const Route = createFileRoute("/bantuan")({
  head: () => ({ meta: [{ title: "Bantuan — PawStay" }, { name: "description", content: "Bantuan di PawStay." }, { property: "og:title", content: "Bantuan — PawStay" }, { property: "og:description", content: "Bantuan di PawStay." }] }),
  component: () => (
    <PageContainer>
      <h1 className="text-3xl font-extrabold">Bantuan</h1>
      <p className="mt-2 text-muted-foreground">Halaman ini sedang disiapkan.</p>
      <Link to="/cari" className="btn-primary mt-6">Cari pet hotel</Link>
    </PageContainer>
  ),
});
