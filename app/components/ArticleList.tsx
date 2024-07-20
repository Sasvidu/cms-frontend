import React from "react";
import DailyArticleList from "./DailyArticleList";

interface ArticleType {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Title: string;
  Body: string;
}

const ArticleList = async () => {
  const BASE_API_URL = process.env.API_URL ?? "http://localhost:8080/";
  const API_URL = BASE_API_URL + "articles/";

  const fetchArticles = async (): Promise<ArticleType[]> => {
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

  const articles = await fetchArticles();

  return <DailyArticleList articles={articles} />;
};

export default ArticleList;
export type { ArticleType };
