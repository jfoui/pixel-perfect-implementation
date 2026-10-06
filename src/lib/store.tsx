import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Species } from "@/data/hotels";

export interface Pet {
  id: string;
  photo?: string;
  name: string;
  species: Species;
  breed: string;
  age: string;
  weight: number;
  sex: "jantan" | "betina";
  temperament: string[];
  vaccinated: boolean;
  health: string;
  feeding: string;
  emergencyName: string;
  emergencyPhone: string;
}

export type BookingStatus = "pending" | "confirmed";
export interface Booking {
  id: string;
  hotelId: string;
  roomId: string;
  petId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  method: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Search {
  location: string;
  checkIn: string;
  checkOut: string;
}

export interface Draft {
  hotelId: string;
  roomId: string;
}

interface State {
  pets: Pet[];
  bookings: Booking[];
  search: Search;
  draft: Draft | null;
  activePetId: string | null;
}

const initial: State = {
  pets: [],
  bookings: [],
  search: { location: "BSD & Gading Serpong", checkIn: "2026-10-12", checkOut: "2026-10-14" },
  draft: null,
  activePetId: null,
};

const KEY = "pawstay-state-v1";

interface Ctx extends State {
  ready: boolean;
  setSearch: (s: Search) => void;
  setDraft: (d: Draft | null) => void;
  savePet: (p: Pet) => void;
  setActivePet: (id: string) => void;
  addBooking: (b: Booking) => void;
  updateBooking: (id: string, patch: Partial<Booking>) => void;
}

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const value: Ctx = {
    ...state,
    ready,
    setSearch: (search) => setState((s) => ({ ...s, search })),
    setDraft: (draft) => setState((s) => ({ ...s, draft })),
    savePet: (p) =>
      setState((s) => {
        const exists = s.pets.some((x) => x.id === p.id);
        return { ...s, pets: exists ? s.pets.map((x) => (x.id === p.id ? p : x)) : [...s.pets, p], activePetId: p.id };
      }),
    setActivePet: (id) => setState((s) => ({ ...s, activePetId: id })),
    addBooking: (b) => setState((s) => ({ ...s, bookings: [b, ...s.bookings] })),
    updateBooking: (id, patch) =>
      setState((s) => ({ ...s, bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)) })),
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}

export function useActivePet() {
  const { pets, activePetId } = useStore();
  return pets.find((p) => p.id === activePetId) ?? pets[0] ?? null;
}
