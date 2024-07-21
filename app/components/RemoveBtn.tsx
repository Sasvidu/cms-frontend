"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi";

interface RemoveBtnProps {
  id: string;
  title: string;
}

const RemoveBtn = ({ id, title }: RemoveBtnProps) => {
  const router = useRouter();

  const removeArticle = async () => {
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_URL = `${BASE_API_URL}articles/delete/${id}`;

    const confirmed = confirm(`Do you want to delete ${title}?`);
    if (confirmed) {
      try {
        const res = await axios.delete(API_URL);
        if (res.status === 200) {
          router.refresh();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.message);
          alert(`Error: ${error.message}`);
        } else {
          console.error("Unexpected Error:", error);
          alert(`Unexpected Error: ${error}`);
        }
      }
    }
  };

  return (
    <button
      onClick={removeArticle}
      className='bg-primary text-white rounded-lg transition-transform transform hover:scale-110 hover:bg-primary-dark active:scale-95 flex items-center justify-center
      p-2
      text-xs md:text-sm lg:text-base
      w-8 md:w-10
      h-8 md:h-10'
    >
      <HiOutlineTrash size={20} className='md:size-24 lg:size-28' />
    </button>
  );
};

export default RemoveBtn;
