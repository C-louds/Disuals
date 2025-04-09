import { neon } from '@neondatabase/serverless';


export async function createUser({
  user_id,
  username,
  email,
  hashedPassword
}: {
  user_id: string;
  username: string;
  email: string;
  hashedPassword: string;
}) {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    const result = await sql`
      INSERT INTO users (user_id,username, email, password)
      SELECT ${user_id}, ${username}, ${email}, ${hashedPassword}
      WHERE NOT EXISTS (
        SELECT 1 FROM users WHERE email = ${email}
      )
      RETURNING user_id, username, email, created_at;
    `;
    return { user: result[0] };
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'Failed to create user' };
  }
}

export async function fetchUserById({ userId }: { userId: string }) {
  const sql = neon(process.env.DATABASE_URL!);

  try  {
    const result = await sql `
      SELECT * FROM users WHERE user_id = ${userId}
    `;
    return { user: result[0] };
  }
  catch(e) {
    console.error('Database error:', e);
    return { error: 'Failed to fetch user' };

  }
}


