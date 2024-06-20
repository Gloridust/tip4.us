import { getAllArticles } from '../lib/getArticles'
import ArticlePreview from '../components/ArticlePreview'
import TagList from '../components/TagList'

export default function Home() {
  const articles = getAllArticles()
  const allTags = [...new Set(articles.flatMap(article => article.frontMatter.tags))]

  return (
    <div>
      <header className="header">
        <h1>Tip 4 Us</h1>
        <img src="/logo.png" alt="logo" />
        <TagList tags={allTags} />
      </header>
      <main>
        {articles.map(article => (
          <ArticlePreview key={article.slug} article={article} />
        ))}
      </main>
    </div>
  )
}
