import axios from "axios";
import { Article } from "@/types/article";

const BASE_URL =
  "https://newsapi.org/v2/everything?q=한국&language=ko&sortBy=publishedAt&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f";

export const fetchNews = async (): Promise<Article[]> => {
  const response = await axios.get(BASE_URL);
  console.log(response.data.articles);
  return response.data.articles;
};
