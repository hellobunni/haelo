

import AdminDashboardContent from '@/features/admin/components/AdminCashboardContent'
import { getCurrentUser } from '@/lib/supabase/auth-helpers'
import React from 'react'

const AdminDashboard = async () => {
  const currentUser = await getCurrentUser()

  console.log(currentUser)
  
  return <AdminDashboardContent />
}

export default AdminDashboard