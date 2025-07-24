import { QueryExam } from "@/types/query";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUser = async (): Promise<QueryExam> => {
  const res = await axios.get(`${BASE_URL}/1`);
  console.log(res.data);
  return res.data;
};

export const createUser = async (newUser: QueryExam): Promise<QueryExam> => {
  const res = await axios.post(BASE_URL, newUser);
  console.log(res.data);
  return res.data;
};
