// src/App.js
import React, { useState, useEffect } from 'react';
import ArticlePreview from '../components/ArticlePreview';
import TagFilter from '../components/Layout';
import articlesData from './articlesData.json';

function App() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [tags, setTags] = useState(['All']);
  
  useEffect(() => {
    const allTags = new Set();
    allTags.add('All');
    articlesData.forEach(article => {
      article.tags.forEach(tag => allTags.add(tag));
    });
    setTags([...allTags]);
  }, []);

  const filteredArticles = selectedTag === 'All' ? articlesData : articlesData.filter(article => article.tags.includes(selectedTag));

  return (
    <div className="App">
      <header>
        <img src="/logo.png" alt="logo" />
        <h1>tip4.us</h1>
      </header>
      <TagFilter tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
      <main>
        {filteredArticles.map(article => (
          <ArticlePreview key={article.title} article={article} />
        ))}
      </main>
    </div>
  );
}

export default App;
