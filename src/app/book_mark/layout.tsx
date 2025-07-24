import { Metadata } from "next";
import styles from "./book_mark.module.scss";

export const metadata: Metadata = {
  title: "북마크",
  description: "북마크를 관리하는 페이지",
};
export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>북 마크</h1>
      {children}
    </div>
  );
}
