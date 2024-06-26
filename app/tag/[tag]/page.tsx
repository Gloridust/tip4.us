import Link from 'next/link'
import Image from 'next/image'
import { getSortedPostsData, getAllTags } from '../../../utils/mdUtils'

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getSortedPostsData().filter((post) => post.tags.includes(params.tag))
  const allTags = getAllTags()

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <Link href="/" className="text-primary-color hover:underline mb-4 inline-block">&larr; Back to home</Link>
        <h1 className="text-4xl font-bold mt-4">Posts tagged with &quot;{params.tag}&quot;</h1>
      </header>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">All Tags</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="tag">
            All
          </Link>
          {allTags.map((tag) => (
            <Link key={tag} href={`/tag/${tag}`} className={`tag ${tag === params.tag ? 'bg-primary-color' : ''}`}>
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="card">
            <div className="image-container rounded-t-lg"> {/* 应用新的类 */}
              <Image 
                src={post.cover} 
                alt={post.title} 
                fill
                className="rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{post.date}</p>
              <p className="text-gray-700 mb-4 line-clamp-2">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}