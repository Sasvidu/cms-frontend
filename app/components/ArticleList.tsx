import React from "react";
import DailyArticleList from "./DailyArticleList";
import axios from "axios";

interface ArticleType {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Title: string;
  Body: string;
}

const ArticleList = async () => {
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_URL = BASE_API_URL + "articles/";

  const fetchArticles = async (): Promise<ArticleType[]> => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return response.data.articles;
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
