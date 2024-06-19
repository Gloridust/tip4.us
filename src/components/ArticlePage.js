// src/components/ArticlePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import articlesData from '../articlesData.json';
import marked from 'marked';

function ArticlePage() {
  const { filename } = useParams();
  const article = articlesData.find(article => article.filename === filename);

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <img src={article.cover} alt={article.title} />
      <div dangerouslySetInnerHTML={{ __html: marked(article.content) }} />
    </div>
  );
}

export default ArticlePage;
