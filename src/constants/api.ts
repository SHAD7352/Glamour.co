// API related constants
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  BLOGS: '/api/blogs',
  CONTACT: '/api/contact',
} as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const WHATSAPP_CONFIG = {
  COUNTRY_CODE: '91',
  NUMBER: '7654943354',
} as const;