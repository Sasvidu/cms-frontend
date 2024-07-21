"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

interface ArticleImageProps {
  articleId: number;
}

const ArticleImage = ({ articleId }: ArticleImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageNotFound, setImageNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const listRef = ref(storage, `articles/${articleId}`);
        const res = await listAll(listRef);
        if (res.items.length > 0) {
          const imageRef = res.items[0]; // Get the first image in the folder
          const url = await getDownloadURL(imageRef);
          console.log("Fetched image URL:", url);
          setImageUrl(url);
        } else {
          setImageNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageNotFound(true);
      }
    };

    fetchImage();
  }, [articleId]);

  const renderImage = () => {
    if (imageNotFound) {
      return <p className='text-center text-gray-500'></p>;
    } else {
      return <p className='text-center text-gray-500'>Loading image...</p>;
    }
  };

  return (
    <>
      {imageUrl ? (
        <div className='w-full max-w-[35rem] flex justify-center my-4'>
          <Image
            src={imageUrl}
            alt={`Article ${articleId}`}
            className='rounded-lg shadow-md'
            layout='responsive'
            width={500}
            height={275}
          />
        </div>
      ) : (
        renderImage()
      )}
    </>
  );
};

export default ArticleImage;
