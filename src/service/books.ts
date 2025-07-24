import { Book, BookSearchParams } from "@/types/book";
import { localAxios } from "@/utils/http-commons";

export const searchAllBooks = async (params: BookSearchParams): Promise<Book[]> => {
  const axios = localAxios();
  const { data } = await axios.get("/book", { params });
  return data.books || [];
};

export const searchBook = async (isbn: string): Promise<Book> => {
  const axios = localAxios();
  const { data } = await axios.get(`/book/${isbn}`);
  return data;
};

export const updateBook = async (book: Book): Promise<Book> => {
  const axios = localAxios();
  const { data } = await axios.put("/book", book);
  return data;
};
export const insertBook = async (book: Book): Promise<Book> => {
  const axios = localAxios();
  const { data } = await axios.post("/book", book);
  return data;
};
export const removeBook = async (isbn: string): Promise<Book> => {
  const axios = localAxios();
  const { data } = await axios.delete(`/book/${isbn}`);
  return data;
};
