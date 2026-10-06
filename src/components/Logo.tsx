import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid place-items-center rounded-xl bg-surface p-1" style={{ width: size + 6, height: size + 6 }}>
        <img src={logo} alt="" width={size} height={size} />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-primary">
        PAW<span className="text-foreground">STAY</span>
      </span>
    </Link>
  );
}
