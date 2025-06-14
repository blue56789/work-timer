import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTime(h = 0, m = 0, s = 0) {
  const date = new Date();
  date.setHours(h, m, s, 0);
  return date.getTime();
}

export function getMs(h = 0, m = 0, s = 0) {
  return (h * 3600 + m * 60 + s) * 1000;
}

export function get00(n: number) {
  return n.toString().padStart(2, "0");
}
