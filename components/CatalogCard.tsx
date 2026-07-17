"use client"
import Link from "next/link";
import Image from "next/image";
import { useBottomImageColor } from "@/hooks/useBottomColorImage";

export default function CatalogCard({
  logoUrl,
  title,
  year,
  description,
  link = "#",
  coverType = 'image',
  coverUrl,
  badgeText,
  actionText,
  bgColorHex = "#fff"
}: {
  logoUrl?: string;
  title: string;
  year: number;
  description: string;
  link?: string;
  coverType?: 'image' | 'video';
  coverUrl?: string;
  badgeText?: string;
  actionText?: string;
  bgColorHex?: string;
}) {

  const textColor = useBottomImageColor({
    src: coverUrl,
    fallbackColor: bgColorHex
  });

  return (
    <Link
      href={link}
      className="block relative rounded-3xl overflow-hidden group min-h-[400px] h-full flex flex-col
      transition-all duration-500 ease-out
      hover:-translate-y-1
      border border-current pressable"
      style={{ backgroundColor: bgColorHex, color: textColor }}
    >
      {/* Background Media */}
      {coverUrl && coverType === 'image' && (
        <Image
          src={coverUrl}
          alt={title}
          fill
          unoptimized
          className="object-cover absolute inset-0 w-full h-full z-0
          transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {coverUrl && coverType === 'video' && (
        <video
          src={coverUrl}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover absolute inset-0 z-0 w-full h-full
          transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* Subtle global overlay untuk readability */}
      {coverUrl && (
        <div className="absolute inset-0 z-10
          bg-black/0 group-hover:bg-black/15
          transition-colors duration-700 pointer-events-none"
        />
      )}

      <div className="relative z-20 flex flex-col h-full p-6 md:p-8"
        style={{ color: textColor }}>
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl
              bg-white/10 backdrop-blur-sm
              flex items-center justify-center shrink-0
              transition-colors group-hover:bg-white/20 overflow-hidden">

              {logoUrl ? (
                <Image src={logoUrl} alt={`${title} logo`} width={48} height={48} unoptimized className="w-full h-full object-cover" />
              ) : (
                <div className="w-6 h-6 bg-current rounded-md opacity-80 flex items-center justify-center font-bold text-xs">
                  {title.charAt(0)}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-md tracking-tight leading-tight">
                {title}
              </h3>
              {year && (
                <p className="text-sm opacity-60 tabular-nums">
                  {year}
                </p>
              )}
            </div>
          </div>

          {/* Arrow */}
          <div className="w-10 h-10 rounded-full
            bg-black/5 group-hover:bg-black/10
            flex items-center justify-center shrink-0
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            translate-x-0 group-hover:translate-x-1 -translate-y-1">
            <span className="text-base" aria-hidden="true">↗</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-auto pt-6 transition-transform duration-500 group-hover:translate-y-0 translate-y-1">
          <p className="text-sm md:text-base leading-relaxed mb-6 text-balance opacity-80 group-hover:opacity-100 transition-opacity">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
            {actionText && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                bg-black/5 hover:bg-black/10
                text-sm font-medium
                transition-colors">
                <span className="w-2 h-2 rounded-full bg-current" aria-hidden="true" />
                {actionText}
              </span>
            )}

            {badgeText && (
              <span className="inline-flex items-center px-4 py-2 rounded-full
                border border-current/20
                text-sm font-medium opacity-80">
                {badgeText}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
