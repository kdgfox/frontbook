import { Metadata } from "next";
import styles from "./member.module.scss";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회원 정보",
  description: "회원 정보를 관리하는 페이지",
};
export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원 정보</h1>
      {children}
    </div>
  );
}
