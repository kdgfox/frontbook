import axios from "axios";

const BASE_URL = "https://bookapi-y7sn.onrender.com/eureka/";

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { localAxios };
