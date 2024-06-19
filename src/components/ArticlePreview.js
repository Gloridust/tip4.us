import React from 'react';

const ArticlePreview = ({ article }) => {
  return (
    <div className="article-preview">
      <img src={article.cover} alt={article.title} />
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <span>{article.date}</span>
      <div>
        {article.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default ArticlePreview;
