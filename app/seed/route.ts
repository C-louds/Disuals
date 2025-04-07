/* eslint-disable */
import { neon } from '@neondatabase/serverless';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';

const mockUsers = [
  {
    user_id: `${randomUUID()}`,
    username: 'johndoe',
    email: 'john@example.com',
    password: `${randomUUID()}`
  },
  {
    user_id: `${randomUUID()}`,
    username: 'janedoe',
    email: 'jane@example.com',
    password: `${randomUUID()}`
  },
  {
    user_id: `${randomUUID()}`,
    username: 'bobsmith',
    email: 'bob@example.com',
    password: `${randomUUID()}`
  }
];
const sql = neon(process.env.DATABASE_URL!);
 async function seedUsers() {
  
  try {
    console.log('🌱 Starting database seeding...');
    
    for (const user of mockUsers) {
      const hashedPassword = await hash(user.password, 10);
      
      await sql`
        INSERT INTO Users (user_id,username, email, password)
        SELECT ${user.user_id}, ${user.username}, ${user.email}, ${hashedPassword}
        WHERE NOT EXISTS (
          SELECT 1 FROM users WHERE email = ${user.email}
        );
      `;
    }
    
    console.log('✅ Database seeding completed');
    
    // Verify seeding by counting users
    const userCount = await sql`SELECT COUNT(*) FROM users;`;
    console.log(`📊 Total users in database: ${userCount[0].count}`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

export async function GET() {
    try {
      await sql`BEGIN`;
      await seedUsers();
      await sql`COMMIT`;
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }