"use client";

import React from "react";
import DOMPurify from "dompurify";

interface ReadOnlyRichTextProps {
  content: string;
}

const ReadOnlyRichText = ({ content }: ReadOnlyRichTextProps) => {
  //const sanitizedContent = DOMPurify.sanitize(content);
  const sanitizedContent = content;

  return (
    <div
      className='reset-rich-text'
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default ReadOnlyRichText;
