"use client";

import React, { useState } from "react";
import { ArticleType } from "./ArticleList";
import Article from "./Article";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DailyArticleListProps {
  articles: ArticleType[];
}

const DailyArticleList = ({ articles }: DailyArticleListProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

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

  return (
    <div className='w-full px-10'>
      <div className='my-8 flex justify-center items-center'>
        <h1 className='text-2xl md:text-3xl text-primary font-bold'>
          Manage Articles
        </h1>
      </div>
      <div className='mt-4 mb-16 flex flex-col md:flex-row justify-center items-center gap-1 md:gap-2'>
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
      <div>
        {filteredArticles.map((article) => (
          <Article
            key={article.ID}
            id={article.ID}
            title={article.Title}
            body={article.Body}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyArticleList;
