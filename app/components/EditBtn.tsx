import React from "react";
import { useRouter } from "next/navigation";
import { HiPencilAlt } from "react-icons/hi";

interface EditBtnProps {
  href: string;
}

const EditBtn = ({ href }: EditBtnProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(href);
  };

  return (
    <button
      className='bg-gray-500 text-white rounded-lg transition-transform transform hover:scale-110 hover:bg-gray-700 active:scale-95 flex items-center justify-center
          p-2
          text-xs md:text-sm lg:text-base
          w-8 md:w-10 
          h-8 md:h-10'
      onClick={handleEdit}
    >
      <HiPencilAlt size={20} className='md:size-24 lg:size-28' />
    </button>
  );
};

export default EditBtn;
