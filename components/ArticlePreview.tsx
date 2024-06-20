import Link from 'next/link'

const ArticlePreview = ({ article }) => (
  <div className="article-preview">
    <img src={article.frontMatter.cover} alt="cover" />
    <h2>{article.frontMatter.title}</h2>
    <p>{article.frontMatter.date}</p>
    <p>{article.frontMatter.description}</p>
    <Link href={`/${article.slug}`}>
      Read more
    </Link>
  </div>
)

export default ArticlePreview
