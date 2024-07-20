import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className='hidden md:flex flex-col w-64 bg-gradient-to-br from-primary-light to-primary text-white p-6 shadow-lg'>
      <h2 className='text-2xl font-bold mb-6'>Dashboard</h2>
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
          <button className='w-full text-left py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-primary-dark text-xl font-semibold'>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
