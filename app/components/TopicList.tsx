import React from "react";
import Topic from "./Topic";

interface Article {
  ID: string;
  Title: string;
  Body: string;
}

const TopicList = async () => {
  const BASE_API_URL = process.env.API_URL ?? "http://localhost:8080/";
  const API_URL = BASE_API_URL + "articles/";

  const fetchArticles = async (): Promise<Article[]> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error("Error fetching the articles:", error);
      return [];
    }
  };

  const topics = await fetchArticles();

  return (
    <div className='w-full px-10'>
      {topics.map((topic) => (
        <Topic
          key={topic.ID}
          id={topic.ID}
          title={topic.Title}
          body={topic.Body}
        />
      ))}
    </div>
  );
};

export default TopicList;
