import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/strapi";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'

async function getArticle(slug: string) {
  try {
    const res = await fetchAPI('/articles', {
      filters: { slug: { $eq: slug } },
      populate: {
        category: true,
        author: true,
        cover: true,
        blocks: {
          populate: '*'
        }
      },
    });
    return res.data?.[0];
  } catch (error) {
    console.error("Error fetching article", error);
    return null;
  }
}

// Enhanced block renderer
function BlockRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        if (block.__component === 'shared.rich-text') {
          return (
            <div
              key={index}
              className="font-[Charter] prose prose-invert max-w-none prose-lg prose-headings:font-bold prose-a:text-accent hover:prose-a:text-white prose-a:transition-colors prose-blockquote:border-accent prose-blockquote:bg-white/[0.02] prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg"
            >
              <Markdown remarkPlugins={[remarkGfm]}>{block.body}</Markdown>
            </div>
          );
        }
        if (block.__component === 'shared.quote') {
          return (
            <blockquote key={index} className="my-16 p-8 md:p-12 border-l-4 border-accent bg-white/[0.02] rounded-r-2xl relative">
              <span className="absolute top-4 left-4 text-7xl text-accent opacity-20 font-serif leading-none">"</span>
              <div className="relative z-10">
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-8 italic text-neutral-200">
                  {block.body}
                </p>
                {(block.title || block.author) && (
                  <footer className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-accent"></div>
                    <cite className="not-italic text-lg md:text-xl font-bold text-neutral-400">
                      {block.title || block.author}
                    </cite>
                  </footer>
                )}
              </div>
            </blockquote>
          );
        }
        if (block.__component === 'shared.media') {
          const file = block.file || block.media;
          if (!file) return null;
          const url = file.url?.startsWith('http') ? file.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337'}${file.url}`;
          return (
            <figure key={index} className="my-16">
              <img src={url} alt={file.alternativeText || ''} className="w-full rounded-2xl shadow-2xl" />
              {file.caption && <figcaption className="mt-4 text-center text-sm text-neutral-500 italic">{file.caption}</figcaption>}
            </figure>
          );
        }
        if (block.__component === 'shared.slider') {
          const files = block.files || [];
          if (!files.length) return null;
          return (
            <div key={index} className="my-16">
              <div className="flex items-center gap-2 mb-4 px-6 md:px-0 text-sm font-bold uppercase tracking-widest text-neutral-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>Swipe to explore</span>
              </div>
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 custom-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                {files.map((file: any, i: number) => {
                  const url = file.url?.startsWith('http') ? file.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337'}${file.url}`;
                  return (
                    <div key={i} className="w-full min-w-full shrink-0 snap-center">
                      <img src={url} alt={file.alternativeText || `Slider image ${i + 1}`} className="w-full h-auto rounded-2xl shadow-xl object-cover bg-neutral-900" />
                      {file.caption && <p className="mt-4 text-center text-sm text-neutral-500 italic">{file.caption}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )
        }
        // Fallback for unknown blocks
        return null;
      })}
    </>
  );
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const { title, publishedAt, createdAt, category, blocks } = article;

  const dateObj = new Date(publishedAt || createdAt);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="flex flex-col w-full max-w-[800px] mx-auto p-6 lg:p-12 gap-12 mt-8 min-h-screen">
      {/* Back link */}
      <div>
        <Link href="/article" className="text-sm font-bold uppercase tracking-widest text-neutral-500 hover:text-accent transition-colors flex items-center gap-2">
          &larr; Back to Articles
        </Link>
      </div>

      {/* Article Header */}
      <header className="flex flex-col gap-8 mb-4">
        <div className="flex items-center gap-4 text-sm font-mono text-neutral-400">
          <span>{formattedDate}</span>
          <span>•</span>
          <span className="text-accent uppercase tracking-widest font-bold px-3 py-1 border border-accent/30 rounded-full">
            {category?.name || category?.title || 'Uncategorized'}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          {title}
        </h1>

        {/* Author info */}
        {article.author && (
          <div className="flex items-center gap-4 mt-4 pt-8 border-t border-white/10">
            <div className="w-14 h-14 rounded-full bg-accent text-black flex items-center justify-center text-2xl font-bold shadow-lg">
              {article.author.name?.[0] || 'A'}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">{article.author.name}</span>
              {article.author.email && <span className="text-sm text-neutral-400">{article.author.email}</span>}
            </div>
          </div>
        )}
      </header>

      {/* Cover Image */}
      {article.cover && (
        <figure className="mb-12 mt-4 rounded-3xl overflow-hidden shadow-2xl relative aspect-[21/9]">
          <img
            src={article.cover.url?.startsWith('http') ? article.cover.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337'}${article.cover.url}`}
            alt={article.cover.alternativeText || title}
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      {/* Article Content */}
      <div
        className="text-lg leading-relaxed space-y-6"
      >
        {blocks ? (
          <BlockRenderer blocks={blocks} />
        ) : (
          <p className="opacity-70 italic">Content is missing.</p>
        )}
      </div>

      {/* Footer / Share */}
      <footer className="mt-12 pt-8 border-t border-border flex justify-between items-center">
        <div className="flex gap-4">
          <button className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            Share on X
          </button>
          <button className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            Copy Link
          </button>
        </div>
      </footer>
    </article>
  );
}
