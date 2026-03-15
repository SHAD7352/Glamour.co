import { Product } from './productService';

interface CartItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  coverImageUrl?: string;
  imageUrls?: string[];
  shortDescription?: string;
  image?: string;
  quantity: number;
}

interface WhatsAppOrderConfig {
    phoneNumber: string; // WhatsApp business number with country code (e.g., "14155238886")
    businessName?: string;
}

// Default configuration - update this with your actual WhatsApp business number
const DEFAULT_CONFIG: WhatsAppOrderConfig = {
    phoneNumber: '919876543210', // Replace with your WhatsApp number (country code + number, no + or spaces)
    businessName: 'Glamour',
};

/**
 * Generates a formatted order message from cart items
 */
export function generateOrderMessage(
    cartItems: CartItem[],
    config: WhatsAppOrderConfig = DEFAULT_CONFIG
): string {
    const { businessName = 'Glamour' } = config;

    let message = `Hello ${businessName}! 👋\n\n`;
    message += `I would like to place an order for the following items:\n\n`;

    let subtotal = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        message += `${index + 1}. ${item.name}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: ₹${item.price.toFixed(2)}\n`;
        message += `   Subtotal: ₹${itemTotal.toFixed(2)}\n\n`;
    });

    message += `📦 Total Items: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}\n`;
    message += `💰 Total Amount: ₹${subtotal.toFixed(2)}\n\n`;
    message += `Please confirm my order. Thank you!`;

    return message;
}

/**
 * Creates a WhatsApp deep link with pre-filled message
 */
export function createWhatsAppLink(
    cartItems: CartItem[],
    config: WhatsAppOrderConfig = DEFAULT_CONFIG
): string {
    const message = generateOrderMessage(cartItems, config);
    const encodedMessage = encodeURIComponent(message);

    // Use WhatsApp API URL format
    // For mobile, wa.me works better than web.whatsapp.com
    return `https://wa.me/${config.phoneNumber}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp with the order details
 */
export function sendOrderViaWhatsApp(
    cartItems: CartItem[],
    config: WhatsAppOrderConfig = DEFAULT_CONFIG
): void {
    const whatsappUrl = createWhatsAppLink(cartItems, config);

    // Open in new window/tab
    window.open(whatsappUrl, '_blank');
}

/**
 * Generates a simple product inquiry message
 */
export function generateProductInquiry(product: Product): string {
    let message = `Hello! 👋\n\n`;
    message += `I'm interested in the following product:\n\n`;
    message += `📦 ${product.name}\n`;
    message += `💰 Price: ₹${product.price.toFixed(2)}\n\n`;
    message += `${product.description}\n\n`;
    message += `Is this item available? Thank you!`;

    return message;
}

/**
 * Opens WhatsApp to inquire about a specific product
 */
export function inquireProductViaWhatsApp(
    product: Product,
    config: WhatsAppOrderConfig = DEFAULT_CONFIG
): void {
    const message = generateProductInquiry(product);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${config.phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

export const whatsappService = {
    generateOrderMessage,
    createWhatsAppLink,
    sendOrderViaWhatsApp,
    generateProductInquiry,
    inquireProductViaWhatsApp,
};
