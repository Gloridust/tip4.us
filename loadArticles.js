const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, 'src', 'articles');
const outputFilePath = path.join(__dirname, 'src', 'articlesData.json');

const articles = fs.readdirSync(articlesDir).map(filename => {
  const filePath = path.join(articlesDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    ...data,
    content,
    filename
  };
});

fs.writeFileSync(outputFilePath, JSON.stringify(articles, null, 2));

console.log('Articles data has been generated.');
