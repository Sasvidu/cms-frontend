"use client";

import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

interface RemoveBtnProps {
  id: string;
  title: string;
}

const RemoveBtn = ({ id, title }: RemoveBtnProps) => {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm(`Do you want to delete ${title}?`);
    if (confirmed) {
      // const res = await fetch(`../api/topics?id=${id}`, {
      //   method: "DELETE",
      // });
      // if (res.ok) {
      //   router.refresh();
      // }
    }
  };

  return (
    <button
      onClick={removeTopic}
      className='p-2 bg-primary text-white rounded-lg transition-transform transform hover:scale-110 hover:bg-primary-dark active:scale-95'
    >
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
