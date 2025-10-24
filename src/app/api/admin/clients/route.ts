import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/auth-helpers';
import { getAllClientsWithData } from '@/features/admin/api';

export async function GET() {
  try {
    // Verify the user is an admin
    await requireAdmin();
    
    // Fetch all clients with data
    const clients = await getAllClientsWithData();
    
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Error in /api/admin/clients:', error);
    
    if (error instanceof Error) {
      if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}