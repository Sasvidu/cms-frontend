"use client";

import React, { useState, useEffect, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import useArticleStore from "../store/articleStore";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/config/firebase";

interface EditArticleFormProps {
  articleId: string;
}

const EditArticleForm = ({ articleId }: EditArticleFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const { getArticleById } = useArticleStore();

  useEffect(() => {
    const article = getArticleById(Number(articleId));
    if (article) {
      setTitle(article.Title);
      setDescription(article.Body);
    }
  }, [articleId, getArticleById]);

  const updateArticle = async (e: MouseEvent) => {
    e.preventDefault();

    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_URL = BASE_API_URL + `articles/edit/${articleId}`;

    if (!title || !description) {
      alert("Both Title and Description are required!");
      return;
    }

    try {
      // Update the article text
      const putData = JSON.stringify({ Title: title, Body: description });
      await axios.put(API_URL, putData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle image upload if a new one is selected
      if (imageFile) {
        const folderRef = ref(storage, `articles/${articleId}`);
        const imageList = await listAll(folderRef);
        if (imageList.items.length > 0) {
          const firstImageRef = imageList.items[0];
          await deleteObject(firstImageRef);
        }
        const imageRef = ref(
          storage,
          `articles/${articleId}/${imageFile.name}`
        );
        const uploadTask = uploadBytesResumable(imageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
          },
          () => {
            alert("Article updated successfully with new image!");
          }
        );
      } else {
        alert("Article updated successfully!");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update the Article. Error: " + error);
    }
  };

  return (
    <div className='w-full px-4 md:px-10'>
      <div className='my-8 flex justify-center md:justify-center items-center'>
        <h1 className='text-2xl md:text-3xl text-primary font-bold'>
          Edit Article
        </h1>
      </div>

      <form className='space-y-6'>
        <div className='flex flex-col'>
          <label
            htmlFor='title'
            className='text-lg font-semibold text-gray-700 mb-2'
          >
            Title:
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='border border-primary-light px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full'
          />
        </div>
        <div className='flex flex-col mt-4'>
          <label
            htmlFor='description'
            className='text-lg font-semibold text-gray-700 mb-2'
          >
            Description:
          </label>
          <ReactQuill
            id='description'
            value={description}
            onChange={(value) => setDescription(value)}
            className='border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full'
            theme='snow'
          />
        </div>
        <div className='flex flex-col mt-4'>
          <label
            htmlFor='image'
            className='text-lg font-semibold text-gray-700 mb-2'
          >
            Image:
          </label>
          <input
            type='file'
            id='image'
            accept='image/*'
            onChange={(e) => {
              if (e.target.files) {
                setImageFile(e.target.files[0]);
              }
            }}
            className='border border-primary-light px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full'
          />
        </div>
        <div className='mt-10 flex justify-center'>
          <br />
          <button
            type='button'
            className='bg-primary mt-6 flex items-center gap-2 font-bold text-md md:text-lg transition-transform transform hover:scale-[102%] text-white p-3 rounded-lg shadow-lg'
            onClick={updateArticle}
          >
            <span>Update Article</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticleForm;
