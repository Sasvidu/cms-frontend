"use client";

import React, { useState, useEffect, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface EditArticleFormProps {
  articleId: string;
}

const EditArticleForm = ({ articleId }: EditArticleFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (articleId) {
      const fetchArticle = async () => {
        try {
          const BASE_API_URL = process.env.API_URL ?? "http://localhost:8080/";
          const API_URL = BASE_API_URL + `articles/${articleId}`;

          const res = await axios.get(API_URL);
          const article = res.data.article;
          const title = article.Title;
          const body = article.Body;

          setTitle(title);
          setDescription(body);
        } catch (error) {
          console.error(error);
          alert("Failed to fetch the Article. Error: " + error);
        }
      };

      fetchArticle();
    }
  }, []);

  const updateArticle = async (e: MouseEvent) => {
    const BASE_API_URL = process.env.API_URL ?? "http://localhost:8080/";
    const API_URL = BASE_API_URL + `articles/edit/${articleId}`;

    if (!title || !description) {
      alert("Both Title and Description are required!");
      return;
    }

    try {
      const putData = JSON.stringify({ Title: title, Body: description });
      const res = await axios.put(API_URL, putData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        alert("Article updated successfully!");
        router.push("/dashboard");
        router.refresh();
      } else {
        throw new Error("Failed to update the Article");
      }
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
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='border border-primary-light px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full'
            rows={6}
          ></textarea>
        </div>
        <div className='mt-10 flex justify-center'>
          <br />
          <button
            type='button'
            className='bg-primary mt-6 flex items-center gap-2 font-bold text-md md:text-lg transition-transform transform hover:scale-105 text-white p-3 rounded-lg shadow-lg'
            disabled={false}
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
