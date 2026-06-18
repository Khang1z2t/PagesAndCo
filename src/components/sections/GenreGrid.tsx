import Link from "next/link";
import type { Genre } from "@/types";

interface GenreGridProps {
  genres: Genre[];
}

export function GenreGrid({ genres }: GenreGridProps) {
  return (
    <section className="section-gap">
      <div className="page-shell space-y-8">
        <div className="max-w-2xl space-y-3">
          <p className="section-eyebrow">Find by shelf</p>
          <h2 className="section-heading text-[var(--color-charcoal)]">
            Browse by genre
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {genres.map((genre) => (
            <Link
              key={genre.slug}
              href={`/books?genre=${genre.slug}`}
              className="group rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
            >
              <article
                className="relative min-h-40 overflow-hidden rounded-md p-6 text-white shadow-[var(--shadow-card)] transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-card-hover)]"
                style={{ backgroundColor: genre.color }}
              >
                <div className="absolute -right-8 -top-8 size-28 rounded-full border border-white/20" />
                <div className="absolute -bottom-12 right-10 size-24 rounded-full bg-white/10" />
                <div className="relative flex h-full min-h-28 flex-col justify-between">
                  <h3 className="font-serif text-3xl leading-none tracking-[-0.04em]">
                    {genre.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/68">
                    {genre.count} {genre.count === 1 ? "title" : "titles"}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
