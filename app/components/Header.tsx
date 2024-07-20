"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signout } from "@/utils/Authentication";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className='md:hidden bg-gradient-to-br from-primary-light to-primary text-white p-4 flex items-center justify-between shadow-lg'>
      <h1 className='text-xl font-bold'>Dashboard</h1>
      <button onClick={() => setIsOpen(!isOpen)} className='text-2xl'>
        {isOpen ? <IoMdClose /> : <HiMenu />}
      </button>
      {isOpen && (
        <div className='absolute top-16 right-0 z-50 w-48 bg-gradient-to-br from-primary-light to-primary text-white shadow-lg rounded-lg'>
          <ul className='p-4'>
            <li className='mb-4'>
              <Link
                href='/dashboard'
                className='block py-1 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-primary-dark text-lg font-semibold'
              >
                News Articles
              </Link>
            </li>
            <li className='mb-4'>
              <Link
                href='/dashboard/users'
                className='block py-1 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-primary-dark text-lg font-semibold'
              >
                Users
              </Link>
            </li>
            <li>
              <button
                className='w-full text-left py-1 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-primary-dark text-lg font-semibold'
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
