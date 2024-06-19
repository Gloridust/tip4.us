// src/utils/fetchArticles.js
export const fetchArticles = async () => {
    const context = require.context('../articles', false, /\.md$/);
    const articles = await Promise.all(
      context.keys().map(async key => {
        const module = await import(`../articles/${key.slice(2)}`);
        const meta = module.default;
        const slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
        return { ...meta, slug };
      })
    );
    return articles;
  };
  
  export const fetchArticle = async (slug) => {
    const module = await import(`../articles/${slug}.md`);
    return module.default;
  };
  