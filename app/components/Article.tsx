import React from "react";
import RemoveBtn from "./RemoveBtn";
import EditBtn from "./EditBtn";
import ReadOnlyRichText from "./ReadOnlyRichText";

interface ArticleProps {
  id: number;
  title: string;
  body: string;
}

const Article = ({ id, title, body }: ArticleProps) => {
  return (
    <>
      <div className='md:hidden my-4 flex flex-col items-start justify-between rounded-lg border border-primary-light shadow-lg p-6 bg-gradient-to-br from-gray-50 to-white transform transition-transform hover:scale-[102%] hover:shadow-2xl'>
        <div className='flex items-start justify-between w-full'>
          <h2 className='text-primary text-xl md:text-2xl font-bold mb-2'>
            {title}
          </h2>
          <div className='flex gap-1 md:gap-2'>
            <RemoveBtn id={id.toString()} title={title} />
            <EditBtn href={`dashboard/editArticle/${id}`} />
          </div>
        </div>
        <ReadOnlyRichText content={body} />{" "}
      </div>

      <div className='hidden md:flex my-4 items-start justify-between rounded-lg border border-primary-light shadow-lg p-6 bg-gradient-to-br from-gray-50 to-white transform transition-transform hover:scale-[102%] hover:shadow-2xl'>
        <div>
          <h2 className='text-primary text-xl md:text-2xl font-bold mb-2'>
            {title}
          </h2>
          <ReadOnlyRichText content={body} />{" "}
        </div>
        <div className='flex gap-1 md:gap-2'>
          <RemoveBtn id={id.toString()} title={title} />
          <EditBtn href={`dashboard/editArticle/${id}`} />
        </div>
      </div>
    </>
  );
};

export default Article;
