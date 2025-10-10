import type { User, MockUser } from "@/types";

export const MOCK_USERS: MockUser[] = [
  {
    id: "user_admin_001",
    email: "lynae@mattedigital.com",
    password: "admin123",
    full_name: "Lynae Robinson",
    role: "admin",
    company: "Matte Digital",
    phone: "+1 (555) 123-4567",
    createdAt: "2024-01-15",
  },
  {
    id: "user_client_001",
    email: "sarah@example.com",
    password: "client123",
    full_name: "Sarah Johnson",
    role: "client",
    company: "Johnson & Co",
    phone: "+1 (555) 234-5678",
    createdAt: "2025-08-20",
  },
  {
    id: "user_client_002",
    email: "michael@techstartup.com",
    password: "client123",
    full_name: "Michael Chen",
    role: "client",
    company: "TechStartup Inc",
    phone: "+1 (555) 345-6789",
    createdAt: "2025-07-10",
  },
  {
    id: "user_client_003",
    email: "emily@designco.com",
    password: "client123",
    full_name: "Emily Rodriguez",
    role: "client",
    company: "Design Co.",
    phone: "+1 (555) 456-7890",
    createdAt: "2025-08-01",
  },
  {
    id: "user_client_004",
    email: "david@smallbiz.com",
    password: "client123",
    full_name: "David Thompson",
    role: "client",
    company: "Small Business LLC",
    phone: "+1 (555) 567-8901",
    createdAt: "2025-09-15",
  },
];

export async function getAllUsers(): Promise<User[]> {
  console.log("📋 [Mock] Returning all mock users");
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_USERS;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  console.log(`🔍 [Mock] Finding user by email: ${email}`);
  await new Promise((r) => setTimeout(r, 200));
  const user = MOCK_USERS.find((u) => u.email === email);
  return user || null;
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<User | null> {
  console.log(`🔐 [Mock] Authenticating user: ${email}`);
  await new Promise((r) => setTimeout(r, 500));
  
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password,
  );
  
  if (user) {
    console.log(`✅ [Mock] Authentication successful for: ${email}`);
    return user;
  }
  
  console.log(`❌ [Mock] Authentication failed for: ${email}`);
  return null;
}

export function getCurrentMockUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  
  const storedEmail = localStorage.getItem("currentUserEmail");
  if (!storedEmail) return null;
  
  return MOCK_USERS.find((u) => u.email === storedEmail) || null;
}

export function setCurrentMockUser(email: string | null): void {
  if (typeof window === "undefined") return;
  
  if (email) {
    localStorage.setItem("currentUserEmail", email);
    console.log(`✅ [Mock] Current user set to: ${email}`);
  } else {
    localStorage.removeItem("currentUserEmail");
    console.log("🚪 [Mock] User logged out");
  }
}

// Helper functions for backward compatibility
export function getAllMockUsers(): MockUser[] {
  return MOCK_USERS;
}

export async function mockLogin(email: string): Promise<MockUser | null> {
  console.log(`🔐 [Mock] Login attempt for: ${email}`);
  await new Promise((r) => setTimeout(r, 500));
  
  const user = MOCK_USERS.find((u) => u.email === email);
  
  if (user) {
    setCurrentMockUser(email);
    console.log(`✅ [Mock] Login successful for: ${email}`);
    return user;
  }
  
  console.log(`❌ [Mock] Login failed - user not found: ${email}`);
  return null;
}

export function mockLogout(): void {
  setCurrentMockUser(null);
  console.log("🚪 [Mock] User logged out");
}

