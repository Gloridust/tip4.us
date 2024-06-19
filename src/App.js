import React, { useState, useEffect } from 'react';
import ArticlePreview from './components/ArticlePreview';
import Article from './components/Article';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');
  const [currentArticle, setCurrentArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const files = fs.readdirSync('./articles');
      const allArticles = files.map(filename => {
        const fileContent = fs.readFileSync(path.join('./articles', filename), 'utf-8');
        const { data, content } = matter(fileContent);
        return { ...data, content };
      });

      const allTags = Array.from(new Set(allArticles.flatMap(article => article.tags)));
      setTags(['All', ...allTags]);
      setArticles(allArticles);
    };

    fetchArticles();
  }, []);

  const filteredArticles = selectedTag === 'All'
    ? articles
    : articles.filter(article => article.tags.includes(selectedTag));

  return (
    <div className="App">
      <header>
        <h1>tip4.us</h1>
        <div className="tags">
          {tags.map(tag => (
            <span
              key={tag}
              className={tag === selectedTag ? 'selected' : ''}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      <main>
        {currentArticle ? (
          <Article article={currentArticle} />
        ) : (
          filteredArticles.map(article => (
            <div key={article.title} onClick={() => setCurrentArticle(article)}>
              <ArticlePreview article={article} />
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default App;
