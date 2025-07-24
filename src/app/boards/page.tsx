import styles from "./page.module.scss";

export default function Books() {
  const books = [
    {
      id: "9917-1",
      title: "처음하는 리액트",
      author: "ureca",
      price: 30000,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>게시판</h1>
    </div>
  );
}
