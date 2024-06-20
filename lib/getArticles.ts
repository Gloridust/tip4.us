import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'articles')

export function getArticleSlugs() {
  return fs.readdirSync(articlesDirectory)
}

export function getArticleBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(articlesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return { slug: realSlug, frontMatter: data, content }
}

export function getAllArticles() {
  const slugs = getArticleSlugs()
  const articles = slugs.map(slug => getArticleBySlug(slug))

  return articles
}
