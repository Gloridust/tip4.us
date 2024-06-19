// src/components/ArticleList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../utils/fetchArticles';

const ArticleList = ({ tag }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      const allArticles = await fetchArticles();
      if (tag && tag !== 'All') {
        setArticles(allArticles.filter(article => article.tags.includes(tag)));
      } else {
        setArticles(allArticles);
      }
    };
    loadArticles();
  }, [tag]);

  return (
    <div className="article-list">
      {articles.map(article => (
        <div key={article.title} className="article-preview">
          <Link to={`/article/${article.slug}`}>
            <img src={article.cover} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <small>{article.date}</small>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
