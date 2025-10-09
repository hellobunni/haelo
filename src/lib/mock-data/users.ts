// Mock user data for testing without backend

export interface MockUser {
  id: string;
  created_date: string;
  updated_date: string;
  created_by: string;
  full_name: string;
  email: string;
  role: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "user_001",
    created_date: "2025-01-15T10:00:00Z",
    updated_date: "2025-10-01T14:30:00Z",
    created_by: "admin",
    full_name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "client"
  },
  {
    id: "user_002",
    created_date: "2025-02-20T09:15:00Z",
    updated_date: "2025-09-28T16:45:00Z",
    created_by: "admin",
    full_name: "Michael Chen",
    email: "michael@techstartup.com",
    role: "client"
  },
  {
    id: "user_003",
    created_date: "2025-03-10T11:30:00Z",
    updated_date: "2025-10-05T08:20:00Z",
    created_by: "admin",
    full_name: "Emily Rodriguez",
    email: "emily@designco.com",
    role: "client"
  },
  {
    id: "user_004",
    created_date: "2025-04-05T14:00:00Z",
    updated_date: "2025-10-08T10:15:00Z",
    created_by: "admin",
    full_name: "David Kim",
    email: "david@smallbiz.com",
    role: "client"
  },  {
    id: "user_005",
    created_date: "2025-04-05T14:00:00Z",
    updated_date: "2025-10-08T10:15:00Z",
    created_by: "admin",
    full_name: "Lynae Thomas",
    email: "lynae@mattedigital.com",
    role: "admin"
  }
];

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

/**
 * Get user by email (mock authentication)
 */
export function getMockUserByEmail(email: string): MockUser | null {
  console.log(`🔍 [Mock] Looking up user by email: ${email}`);
  const user = MOCK_USERS.find(u => u.email === email);
  
  if (user) {
    console.log(`✅ [Mock] User found:`, user);
  } else {
    console.log(`❌ [Mock] No user found with email: ${email}`);
  }
  
  return user || null;
}

/**
 * Get user by ID
 */
export function getMockUserById(id: string): MockUser | null {
  console.log(`🔍 [Mock] Looking up user by ID: ${id}`);
  const user = MOCK_USERS.find(u => u.id === id);
  
  if (user) {
    console.log(`✅ [Mock] User found:`, user);
  } else {
    console.log(`❌ [Mock] No user found with ID: ${id}`);
  }
  
  return user || null;
}

/**
 * Get all mock users (for testing/demo purposes)
 */
export function getAllMockUsers(): MockUser[] {
  console.log(`📋 [Mock] Returning all ${MOCK_USERS.length} mock users`);
  return MOCK_USERS;
}

/**
 * Mock login function
 */
export async function mockLogin(email: string): Promise<MockUser | null> {
  if (!isBrowser()) {
    console.error("❌ [Mock] Cannot login - not in browser environment");
    return null;
  }

  console.log(`🔐 [Mock] Attempting login for: ${email}`);
  
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));
  
  const user = getMockUserByEmail(email);
  
  if (user) {
    console.log(`✅ [Mock] Login successful for ${user.full_name}`);
    // Store in localStorage
    localStorage.setItem("mock_current_user", JSON.stringify(user));
    localStorage.setItem("mock_logged_in", "true");
  } else {
    console.log(`❌ [Mock] Login failed - user not found`);
  }
  
  return user;
}

/**
 * Mock logout function
 */
export function mockLogout(): void {
  if (!isBrowser()) {
    console.error("❌ [Mock] Cannot logout - not in browser environment");
    return;
  }

  console.log(`🔐 [Mock] Logging out current user`);
  localStorage.removeItem("mock_current_user");
  localStorage.removeItem("mock_logged_in");
  console.log(`✅ [Mock] Logout complete`);
}

/**
 * Get currently logged in user from localStorage
 */
export function getCurrentMockUser(): MockUser | null {
  if (!isBrowser()) {
    console.log(`❌ [Mock] Not in browser environment, cannot access localStorage`);
    return null;
  }

  const isLoggedIn = localStorage.getItem("mock_logged_in") === "true";
  
  if (!isLoggedIn) {
    console.log(`❌ [Mock] No user currently logged in`);
    return null;
  }
  
  const userJson = localStorage.getItem("mock_current_user");
  
  if (!userJson) {
    console.log(`❌ [Mock] User logged in but no user data found`);
    return null;
  }
  
  try {
    const user = JSON.parse(userJson) as MockUser;
    console.log(`✅ [Mock] Current user:`, user);
    return user;
  } catch (error) {
    console.error(`❌ [Mock] Error parsing user data:`, error);
    return null;
  }
}
