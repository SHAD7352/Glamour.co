export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponseDto {
  token: string;
  user: UserDto;
}