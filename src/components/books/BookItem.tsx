import "./BookItem.scss";
import { Book, BookProps } from "@/types/book";
import Link from "next/link";

const BookItem = ({ book }: BookProps) => {
  return (
    <tr className="book-row" key={book.isbn}>
      <td>
        <img src={`/assets/images/${book.img}`} alt={book.title} className="book-thumbnail" />
      </td>
      <td>{book.isbn}</td>
      <td>
        <Link href={`/books/${book.isbn}`}> {book.title}</Link>
      </td>
      <td>{book.author}</td>
      <td>{book.price}</td>
    </tr>
  );
};

export default BookItem;
