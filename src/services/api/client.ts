import axios from 'axios';
import { environment } from '@/config/environment';

// Create a central API client
export const apiClient = axios.create({
  baseURL: environment.apiUrl || "https://localhost:7188/api",
  headers: {
    'Content-Type': 'application/json',
  },
});