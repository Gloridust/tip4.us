// src/components/Article.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchArticle } from '../utils/fetchArticles';

const Article = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      const articleContent = await fetchArticle(slug);
      setContent(articleContent);
    };
    loadArticle();
  }, [slug]);

  return (
    <div className="article">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Article;
