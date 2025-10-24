import { createClient } from '@/lib/supabase/server'
import type { User } from '@/types'

/**
 * Get the currently logged in user with profile data
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  
  const { data: { user: authUser } } = await supabase.auth.getUser()
  
  if (!authUser) return null

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single()

  if (!profile) return null

  return {
    id: profile.id,
    email: profile.email,
    password: '', // Never expose password
    full_name: profile.full_name,
    role: profile.role,
    company: profile.company,
    phone: profile.phone,
    createdAt: profile.created_at,
  }
}

/**
 * Require authentication - throws if not logged in
 * Use in Server Components/Actions that need auth
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  return user
}

/**
 * Require admin role - throws if not admin
 * Use in Server Components/Actions that need admin access
 */
export async function requireAdmin() {
  const user = await requireAuth()
  
  if (user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required')
  }
  
  return user
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}