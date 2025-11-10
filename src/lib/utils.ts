import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navigationItems = [
  { name: "Work", url: "/work" },
  { name: "Services", url: "/services" },
  { name: "Process", url: "/process" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];
