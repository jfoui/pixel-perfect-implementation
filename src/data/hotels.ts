import h1 from "@/assets/hotel-1.jpg";
import h2 from "@/assets/hotel-2.jpg";
import h3 from "@/assets/hotel-3.jpg";
import h4 from "@/assets/hotel-4.jpg";
import h5 from "@/assets/hotel-5.jpg";
import hero from "@/assets/hero.jpg";

export type Species = "anjing" | "kucing";
export type RoomSize = "kecil" | "sedang" | "besar";
export const FACILITIES = [
  "AC",
  "CCTV",
  "Area bermain",
  "Grooming",
  "Individual kennel",
  "Makanan",
  "Daily update",
  "Dokter hewan partner",
] as const;
export type Facility = (typeof FACILITIES)[number];

export interface Room {
  id: string;
  name: string;
  price: number;
  forText: string;
  species: Species[];
  size: RoomSize;
  features: string[];
  capacity: number;
}

export interface Hotel {
  id: string;
  name: string;
  area: string;
  city: string;
  coords: { lat: number; lng: number };
  distanceKm: number;
  rating: number;
  reviews: number;
  priceFrom: number;
  cover: string;
  gallery: { src: string; label: string }[];
  facilities: Facility[];
  species: Species[];
  description: string;
  policies: string[];
  rooms: Room[];
}

const basePolicies = [
  "Vaksin wajib (bawa buku vaksin)",
  "Bawa makanan sendiri jika diperlukan",
  "Check-in mulai 14.00",
  "Check-out maksimal 12.00",
];

const gal = (order: string[]) => {
  const map: Record<string, string> = {
    Eksterior: h1,
    Lobby: h5,
    Kamar: h3,
    Kandang: h3,
    "Area bermain": h2,
    "Tempat makan": h5,
    "Ruang kucing": h4,
    Lounge: hero,
  };
  return order.map((label) => ({ label, src: map[label] }));
};

export const HOTELS: Hotel[] = [
  {
    id: "paw-garden",
    name: "Paw Garden Hotel",
    area: "BSD",
    city: "Tangerang Selatan",
    coords: { lat: -6.3016, lng: 106.6522 },
    distanceKm: 1.2,
    rating: 4.8,
    reviews: 214,
    priceFrom: 200000,
    cover: h1,
    gallery: gal(["Eksterior", "Lobby", "Kamar", "Kandang", "Area bermain", "Tempat makan"]),
    facilities: [
      "AC",
      "CCTV",
      "Individual kennel",
      "Area bermain",
      "Makanan",
      "Grooming",
      "Daily update",
      "Dokter hewan partner",
    ],
    species: ["anjing", "kucing"],
    description:
      "Pet hotel butik dengan taman hijau di tengah BSD. Setiap tamu berbulu mendapat ruang pribadi ber-AC, jadwal bermain terpandu, dan foto update dua kali sehari.",
    policies: basePolicies,
    rooms: [
      {
        id: "std",
        name: "Standard Kennel",
        price: 200000,
        forText: "Untuk anjing kecil–medium",
        species: ["anjing"],
        size: "sedang",
        features: ["AC", "Individual space", "2x update per hari"],
        capacity: 8,
      },
      {
        id: "lg",
        name: "Large Kennel",
        price: 275000,
        forText: "Untuk anjing medium–besar",
        species: ["anjing"],
        size: "besar",
        features: ["Ruang lebih luas", "AC", "2x update per hari"],
        capacity: 4,
      },
      {
        id: "cat",
        name: "Cat Room",
        price: 150000,
        forText: "Khusus kucing",
        species: ["kucing"],
        size: "kecil",
        features: ["Ruang individual", "Cat-friendly environment", "AC"],
        capacity: 6,
      },
    ],
  },
  {
    id: "happy-tails",
    name: "Happy Tails Stay",
    area: "Gading Serpong",
    city: "Tangerang",
    coords: { lat: -6.2412, lng: 106.6283 },
    distanceKm: 2.4,
    rating: 4.7,
    reviews: 168,
    priceFrom: 160000,
    cover: h2,
    gallery: gal(["Area bermain", "Lobby", "Kandang", "Eksterior"]),
    facilities: ["AC", "Area bermain", "Grooming", "Makanan", "Daily update"],
    species: ["anjing"],
    description:
      "Spesialis anjing aktif dengan halaman bermain rumput sintetis seluas 200 m² dan sesi grooming harian.",
    policies: basePolicies,
    rooms: [
      {
        id: "std",
        name: "Cozy Kennel",
        price: 160000,
        forText: "Untuk anjing kecil",
        species: ["anjing"],
        size: "kecil",
        features: ["AC", "Bed empuk", "1x update per hari"],
        capacity: 10,
      },
      {
        id: "lg",
        name: "Play Suite",
        price: 230000,
        forText: "Untuk anjing medium–besar",
        species: ["anjing"],
        size: "besar",
        features: ["Akses halaman", "AC", "2x update per hari"],
        capacity: 5,
      },
    ],
  },
  {
    id: "cozy-paws",
    name: "Cozy Paws Residence",
    area: "Alam Sutera",
    city: "Tangerang Selatan",
    coords: { lat: -6.2235, lng: 106.6518 },
    distanceKm: 3.8,
    rating: 4.9,
    reviews: 302,
    priceFrom: 180000,
    cover: h3,
    gallery: gal(["Kamar", "Lounge", "Lobby", "Ruang kucing"]),
    facilities: [
      "AC",
      "CCTV",
      "Individual kennel",
      "Daily update",
      "Dokter hewan partner",
      "Makanan",
    ],
    species: ["anjing", "kucing"],
    description:
      "Suasana rumah yang tenang, cocok untuk hewan pemalu atau mudah cemas. Dokter hewan on-call 24 jam.",
    policies: basePolicies,
    rooms: [
      {
        id: "std",
        name: "Calm Room",
        price: 220000,
        forText: "Untuk anjing kecil–medium",
        species: ["anjing"],
        size: "sedang",
        features: ["Kedap suara", "AC", "CCTV live"],
        capacity: 6,
      },
      {
        id: "cat",
        name: "Cat Loft",
        price: 180000,
        forText: "Khusus kucing",
        species: ["kucing"],
        size: "kecil",
        features: ["Cat tree", "Jendela", "AC"],
        capacity: 8,
      },
    ],
  },
  {
    id: "milo-friends",
    name: "Milo & Friends Pet Hotel",
    area: "Bintaro",
    city: "Tangerang Selatan",
    coords: { lat: -6.2731, lng: 106.7246 },
    distanceKm: 6.5,
    rating: 4.5,
    reviews: 97,
    priceFrom: 125000,
    cover: h5,
    gallery: gal(["Lobby", "Kandang", "Area bermain"]),
    facilities: ["CCTV", "Area bermain", "Makanan"],
    species: ["anjing", "kucing"],
    description:
      "Pilihan hemat dengan staf ramah dan area bermain indoor. Cocok untuk titip singkat.",
    policies: basePolicies,
    rooms: [
      {
        id: "std",
        name: "Basic Kennel",
        price: 125000,
        forText: "Untuk anjing kecil",
        species: ["anjing"],
        size: "kecil",
        features: ["Kipas", "1x update per hari"],
        capacity: 12,
      },
      {
        id: "cat",
        name: "Cat Cabin",
        price: 110000,
        forText: "Khusus kucing",
        species: ["kucing"],
        size: "kecil",
        features: ["Ruang individual", "1x update per hari"],
        capacity: 10,
      },
    ],
  },
  {
    id: "paws-paradise",
    name: "Paws Paradise",
    area: "Pondok Indah",
    city: "Jakarta Selatan",
    coords: { lat: -6.2655, lng: 106.7843 },
    distanceKm: 11.3,
    rating: 4.9,
    reviews: 421,
    priceFrom: 350000,
    cover: hero,
    gallery: gal(["Lounge", "Kamar", "Area bermain", "Ruang kucing", "Lobby"]),
    facilities: [
      "AC",
      "CCTV",
      "Individual kennel",
      "Area bermain",
      "Grooming",
      "Makanan",
      "Daily update",
      "Dokter hewan partner",
    ],
    species: ["anjing", "kucing"],
    description:
      "Resort hewan premium dengan suite pribadi, kolam renang anjing, dan laporan video harian.",
    policies: basePolicies,
    rooms: [
      {
        id: "lg",
        name: "Royal Suite",
        price: 450000,
        forText: "Untuk semua ukuran anjing",
        species: ["anjing"],
        size: "besar",
        features: ["Suite pribadi", "Kolam renang", "Video harian"],
        capacity: 3,
      },
      {
        id: "std",
        name: "Deluxe Kennel",
        price: 350000,
        forText: "Untuk anjing kecil–medium",
        species: ["anjing"],
        size: "sedang",
        features: ["AC", "Grooming gratis", "3x update"],
        capacity: 6,
      },
      {
        id: "cat",
        name: "Kitty Villa",
        price: 300000,
        forText: "Khusus kucing",
        species: ["kucing"],
        size: "sedang",
        features: ["Villa bertingkat", "AC", "Video harian"],
        capacity: 4,
      },
    ],
  },
];

export const getHotel = (id: string) => HOTELS.find((h) => h.id === id);
