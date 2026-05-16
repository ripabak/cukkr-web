import CatalogCard from "@/components/CatalogCard";
import Link from "next/link";
import { fetchAPI } from "@/lib/strapi";

async function getCatalogs() {
  try {
    const res = await fetchAPI('/catalogs', {
      populate: '*',
      sort: ['createdAt:asc'],
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching catalogs", error);
    return [];
  }
}

export default async function Home() {
  const catalogs = await getCatalogs();

  return (
    <div className="flex flex-col lg:flex-row w-full mx-auto p-6 lg:p-8 gap-12 lg:gap-16">
      {/* Left Sidebar */}
      <aside className="w-full lg:w-[350px] xl:w-[450px] flex flex-col gap-10 lg:gap-16 shrink-0 lg:sticky lg:top-8 self-start">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-balance">
          An independent design and research laboratory, and publisher.
        </h1>

        <nav className="flex flex-col gap-3 items-start">
          <Link
            href="/about"
            className="px-6 py-3 rounded-full bg-neutral-800 text-white hover:bg-accent hover:text-black transition-all duration-300 text-sm font-bold uppercase tracking-widest border border-transparent hover:border-black/10 shadow-sm"
          >
            About
          </Link>
          <Link
            href="/article"
            className="px-6 py-3 rounded-full bg-neutral-800 text-white hover:bg-accent hover:text-black transition-all duration-300 text-sm font-bold uppercase tracking-widest border border-transparent hover:border-black/10 shadow-sm"
          >
            Article
          </Link>
        </nav>
      </aside>

      {/* Right Content - Grid */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {catalogs.map((catalog: any) => {
          const { logo, title, year, description, link, badgeText, actionText, bgColorHex, cover } = catalog;

          let coverUrl = '';
          let coverType: 'image' | 'video' = 'image';

          if (cover) {
            coverUrl = cover.url;
            if (coverUrl && !coverUrl.startsWith('http')) {
              coverUrl = `${process.env.STRAPI_URL || 'http://localhost:1337'}${coverUrl}`;
            }
            if (cover.mime?.startsWith('video')) {
              coverType = 'video';
            }
          }

          let logoUrl = '';
          if (logo) {
            logoUrl = logo.url;
            if (logoUrl && !logoUrl.startsWith('http')) {
              logoUrl = `${process.env.STRAPI_URL || 'http://localhost:1337'}${logoUrl}`;
            }
          }

          return (
            <CatalogCard
              key={catalog.documentId || catalog.id}
              logoUrl={logoUrl}
              title={title}
              year={year}
              description={description}
              link={link}
              actionText={actionText}
              badgeText={badgeText}
              coverType={coverType}
              coverUrl={coverUrl}
              bgColorHex={bgColorHex}
            />
          );
        })}

        {/* Empty Placeholder Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[400px] h-full group hover:bg-white/10 transition-colors">
          <div className="flex gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
          </div>
          <span className="text-neutral-500 text-xs tracking-[0.2em] font-bold uppercase group-hover:text-neutral-300 transition-colors">In Production</span>
        </div>
      </div>
    </div>
  );
}
