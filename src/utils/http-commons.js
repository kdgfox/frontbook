import axios from "axios";

const BASE_URL = "http://10.4.2.100:8080/eureka/";

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
