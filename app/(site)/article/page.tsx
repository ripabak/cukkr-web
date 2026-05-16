import Link from "next/link";
import { fetchAPI } from "@/lib/strapi";

async function getCategories() {
  try {
    const res = await fetchAPI('/categories');
    return res.data || [];
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
}

async function getArticles(page: number, category?: string) {
  try {
    const filters: any = {};
    if (category) {
      filters.category = { slug: { $eq: category } };
    }

    const res = await fetchAPI('/articles', {
      populate: ['category', 'author', 'cover'],
      sort: ['publishedAt:desc', 'createdAt:desc'],
      filters,
      pagination: {
        page,
        pageSize: 10, // Adjust as needed
      }
    });
    return { data: res.data || [], meta: res.meta };
  } catch (error) {
    console.error("Error fetching articles", error);
    return { data: [], meta: { pagination: { page: 1, pageCount: 1, total: 0 } } };
  }
}

export default async function ArticleListPage({ searchParams }: { searchParams: Promise<{ page?: string, category?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const currentCategory = resolvedSearchParams.category;
  
  const [{ data: articles, meta }, categories] = await Promise.all([
    getArticles(currentPage, currentCategory),
    getCategories()
  ]);

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto p-6 lg:p-12 gap-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase">Articles</h1>
          <p className="text-lg opacity-70 mt-4 max-w-xl">
            Latest thoughts, research, and technical insights from the FADHR LABS team.
          </p>
        </div>
      </div>

      {/* Main Content: Sidebar (Filters) + List */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-48 shrink-0 flex flex-col gap-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">Categories</h3>
            <ul className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              <li>
                <Link 
                  href="/article" 
                  className={`${!currentCategory ? 'text-accent font-bold' : 'text-neutral-400 hover:text-white'} transition-colors block`}
                >
                  All Categories
                </Link>
              </li>
              {categories.map((cat: any) => (
                <li key={cat.documentId || cat.id}>
                  <Link 
                    href={`/article?category=${cat.slug}`}
                    className={`${currentCategory === cat.slug ? 'text-accent font-bold' : 'text-neutral-400 hover:text-white'} transition-colors block truncate`}
                    title={cat.name || cat.title}
                  >
                    {cat.name || cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">Sort By</h3>
            <select className="w-full bg-neutral-900 border border-neutral-800 text-white p-2 rounded-md focus:outline-none focus:border-accent">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </aside>

        {/* Article List */}
        <div className="flex-grow flex flex-col gap-0">
          {articles.length === 0 ? (
            <div className="py-8 text-neutral-400">No articles found.</div>
          ) : (
            articles.map((article: any) => {
              const { title, description, slug, publishedAt, category, createdAt } = article;
              
              const dateObj = new Date(publishedAt || createdAt);
              const formattedDate = dateObj.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <Link 
                  key={article.documentId || article.id} 
                  href={`/article/${slug}`}
                  className="group py-8 border-b border-border last:border-0 flex flex-col md:flex-row gap-4 md:gap-8 hover:bg-white/[0.02] transition-colors -mx-6 px-6 md:mx-0 md:px-0 rounded-lg"
                >
                  <div className="w-full md:w-32 shrink-0 pt-1">
                    <p className="text-sm text-neutral-500 font-mono">{formattedDate}</p>
                    <span className="inline-block mt-2 text-xs font-bold uppercase tracking-wider text-accent border border-accent/30 rounded-full px-2 py-0.5">
                      {category?.name || category?.title || 'Uncategorized'}
                    </span>
                  </div>
                  <div className="flex-grow flex flex-col gap-3">
                    <h2 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors leading-snug">
                      {title}
                    </h2>
                    <p className="text-lg opacity-80 leading-relaxed text-balance">
                      {description}
                    </p>
                    
                    {article.author && (
                      <div className="mt-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center text-sm font-bold shadow-md">
                          {article.author.name?.[0] || 'A'}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-neutral-200">{article.author.name}</span>
                          {article.author.email && <span className="text-xs text-neutral-500">{article.author.email}</span>}
                        </div>
                      </div>
                    )}

                    <span className="text-sm font-bold uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent flex items-center gap-2">
                      Read Article <span className="text-xl leading-none">&rarr;</span>
                    </span>
                  </div>
                </Link>
              );
            })
          )}

          {/* Pagination */}
          {meta?.pagination?.pageCount > 1 && (
            <div className="flex justify-center md:justify-start gap-2 mt-12 pt-8 border-t border-border">
              {meta.pagination.page > 1 ? (
                <Link href={`/article?page=${meta.pagination.page - 1}${currentCategory ? `&category=${currentCategory}` : ''}`} className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-white">
                  &larr;
                </Link>
              ) : (
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 text-white opacity-50 cursor-not-allowed" disabled>
                  &larr;
                </button>
              )}
              
              {Array.from({ length: meta.pagination.pageCount }).map((_, i) => {
                const p = i + 1;
                return (
                  <Link 
                    key={p}
                    href={`/article?page=${p}${currentCategory ? `&category=${currentCategory}` : ''}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${p === meta.pagination.page ? 'bg-accent text-black font-bold' : 'bg-neutral-800 hover:bg-neutral-700 transition-colors text-white'}`}
                  >
                    {p}
                  </Link>
                );
              })}

              {meta.pagination.page < meta.pagination.pageCount ? (
                <Link href={`/article?page=${meta.pagination.page + 1}${currentCategory ? `&category=${currentCategory}` : ''}`} className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-accent hover:text-black transition-colors text-white">
                  &rarr;
                </Link>
              ) : (
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 text-white opacity-50 cursor-not-allowed" disabled>
                  &rarr;
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
