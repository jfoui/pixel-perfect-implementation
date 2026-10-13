import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/AppShell";

export const Route = createFileRoute("/pesanan")({
  head: () => ({ meta: [{ title: "Pesanan — PawStay" }, { name: "description", content: "Pesanan di PawStay." }, { property: "og:title", content: "Pesanan — PawStay" }, { property: "og:description", content: "Pesanan di PawStay." }] }),
  component: () => (
    <PageContainer>
      <h1 className="text-3xl font-extrabold">Pesanan</h1>
      <p className="mt-2 text-muted-foreground">Halaman ini sedang disiapkan.</p>
      <Link to="/cari" className="btn-primary mt-6">Cari pet hotel</Link>
    </PageContainer>
  ),
});
