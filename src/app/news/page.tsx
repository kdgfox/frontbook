import NewsItem from "@/components/news/NewsItem";
import styles from "./news.module.scss";
import { Article } from "@/types/article"; // 타입은 따로 정의해 둔 경우
import { handleApi } from "@/utils/handleApi";
import { fetchNews } from "@/service/news";

export default async function NewsList() {
  const { data, error } = await handleApi(() => fetchNews());
  if (error) {
    return <div className={styles.newsList}>에러 발생!</div>;
  } else {
    if (data) {
      return (
        <div className={styles.newsList}>
          {data.map((article: Article) => (
            <NewsItem key={article.url} article={article} />
          ))}
        </div>
      );
    } else {
      return <div className={styles.newsList}>오늘의 뉴스가 없습니다. </div>;
    }
  }
}
