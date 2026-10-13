import { createFileRoute, Link } from "@tanstack/react-router";
import { PageContainer } from "@/components/AppShell";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — PawStay" }, { name: "description", content: "Checkout di PawStay." }, { property: "og:title", content: "Checkout — PawStay" }, { property: "og:description", content: "Checkout di PawStay." }] }),
  component: () => (
    <PageContainer>
      <h1 className="text-3xl font-extrabold">Checkout</h1>
      <p className="mt-2 text-muted-foreground">Halaman ini sedang disiapkan.</p>
      <Link to="/cari" className="btn-primary mt-6">Cari pet hotel</Link>
    </PageContainer>
  ),
});
