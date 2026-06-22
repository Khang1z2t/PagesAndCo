import { Suspense } from "react";
import { BooksCatalog, BooksCatalogView } from "@/components/sections/BooksCatalog";

export default function BooksPage() {
  return (
    <Suspense fallback={<BooksCatalogView activeSort="featured" />}>
      <BooksCatalog />
    </Suspense>
  );
}
