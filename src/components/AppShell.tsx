import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ClipboardList, PawPrint, User, HelpCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const desktop = [
  { to: "/", label: "Beranda" },
  { to: "/cari", label: "Cari Hotel" },
  { to: "/pesanan", label: "Pesanan" },
  { to: "/hewan", label: "Profil Hewan" },
  { to: "/bantuan", label: "Bantuan" },
] as const;

const mobile = [
  { to: "/", label: "Home", icon: Home },
  { to: "/cari", label: "Cari", icon: Search },
  { to: "/pesanan", label: "Pesanan", icon: ClipboardList },
  { to: "/hewan", label: "Hewan", icon: PawPrint },
  { to: "/profil", label: "Profil", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const active = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {desktop.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-surface hover:text-foreground",
                  active(n.to) && "bg-surface text-primary",
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/bantuan" className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-surface md:hidden" aria-label="Bantuan">
              <HelpCircle className="h-5 w-5" />
            </Link>
            <Link to="/profil" className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground" aria-label="Profil">
              A
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-20 hidden border-t border-border md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
          <Logo size={24} />
          <p>Titip Nyaman, Pulang Bahagia. · © 2026 PawStay</p>
        </div>
      </footer>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-2xl border border-border bg-card/95 p-1.5 shadow-lift backdrop-blur md:hidden">
        {mobile.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-medium text-muted-foreground transition",
              active(to) && "bg-surface text-primary",
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10", className)}>{children}</div>;
}
