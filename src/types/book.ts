export interface Book {
  isbn: string;
  title: string;
  author: string;
  price: number;
  describ: string;
  img: string;
}

export interface BookProps {
  book: Book;
}
