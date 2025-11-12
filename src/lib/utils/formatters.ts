import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A helper function to conditionally join class names.
 * Especially useful for variants in components.
 * Combines clsx and tailwind-merge for best results.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a pre-filled WhatsApp message link.
 * @param phoneNumber The phone number in international format (e.g., 919876543210).
 * @param message The raw text message you want to send.
 * @returns A string containing the full, encoded WhatsApp URL.
 */
export const createWhatsAppLink = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

// Your specific function with a hardcoded number
export const createWhatsAppLinkWithoutNo = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "919955084682";
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Formats a number into a currency string (e.g., Indian Rupees).
 * @param amount The number to format.
 * @returns A formatted currency string (e.g., "₹49.99").
 */
export const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(amount);
};
