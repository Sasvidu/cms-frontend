import Link from "next/link";
import React from "react";
import { HiPencilAlt } from "react-icons/hi";

interface EditBtnProps {
  href: string;
}

const EditBtn = ({ href }: EditBtnProps) => {
  return (
    <Link href={href}>
      <button className='p-2 bg-gray-500 text-white rounded-lg transition-transform transform hover:scale-110 hover:bg-gray-700 active:scale-95'>
        <HiPencilAlt size={24} />
      </button>
    </Link>
  );
};

export default EditBtn;
