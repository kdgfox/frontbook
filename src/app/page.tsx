import styles from "@/app/page.module.scss";
import BooksFechAll from "@/components/books/BooksFetchAll";
import BooksFech from "@/components/books/BookFetch";
import { Suspense } from "react";
export default async function Home() {
  // const axios = localAxios();
  // const getBooks = async () => {
  //   console.log("fetching books......", Date.now());
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   const response = await axios.get("/book");
  //   console.log(response.data.books);
  //   return response.data.books;
  // };

  // const getBook = async () => {
  //   console.log("fetching book......", Date.now());
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   const response = await axios.get("/book/979-11-1");
  //   console.log(response.data);
  //   return response.data;
  // };
  // const books: Book[] = await getBooks();
  // const book: Book = await getBook();

  // const [books, book] = await Promise.all([getBooks(), getBook()]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Suspense fallback={<h1>Loading Book List</h1>}>
          <BooksFechAll />
        </Suspense>
      </h1>
      <h1 className={styles.title}>
        <Suspense fallback={<h1>Book Info</h1>}>
          <BooksFech />
        </Suspense>
      </h1>
    </div>
  );
}
