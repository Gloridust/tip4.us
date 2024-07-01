import Image from 'next/image'
import Link from 'next/link'
import { getSortedPostsData, getAllTags } from '../utils/mdUtils'

export default function Home() {
  const posts = getSortedPostsData()
  const tags = getAllTags()

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-12 text-center">
        <Image src="/images/logo.webp" alt="tip4.us Logo" width={150} height={50} className="mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">tip4.us</h1>
        <p className="text-xl text-gray-600">Share tips for us</p>
      </header>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Explore Topics</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/" className="tag">
            All
          </Link>
          {tags.map((tag) => (
            <Link key={tag} href={`/tag/${tag}`} className="tag">
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