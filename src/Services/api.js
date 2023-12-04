import axios from "axios";

const apiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASEURL}`,
});

apiInstance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${process.env.REACT_APP_TOKEN}`;
  return config;
});

export default apiInstance;
