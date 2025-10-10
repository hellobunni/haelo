export type UserRole = "admin" | "client";

export interface User {
  id: string;
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  company?: string;
  phone?: string;
  createdAt?: string;
}

export type MockUser = User;


