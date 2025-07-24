import React from "react";
import styles from "./NewsItem.module.scss";
import { Article } from "@/types/article";

const NewsItem = ({ article }: { article: Article }) => {
  const { title, description, url, urlToImage } = article;

  return (
    <div className={styles.newsitem}>
      {urlToImage && (
        <div className={styles.thumbnail}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={urlToImage} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className={styles.contents}>
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default NewsItem;
