// src/pages/HomePage.js
import React from 'react';
import ArticleList from '../components/ArticleList';

const HomePage = ({ match }) => {
  const tag = match.params.tag || 'All';
  return (
    <div className="home-page">
      <ArticleList tag={tag} />
    </div>
  );
};

export default HomePage;
