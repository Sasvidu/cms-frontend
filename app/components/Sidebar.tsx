"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signout } from "@/utils/Authentication";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signout();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
      } else {
        console.error("An unknown error occurred");
        alert("An unknown error occurred");
      }
    } finally {
      router.push("/");
    }
  };

  return (
    <div className='hidden md:flex flex-col w-64 bg-gradient-to-br from-primary-light to-primary text-white p-6 shadow-lg'>
      <h2 className='text-2xl font-bold mb-6'>NewsNexus</h2>
      <ul>
        <li className='mb-4'>
          <Link
            href='/dashboard'
            className='block py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-primary-dark text-xl font-semibold'
          >
            News Articles
          </Link>
        </li>
        <li className='mb-4'>
          <Link
            href='/dashboard/users'
            className='block py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-primary-dark text-xl font-semibold'
          >
            Users
          </Link>
        </li>
        <li>
          <button
            className='w-full text-left py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-primary-dark text-xl font-semibold'
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
