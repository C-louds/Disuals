"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
//import { NextResponse } from 'next/server';

export function Book() {
    const userId = useAuth();
    //console.log(userId);
    const [books, setBooks] = useState<any[]>([]);
       
    
    useEffect(() => {
          async function fetchBooks() {
              if (!userId) return;
              
              try {
               
                const response = await fetch('/api/books');
                
                if (!response.ok) {
                  throw new Error('Failed to fetch books');
                }
                
                const data = await response.json();
                console.log(data)
                setBooks(data);
              } catch (err) {
           
                console.error('Error fetching books:', err);
              }
            }
        
        fetchBooks();}
        , [userId]);
    
    return (
        <div>
            <div className="flex flex-col gap-3 p-6 bg-purple-900 text-white rounded-xl shadow-[0_0_65px_rgba(30,0,140,0.5)] floating-text">
            <button className="p-2 bg-purple-900 text-white rounded-xl shadow-[0_0_65px_rgba(30,0,140,0.5)] floating-text">Start A New Book!</button>
                 {books.length > 0 && books.map((book) => {
                    return (
                        <div key={book.book_id} className="flex flex-row p-6  bg-purple-900 text-white rounded-xl shadow-[0_0_65px_rgba(30,0,140,0.5)] floating-text">
                            <p className="text-gray-200">{book.title}</p>
                            <p className="text-gray-200">{book.description}</p>
                        </div>
                    )
                 })}
            
            </div>
        </div>
    )
}