import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navigationItems = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Process", url: "/process" },
  { name: "Work", url: "/work" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];

// Logo for light backgrounds (blue/black logo)
export const LOGO_URL =
  "https://res.cloudinary.com/bytebeardigital/image/upload/v1762869041/Haelo%20Studios/log/svg/haelo-blue-black_edmsvy.svg";

// Logo for dark backgrounds and meta images (same as site logo)
export const DARK_LOGO_URL =
  "https://res.cloudinary.com/bytebeardigital/image/upload/v1762869041/Haelo%20Studios/log/svg/haelo-blue-black_edmsvy.svg";
