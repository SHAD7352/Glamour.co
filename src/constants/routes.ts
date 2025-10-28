// Route constants
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string | number) => `/products/${id}`,
  ABOUT: '/about',
  BLOG: '/blog',
  CONTACT: '/contact',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  REQUEST: (productId?: string) => productId ? `/request?productId=${productId}` : '/request',
} as const;

export const EXTERNAL_LINKS = {
  WHATSAPP: (message: string) => `https://wa.me/917654943354?text=${encodeURIComponent(message)}`,
} as const;