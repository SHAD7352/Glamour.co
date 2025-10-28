// Environment configuration
export const environment = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Glamour',
} as const;