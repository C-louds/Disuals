import { auth } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
  const { userId } = await auth();
  
  // If no userId, user is not authenticated
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  const sql = neon(process.env.DATABASE_URL!);
  
  try {
    // Fetch books for this user
    const books = await sql`
      SELECT * FROM books 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;
    
    return new Response(JSON.stringify(books), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    
  }
}