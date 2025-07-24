import { useBookMarkContext } from "@/store/book-mark";
import { BookProps } from "@/types/book";
import Link from "next/link";
import React, { useCallback } from "react";

const BookMarkItem = ({ book }: BookProps) => {
  const { removeBookMark } = useBookMarkContext();
  const handleRemove = useCallback(() => {
    removeBookMark(book.isbn);
  }, [book]);
  return (
    <tr className="book-row">
      <td>
        <img src={`/assets/images/${book.img}`} className="book-thumbnail" />
      </td>
      <td>{book.isbn}</td>
      <td>
        <Link href={`/books/${book.isbn}`}> {book.title}</Link>
      </td>
      <td>{book.author}</td>
      <td>{book.price}</td>
      <td>
        <button className="select-button" onClick={handleRemove}>
          삭제
        </button>
      </td>
    </tr>
  );
};

export default BookMarkItem;
/* ; */
