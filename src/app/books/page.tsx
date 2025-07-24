"use client";
import styles from "@/app/books/book.module.scss";
import SelectBox from "@/components/common/SelectBox";
import BookItem from "@/components/books/BookItem";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/types/book";
import { useCallback, useRef, useState } from "react";
import { searchAllBooks } from "@/service/books";

export default function Books() {
  const [selectedKey, setSelectedKey] = useState("all");
  const wordRef = useRef<HTMLInputElement>(null);
  const [queryKeyState, setQueryKeyState] = useState({ key: "all", word: "" });

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery<Book[]>({
    queryKey: ["books", queryKeyState],
    // queryFn: () => fetchBooks(queryKeyState.key, queryKeyState.word),
    queryFn: () => searchAllBooks({ key: queryKeyState.key, word: queryKeyState.word, pageNo: 1 }),
  });

  const options = [
    { value: "all", text: "---선택하세요---" },
    { value: "title", text: "제목" },
    { value: "author", text: "작성자" },
  ];

  const handleSelect = useCallback(
    (key: string) => {
      console.log("key......", key);
      setSelectedKey(key);
    },
    [selectedKey],
  );

  const handleSearch = useCallback(() => {
    setQueryKeyState({ key: selectedKey, word: wordRef.current?.value || "" });
  }, [selectedKey]);

  return (
    <div className={styles.bookList}>
      <div className={styles.header}>
        <div className={styles.searchArea}>
          <SelectBox selectOptions={options} onKeySelect={handleSelect} />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className={styles.searchInput}
            ref={wordRef}
            defaultValue=""
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>

      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {(error as Error).message}</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>이미지</th>
            <th>책 일련 번호</th>
            <th>제목</th>
            <th>저자</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book: Book) => (
            <BookItem key={book.isbn} book={book} />
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button>이전</button>
        <button>다음</button>
      </div>
    </div>
  );
}
