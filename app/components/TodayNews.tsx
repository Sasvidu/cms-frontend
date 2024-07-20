import React from "react";
import axios from "axios";
import { type ArticleType } from "./ArticleList";
import ReadOnlyArticle from "./ReadOnlyArticle";

const TodayNews = async () => {
  const BASE_API_URL = process.env.API_URL ?? "http://localhost:8080/";
  const API_URL = BASE_API_URL + "articles/all";

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
  const todayArticles = articles.filter((article) => {
    const articleDate = new Date(article.CreatedAt);
    const today = new Date();
    return articleDate.toDateString() === today.toDateString();
  });

  return (
    <div>
      {todayArticles.map((article) => (
        <ReadOnlyArticle
          key={article.ID}
          title={article.Title}
          body={article.Body}
        />
      ))}
    </div>
  );
};

export default TodayNews;
