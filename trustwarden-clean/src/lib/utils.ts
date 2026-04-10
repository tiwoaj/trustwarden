import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function getErrorMessage(error: string | undefined): string {
  if (!error) return "Something went wrong. Please try again.";
  if (error.toLowerCase().includes("rate limit") || error.toLowerCase().includes("too many"))
    return "Too many submissions. Please wait a few minutes before trying again.";
  if (error.toLowerCase().includes("invalid email"))
    return "Please enter a valid email address.";
  return error;
}
