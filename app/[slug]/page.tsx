import { getAllArticles, getArticleBySlug } from '../../lib/getArticles'
import markdownToHtml from '../../lib/markdownToHtml'

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map(article => ({ slug: article.slug }))
}

export default async function Article({ params }) {
  const article = getArticleBySlug(params.slug)
  const content = await markdownToHtml(article.content || '')

  return (
    <div>
      <header>
        <h1>{article.frontMatter.title}</h1>
        <img src={article.frontMatter.cover} alt="cover" />
      </header>
      <main>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </main>
    </div>
  )
}
