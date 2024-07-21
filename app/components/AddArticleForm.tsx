"use client";

import React, { useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const insertArticle = async (e: MouseEvent) => {
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
    const API_URL = BASE_API_URL + "articles/create";

    if (!title || !description) {
      alert("Both Title and Description are required!");
      return;
    }

    try {
      const postData = JSON.stringify({ Title: title, Body: description });
      const res = await axios.post(API_URL, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        alert("Article created successfully!");
        router.push("/dashboard");
        router.refresh();
      } else {
        throw new Error("Failed to create the Article");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create the Article. Error:" + error);
    }
  };

  return (
    <div className='w-full px-4 md:px-10'>
      <div className='my-8 flex justify-center md:justify-center items-center'>
        <h1 className='text-2xl md:text-3xl text-primary font-bold'>
          Add New Article
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
            modules={quillModules}
          />
        </div>
        <div className='mt-10 flex justify-center'>
          <br />
          <button
            type='button'
            className='bg-primary mt-6 flex items-center gap-2 font-bold text-md md:text-lg transition-transform transform hover:scale-105 text-white p-3 rounded-lg shadow-lg'
            disabled={false}
            onClick={insertArticle}
          >
            <span>Add Article</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ align: [] }],
    ["clean"],
  ],
};

export default AddArticleForm;
