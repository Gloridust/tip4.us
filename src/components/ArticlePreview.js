// src/components/ArticlePreview.js
import React from 'react';
import { Link } from 'react-router-dom';

function ArticlePreview({ article }) {
  return (
    <div className="article-preview">
      <Link to={`/articles/${article.filename}`}>
        <img src={article.cover} alt={article.title} />
        <h2>{article.title}</h2>
        <p>{article.date}</p>
        <p>{article.description}</p>
        <div className="tags">
          {article.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
      </Link>
    </div>
  );
}

export default ArticlePreview;
