"use client";

import { Book } from "@/types/book";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/////todo1. 제공할 상태와 상태를 변경할 함수에 대한 타입 설정하기
interface BookMarkContextType {
  books: Book[];
  loaded: boolean;
  registBookMark: (book: Book) => void;
  removeBookMark: (isbn: string) => void;
  clearBookMark: () => void;
}

/////todo2. createContext()함수로 제공할 context를 생성하기
const BookMarkContext = createContext<BookMarkContextType | undefined>(undefined);

/////todo3. 타입에 해당하는 구현부를 Provider로 작성해서 리턴하기
/////type에서 선언한 상태와 함수를 value에 필수로 작성하기
export const BookMarkProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const store = localStorage.getItem("bookmark");
    if (store) {
      try {
        setBooks(JSON.parse(store));
      } catch {
        setBooks([]);
      }
    }
    setLoaded(true);
  }, []);

  //books의 상태가 변하면 storage에 저장
  useEffect(() => {
    console.log("useEffect........ loaded:", loaded);
    if (loaded) {
      localStorage.setItem("bookmark", JSON.stringify(books));
    }
  }, [books, loaded]);

  const registBookMark = useCallback((book: Book) => {
    setBooks((prev) => (prev.find((item) => item.isbn === book.isbn) ? prev : [...prev, book]));
  }, []);

  const removeBookMark = useCallback((isbn: string) => {
    setBooks((prev) => prev.filter((item) => item.isbn !== isbn));
  }, []);

  const clearBookMark = useCallback(() => {
    setBooks([]);
  }, []);

  const returnValue = useMemo(
    () => ({ books, loaded, registBookMark, removeBookMark, clearBookMark }),
    [books, loaded]
  );
  return <BookMarkContext.Provider value={returnValue}>{children}</BookMarkContext.Provider>;
};
/////todo4 커스텀 훅: useBookMarkContext
export const useBookMarkContext = () => {
  const context = useContext(BookMarkContext);
  if (!context) throw new Error("useBookMarkContext는 BookMarkProvider 안에서 사용할 수 있다.");
  return context;
};
