export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");

const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const BULAN_PANJANG = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d };
};

export const shortDate = (iso: string) => {
  const { m, d } = parse(iso);
  return `${d} ${BULAN[m]}`;
};

export const rangeLabel = (a: string, b: string, long = false) => {
  const A = parse(a);
  const B = parse(b);
  const names = long ? BULAN_PANJANG : BULAN;
  if (A.m === B.m && A.y === B.y) return `${A.d}–${B.d} ${names[A.m]}${long ? " " + A.y : ""}`;
  return `${A.d} ${names[A.m]} – ${B.d} ${names[B.m]}${long ? " " + B.y : ""}`;
};

export const nights = (a: string, b: string) => {
  const ms = new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime();
  return Math.round(ms / 86400000);
};
