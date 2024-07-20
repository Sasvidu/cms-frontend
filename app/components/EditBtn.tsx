import Link from "next/link";
import React from "react";
import { HiPencilAlt } from "react-icons/hi";

interface EditBtnProps {
  href: string;
}

const EditBtn = ({ href }: EditBtnProps) => {
  return (
    <Link href={href}>
      <button
        className='bg-gray-500 text-white rounded-lg transition-transform transform hover:scale-110 hover:bg-gray-700 active:scale-95 flex items-center justify-center
          p-2
          text-xs md:text-sm lg:text-base
          w-8 md:w-10 
          h-8 md:h-10'
      >
        <HiPencilAlt size={20} className='md:size-24 lg:size-28' />
      </button>
    </Link>
  );
};

export default EditBtn;
