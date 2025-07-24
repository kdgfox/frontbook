import { Book } from "@/types/book";
import { localAxios } from "@/utils/http-commons";
import styles from "./books.module.scss";
export default async function BooksFech() {
  const axios = localAxios();
  const getBook = async () => {
    console.log("fetching book......", Date.now());
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await axios.get("/book/979-11-5839");
    // throw new Error("Someting wrong!!!!");
    console.log(response.data);
    return response.data;
  };
  const book: Book = await getBook();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{JSON.stringify(book)}</h1>
    </div>
  );
}
