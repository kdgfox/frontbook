import { Book } from "@/types/book";
import { localAxios } from "@/utils/http-commons";
import styles from "./books.module.scss";
export default async function BooksFechAll() {
  const axios = localAxios();
  const getBooks = async () => {
    console.log("fetching books......", Date.now());
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await axios.get("/book");
    console.log(response.data.books);
    return response.data.books;
  };
  const books: Book[] = await getBooks();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{JSON.stringify(books)}</h1>
    </div>
  );
}
