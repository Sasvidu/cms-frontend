"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useArticleStore from "../store/articleStore";
import Article from "./Article";
import DatePicker from "react-datepicker";
import { AiOutlinePlus } from "react-icons/ai";
import { type ArticleType } from "./ArticleList";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

interface DailyArticleListProps {
  articles: ArticleType[];
}

const DailyArticleList = ({ articles }: DailyArticleListProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const router = useRouter();
  const { setArticles } = useArticleStore();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const filteredArticles = selectedDate
    ? articles.filter(
        (article) =>
          format(new Date(article.CreatedAt), "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      )
    : articles;

  const handleAddArticle = () => {
    router.push("/dashboard/addArticle");
  };

  useEffect(() => {
    setArticles(articles);
  }, [articles, setArticles]);

  return (
    <div className='w-full px-4 md:px-10'>
      <div className='my-8 flex justify-between md:justify-center items-center'>
        <h1 className='text-2xl md:text-3xl text-primary font-bold'>
          Manage Articles
        </h1>
        <button
          className='md:hidden font-bold text-md bg-primary md:text-lg transition-transform transform hover:scale-105 text-white p-3 rounded-lg shadow-lg flex justify-center items-center'
          onClick={handleAddArticle}
        >
          <span>
            <AiOutlinePlus size={14} />
          </span>
        </button>
      </div>
      <div className='mt-4 mb-16 flex justify-center md:justify-between items-center'>
        <div className='hidden md:block'>
          <button
            className='font-bold text-md bg-primary md:text-lg transition-transform transform hover:scale-105 text-white p-3 rounded-lg shadow-lg flex justify-center items-center'
            onClick={handleAddArticle}
          >
            <span>Add Article</span>
          </button>
        </div>
        <div className='flex gap-1 md:gap-2 items-center justify-center flex-col md:flex-row'>
          <span className='text-gray-600 text-md md:text-lg'>
            Select date of publication:
          </span>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat='yyyy-MM-dd'
            className='p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
            placeholderText='Select a date'
          />
        </div>
      </div>
      <div>
        {filteredArticles.map((article) => (
          <Article
            key={article.ID}
            id={article.ID}
            title={article.Title}
            body={article.Body}
          />
        ))}
        {filteredArticles.length === 0 && (
          <p className='text-gray-600 text-md md:text-lg w-full h-full flex justify-center items-center text-center'>
            No articles found for the selected date.
          </p>
        )}
      </div>
    </div>
  );
};

export default DailyArticleList;
