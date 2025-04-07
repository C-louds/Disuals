"use server";

import { fetchUserById } from '@/app/lib/db/user';
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
           const userData = await fetchUserById({ userId });
           if(!userData) {
            //Again same Jugad for now
            return NextResponse.redirect( new URL('/journal', request.url));
        }
        console.log(` ✅ User: ${user.username} signed in successfully...`);
        // Redirect to journal page after successful signin
        return NextResponse.redirect(new URL('/journal', request.url));

   } catch(e) {
       console.error('Signin error:', e);
       return NextResponse.json(
           { error: 'Internal Server Error' },
           { status: 500 }
       );
   }
}
