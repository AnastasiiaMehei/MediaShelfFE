import BookCard from "./BookCard";
import type { Book } from "../../types/Book";

interface BooksGridProps {
  books: Book[];
}

export default function BooksGrid({ books }: BooksGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
