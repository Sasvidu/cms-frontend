import React from "react";
import ReadOnlyRichText from "./ReadOnlyRichText";
import ArticleImage from "./ArticleImage";

interface ReadOnlyArticleProps {
  id: number;
  title: string;
  body: string;
}

const ReadOnlyArticle = ({ id, title, body }: ReadOnlyArticleProps) => {
  return (
    <div className='my-4 flex flex-col items-start justify-between rounded-lg border border-primary-light shadow-lg p-6 bg-gradient-to-br from-gray-50 to-white transform transition-transform hover:scale-[102%] hover:shadow-2xl'>
      <div className='flex items-start justify-between w-full'>
        <h2 className='text-primary text-xl md:text-2xl font-bold mb-2'>
          {title}
        </h2>
      </div>
      <ReadOnlyRichText content={body} />
      <ArticleImage articleId={id} />
    </div>
  );
};

export default ReadOnlyArticle;
