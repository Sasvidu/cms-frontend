import React from "react";
import RemoveBtn from "./RemoveBtn";
import EditBtn from "./EditBtn";

interface TopicProps {
  id: string;
  title: string;
  body: string;
}

const Topic = ({ id, title, body }: TopicProps) => {
  return (
    <div className='my-4 flex items-start justify-between rounded-lg border border-primary-light shadow-lg p-6 bg-gradient-to-br from-gray-50 to-white transform transition-transform hover:scale-[102%] hover:shadow-2xl'>
      <div>
        <h2 className='text-primary text-xl md:text-2xl font-bold mb-2'>
          {title}
        </h2>
        <p className='text-gray-800 text-md md:text-lg'>{body}</p>
      </div>
      <div className='flex gap-2'>
        <RemoveBtn id={id} title={title} />
        <EditBtn href={`editTopic/${id}`} />
      </div>
    </div>
  );
};

export default Topic;
