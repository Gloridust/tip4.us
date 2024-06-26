import { getPostData, getAllPostSlugs } from '../../../utils/mdUtils'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const paths = getAllPostSlugs()
  return paths
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link href="/" className="text-primary-color hover:underline mb-8 inline-block">
        &larr; Back to home
      </Link>
      <article className="card p-8">
        <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
        <p className="text-gray-600 mb-4">{postData.date}</p>
        <Image src={postData.cover} alt={postData.title} width={800} height={400} className="w-full h-64 object-cover rounded-lg mb-8" />
        <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Tags:</h2>
          <div className="flex flex-wrap gap-2">
            {postData.tags.map((tag) => (
              <Link key={tag} href={`/tag/${tag}`} className="tag">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}