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

interface ArticleBlock {
  __component: string;
  body?: string;
  title?: string;
  author?: string;
  file?: { url?: string; alternativeText?: string; caption?: string };
  media?: { url?: string; alternativeText?: string; caption?: string };
  files?: Array<{ url?: string; alternativeText?: string; caption?: string }>;
}

function BlockRenderer({ blocks }: { blocks: ArticleBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        if (block.__component === 'shared.rich-text') {
          return (
            <div
              key={index}
              className="font-[family-name:var(--font-serif)] prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-[var(--ink)] prose-p:text-[var(--ink-soft)] prose-a:text-[var(--accent-dark)] hover:prose-a:text-[var(--ink)] prose-a:transition-colors prose-strong:text-[var(--ink)] prose-blockquote:border-l-2 prose-blockquote:border-[var(--accent)] prose-blockquote:bg-[var(--cream)] prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl"
            >
              <Markdown remarkPlugins={[remarkGfm]}>{block.body}</Markdown>
            </div>
          );
        }
        if (block.__component === 'shared.quote') {
          return (
            <blockquote key={index} className="my-16 p-8 md:p-12 border-l-2 border-[var(--accent)] bg-[var(--cream)] rounded-r-2xl relative">
              <span className="absolute top-4 left-4 text-7xl text-[var(--accent)] opacity-30 font-[family-name:var(--font-serif)] leading-none" aria-hidden="true">&ldquo;</span>
              <div className="relative z-10">
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-8 italic text-[var(--ink)]">
                  {block.body}
                </p>
                {(block.title || block.author) && (
                  <footer className="flex items-center gap-4">
                    <div className="h-[2px] w-12 bg-[var(--accent)]" />
                    <cite className="not-italic text-lg md:text-xl font-semibold text-[var(--ink-soft)]">
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={file.alternativeText || ''} className="w-full rounded-2xl shadow-[var(--shadow-md)]" />
              {file.caption && <figcaption className="mt-4 text-center text-sm text-[var(--ink-muted)] italic">{file.caption}</figcaption>}
            </figure>
          );
        }
        if (block.__component === 'shared.slider') {
          const files = block.files || [];
          if (!files.length) return null;
          return (
            <div key={index} className="my-16">
              <div className="flex items-center gap-2 mb-4 px-6 md:px-0 text-sm font-semibold uppercase tracking-widest text-[var(--ink-muted)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>Swipe to explore</span>
              </div>
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 md:mx-0 md:px-0">
                {files.map((file: { url?: string; alternativeText?: string; caption?: string }, i: number) => {
                  const url = file.url?.startsWith('http') ? file.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337'}${file.url}`;
                  return (
                    <div key={i} className="w-full min-w-full shrink-0 snap-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={file.alternativeText || `Slider image ${i + 1}`} className="w-full h-auto rounded-2xl shadow-[var(--shadow-md)] object-cover bg-[var(--border-soft)]" />
                      {file.caption && <p className="mt-4 text-center text-sm text-[var(--ink-muted)] italic">{file.caption}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )
        }
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
    <article className="flex flex-col w-full max-w-[800px] mx-auto px-6 lg:px-8 gap-12 mt-8 min-h-[60vh] pb-24">
      {/* Back link */}
      <div>
        <Link href="/article" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors pressable">
          <span aria-hidden="true">←</span> Back to articles
        </Link>
      </div>

      {/* Article Header */}
      <header className="flex flex-col gap-6 mb-4">
        <div className="flex items-center gap-3 text-sm font-mono text-[var(--ink-muted)]">
          <span className="tabular-nums">{formattedDate}</span>
          <span>•</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-dark)] bg-[var(--gold-surface)] px-2 py-1 rounded">
            {category?.name || category?.title || 'Uncategorized'}
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[var(--ink)] text-balance">
          {title}
        </h1>

        {article.author && (
          <div className="flex items-center gap-4 mt-4 pt-8 border-t border-[var(--border)]">
            <div className="w-14 h-14 rounded-xl bg-[var(--accent)] text-[var(--ink)] flex items-center justify-center text-2xl font-bold">
              {article.author.name?.[0] || 'A'}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-[var(--ink)]">{article.author.name}</span>
              {article.author.email && <span className="text-sm text-[var(--ink-muted)]">{article.author.email}</span>}
            </div>
          </div>
        )}
      </header>

      {/* Cover Image */}
      {article.cover && (
        <figure className="mb-12 mt-4 rounded-3xl overflow-hidden shadow-[var(--shadow-lg)] relative aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover.url?.startsWith('http') ? article.cover.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337'}${article.cover.url}`}
            alt={article.cover.alternativeText || title}
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      {/* Article Content */}
      <div className="text-lg leading-relaxed space-y-6">
        {blocks ? (
          <BlockRenderer blocks={blocks} />
        ) : (
          <p className="text-[var(--ink-muted)] italic">Content is missing.</p>
        )}
      </div>

      {/* Footer / Share */}
      <footer className="mt-12 pt-8 border-t border-[var(--border)] flex justify-between items-center">
        <div className="flex gap-4">
          <button className="text-sm font-semibold text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
            Share on X
          </button>
          <button className="text-sm font-semibold text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
            Copy link
          </button>
        </div>
      </footer>
    </article>
  );
}
