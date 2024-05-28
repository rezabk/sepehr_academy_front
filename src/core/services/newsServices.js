import http from "./httpService";
import config from "./config.json";

export const getNews = () => {
  return http.get(`${config.farsapi}news`);
};

export const getNew = (newsId) => {
  return http.get(`${config.farsapi}news/${newsId}`);
};

export const newNews = (news) => {
  return http.post(`${config.farsapi}news/`, news);
};

export const updateNews = (newsId, news) => {
  return http.put(`${config.farsapi}news/${newsId}`, news);
};

export const deleteNews = (newsId) => {
  return http.delete(`${config.farsapi}news/${newsId}`);
};


