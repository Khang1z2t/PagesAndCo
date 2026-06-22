import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookDetail } from "@/components/sections/BookDetail";
import { RelatedBooks } from "@/components/sections/RelatedBooks";
import { books } from "@/data/books";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug);
}

function getRelatedBooks(slug: string, genre: string) {
  const sameGenre = books.filter((book) => book.slug !== slug && book.genre === genre);

  if (sameGenre.length >= 4) {
    return sameGenre.slice(0, 4);
  }

  const curatedFallback = books.filter(
    (book) =>
      book.slug !== slug &&
      (book.collections.includes("featured") || book.collections.includes("bestseller")),
  );

  return [...sameGenre, ...curatedFallback.filter((book) => !sameGenre.some((entry) => entry.id === book.id))].slice(0, 4);
}

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return {
      title: "Book not found",
    };
  }

  return {
    title: book.title,
    description: book.description,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const relatedBooks = getRelatedBooks(book.slug, book.genre);

  return (
    <>
      <BookDetail book={book} />
      <RelatedBooks books={relatedBooks} title={relatedBooks.some((relatedBook) => relatedBook.genre === book.genre) ? `More ${book.genre} to browse` : "More to discover"} />
    </>
  );
}
