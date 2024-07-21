import Link from "next/link";
import TodayNews from "./components/TodayNews";
import { AiOutlineLogin } from "react-icons/ai";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col'>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary-light to-primary text-white text-center py-20'>
        <h1 className='text-4xl md:text-7xl font-bold mb-6'>
          Welcome to News Nexus
        </h1>
        <Link href='/login'>
          <button className='bg-primary-dark hover:bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105 hover:text-black hover:bg-white'>
            <AiOutlineLogin size={20} />
            <span>Login</span>
          </button>
        </Link>
      </div>

      <div className='w-full px-4 md:px-10 lg:px-12 py-10'>
        <div className='flex justify-center items-center text-primary font-bold text-3xl py-4'>
          Today News
        </div>
        <TodayNews />
      </div>
    </main>
  );
}
