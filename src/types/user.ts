export type UserRole = "admin" | "client";

export interface User {
  id: string;
  email: string;
  password: string; // Never populated in responses
  full_name: string;
  role: UserRole;
  company?: string;
  phone?: string;
  stripe_customer_id?: string; // NEW: For Stripe integration
  createdAt?: string;
  updatedAt?: string; // NEW: Tracking field
}

export type MockUser = User;
