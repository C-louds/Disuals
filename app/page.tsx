import Link  from 'next/link'
import { Meteors } from "./components/magicui/meteors";
import "@/app/components/styles/styles.css";

export default function Home() {  
  return (
   <div className="h-screen w-screen flex flex-col gap-2 items-center justify-center relative overflow-hidden">
    
      
      <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_45px_rgba(30,0,140,0.5)] floating-text">Welcome,</h1>
      <p className="text-gray-200 text-xl floating-text drop-shadow-[0_0_45px_rgba(30,0,140,0.5)]">the successor of star dusts!</p>
      <Link href="/journal">
      <button 
      className="bg-black/10 mt-2 px-7 py-2 text-white cursor-pointer rounded-xl border-2 shadow-[0_0_65px_rgba(255,255,255,0.2)] floating-text">
      <span className="drop-shadow-[0_0_10px_rgba(30,0,140,0.5)]">Journal</span>
      </button>
      </Link>
      <Meteors className="absolute inset-0 z-0" number={20} minDelay={0.2} maxDelay={1.2} minDuration={2} maxDuration={10} angle={215} />
      <p className="italic text-gray-500">"Trees carry their legacy through books." <br/> Maybe try carrying yours through words.</p>
   </div>
  );
}
  