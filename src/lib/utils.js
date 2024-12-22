import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDDMMYYYYDate(date, opts = {}) {
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Intl.DateTimeFormat("en-GB", {
    day: opts.day ?? "2-digit",
    month: opts.month ?? "2-digit",
    year: opts.year ?? "numeric",
    hour: opts.hour ?? "2-digit",
    minute: opts.minute ?? "2-digit",
    timeZone: opts.timeZone ?? clientTimeZone,
    ...opts,
  }).format(new Date(date));
}