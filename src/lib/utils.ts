import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatPKR(value: number): string {
  return (
    "Rs." +
    value.toLocaleString("en-PK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export function getEstimatedDelivery(): string {
  const today = new Date();
  const minDays = 2;
  const maxDays = 5;

  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-PK", { month: "short", day: "numeric" });

  return `${formatDate(minDate)} – ${formatDate(maxDate)}`;
}
