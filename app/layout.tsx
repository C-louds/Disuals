import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Particles } from "./components/magicui/particles";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Disuals',
  description: "A journaling app for writers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
          <header>
            <div className="bg-black w-full text-white flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton forceRedirectUrl={"/api/auth/signin"} />
                <SignUpButton forceRedirectUrl={"/api/auth/signup"} />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <div className="bg-black min-h-[calc(100vh-4rem)] w-full">
            <Particles
              className="absolute inset-0 z-0"
              quantity={200}
              ease={80}
              color="#ffffff"
              refresh
            />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
