"use client";   

import { RichTextEditor } from "@/app/components/richtexteditor";

export default function Journal() {

    return (
        <div className="h-screen w-screen flex flex-col gap-2 items-center justify-center relative overflow-hidden">
            <p className="italic text-gray-500">&quot; Your words are your legacy.&quot;</p>   
            <RichTextEditor onSubmit={(message: string) => console.log(message)} /> 
            
        </div>
    )
}