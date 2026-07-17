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
    const filters: Record<string, unknown> = {};
    if (category) {
      filters.category = { slug: { $eq: category } };
    }

    const res = await fetchAPI('/articles', {
      populate: ['category', 'author', 'cover'],
      sort: ['publishedAt:desc', 'createdAt:desc'],
      filters,
      pagination: {
        page,
        pageSize: 10,
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
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-6 lg:px-8 py-12 lg:py-16 gap-12 min-h-[60vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[var(--border)] pb-8">
        <div>
          <div className="flex items-start gap-3 mb-4">
            <span className="w-6 h-[2px] bg-[var(--accent)] mt-2.5" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--ink-muted)]">
              Journal
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-6xl font-bold tracking-tight text-[var(--ink)] leading-[1] text-balance">
            Articles
          </h1>
          <p className="text-lg text-[var(--ink-soft)] mt-4 max-w-xl leading-relaxed text-balance">
            Insights, updates, and stories from the team building Cukkr — for barbershop owners and the people behind the chair.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-52 shrink-0 flex flex-col gap-8">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--ink-muted)] mb-4">
              Categories
            </h2>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/article"
                  className={`block text-sm font-medium transition-colors rounded-md px-3 py-2 ${
                    !currentCategory
                      ? 'bg-[var(--border-soft)] text-[var(--ink)]'
                      : 'text-[var(--ink-soft)] hover:bg-[var(--border-soft)] hover:text-[var(--ink)]'
                  }`}
                >
                  All categories
                </Link>
              </li>
              {categories.map((cat: { documentId?: string; id?: string; slug?: string; name?: string; title?: string }) => (
                <li key={cat.documentId || cat.id}>
                  <Link
                    href={`/article?category=${cat.slug}`}
                    className={`block text-sm font-medium transition-colors rounded-md px-3 py-2 truncate ${
                      currentCategory === cat.slug
                        ? 'bg-[var(--border-soft)] text-[var(--ink)]'
                        : 'text-[var(--ink-soft)] hover:bg-[var(--border-soft)] hover:text-[var(--ink)]'
                    }`}
                    title={cat.name || cat.title}
                  >
                    {cat.name || cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Article List */}
        <div className="flex-grow flex flex-col gap-0">
          {articles.length === 0 ? (
            <div className="py-16 px-6 text-center border border-dashed border-[var(--border)] rounded-2xl bg-[var(--cream)]">
              <p className="text-[var(--ink-muted)] font-medium">No articles found.</p>
              <p className="text-sm text-[var(--ink-muted)] mt-1">Check back soon for new stories.</p>
            </div>
          ) : (
            articles.map((article: {
              documentId?: string;
              id?: string;
              title: string;
              description?: string;
              slug: string;
              publishedAt?: string;
              createdAt?: string;
              category?: { name?: string; title?: string };
              author?: { name?: string; email?: string };
            }) => {
              const { title, description, slug, publishedAt, category, createdAt } = article;
              const dateObj = new Date(publishedAt || createdAt || '1970-01-01T00:00:00Z');
              const formattedDate = dateObj.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <article key={article.documentId || article.id}>
                  <Link
                    href={`/article/${slug}`}
                    className="group block py-8 border-b border-[var(--border)] last:border-0 -mx-3 px-3 rounded-xl transition-colors hover:bg-[var(--cream)]"
                  >
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                      <div className="w-full md:w-36 shrink-0 pt-1">
                        <p className="text-sm font-mono text-[var(--ink-muted)] tabular-nums">{formattedDate}</p>
                        <span className="inline-block mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-dark)] bg-[var(--gold-surface)] px-2 py-1 rounded">
                          {category?.name || category?.title || 'Uncategorized'}
                        </span>
                      </div>
                      <div className="flex-grow flex flex-col gap-3">
                        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--ink)] group-hover:text-[var(--accent-dark)] transition-colors leading-snug text-balance">
                          {title}
                        </h2>
                        <p className="text-base text-[var(--ink-soft)] leading-relaxed text-balance">
                          {description}
                        </p>

                        {article.author && (
                          <div className="mt-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] text-[var(--ink)] flex items-center justify-center text-sm font-bold">
                              {article.author.name?.[0] || 'A'}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-[var(--ink)]">{article.author.name}</span>
                              {article.author.email && <span className="text-xs text-[var(--ink-muted)]">{article.author.email}</span>}
                            </div>
                          </div>
                        )}

                        <span className="text-sm font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent-dark)] flex items-center gap-2">
                          Read article <span className="text-lg leading-none" aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })
          )}

          {/* Pagination */}
          {meta?.pagination?.pageCount > 1 && (
            <nav aria-label="Article pagination" className="flex justify-center md:justify-start gap-2 mt-12 pt-8 border-t border-[var(--border)]">
              {meta.pagination.page > 1 ? (
                <Link href={`/article?page=${meta.pagination.page - 1}${currentCategory ? `&category=${currentCategory}` : ''}`} className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--border-soft)] hover:bg-[var(--border)] transition-colors text-[var(--ink)]">
                  <span aria-hidden="true">←</span>
                  <span className="sr-only">Previous page</span>
                </Link>
              ) : (
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--border-soft)] text-[var(--ink-muted)] opacity-60 cursor-not-allowed" disabled>
                  <span aria-hidden="true">←</span>
                  <span className="sr-only">Previous page</span>
                </button>
              )}

              {Array.from({ length: meta.pagination.pageCount }).map((_, i) => {
                const p = i + 1;
                return (
                  <Link
                    key={p}
                    href={`/article?page=${p}${currentCategory ? `&category=${currentCategory}` : ''}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      p === meta.pagination.page
                        ? 'bg-[var(--ink)] text-[var(--paper)]'
                        : 'bg-[var(--border-soft)] text-[var(--ink)] hover:bg-[var(--border)]'
                    }`}
                    aria-current={p === meta.pagination.page ? 'page' : undefined}
                  >
                    {p}
                  </Link>
                );
              })}

              {meta.pagination.page < meta.pagination.pageCount ? (
                <Link href={`/article?page=${meta.pagination.page + 1}${currentCategory ? `&category=${currentCategory}` : ''}`} className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--border-soft)] hover:bg-[var(--accent)] hover:text-[var(--ink)] transition-colors text-[var(--ink)]">
                  <span aria-hidden="true">→</span>
                  <span className="sr-only">Next page</span>
                </Link>
              ) : (
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--border-soft)] text-[var(--ink-muted)] opacity-60 cursor-not-allowed" disabled>
                  <span aria-hidden="true">→</span>
                  <span className="sr-only">Next page</span>
                </button>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
