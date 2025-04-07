"use server";

import { createUser } from '@/app/lib/db/user';
import { auth, clerkClient } from '@clerk/nextjs/server';

import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET(request: Request) {
    try {
        const { userId } = await auth();
        
        // If no userId, redirect to journal which forces user to signup/in aka Jugad
        if (!userId) {
            return NextResponse.redirect(new URL('/journal', request.url));
        }

        const client = await clerkClient();
        const user = await client.users.getUser(userId)

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

       console.log(`🌱 Adding a new user ${user.username}...`);
        const newUser = await createUser({
            user_id: userId,
            username: user.username || `user_${userId}`,
            email: user.emailAddresses[0]?.emailAddress || '',
            hashedPassword: userId, // Use Clerk's userId as reference
        });

        if (!newUser) {
            return NextResponse.json(
                { error: 'Failed to create user' },
                { status: 400 }
            );
        }
        console.log(`✅ User ${user.username} added successfully...`);
        // Redirect to journal page after successful signup
        return NextResponse.redirect(new URL('/journal', request.url));

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
