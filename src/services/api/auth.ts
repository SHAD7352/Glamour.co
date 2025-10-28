import { apiClient } from './client';
import { RegisterDto, LoginDto, AuthResponseDto } from '@/types/api/auth';

export const authApi = {
  register: async (data: RegisterDto): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginDto): Promise<AuthResponseDto> => {
    debugger;
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },
};