import { create } from "zustand";
import { type ArticleType } from "../components/ArticleList";

interface ArticleStoreState {
  articles: ArticleType[];
  setArticles: (articles: ArticleType[]) => void;
  getArticleById: (articleId: number) => ArticleType | null;
}

const useArticleStore = create<ArticleStoreState>((set, get) => ({
  articles: [],
  setArticles: (articles) => set({ articles }),
  getArticleById: (articleId: number) => {
    const foundArticle = get().articles.find(
      (article) => article.ID === articleId
    );
    return foundArticle || null;
  },
}));

export default useArticleStore;
