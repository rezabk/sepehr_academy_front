import http from "./httpService";
import config from "./config.json";

export const getComments = () => {
  return http.get(`${config.farsapi}comment`);
};

export const sendComment = (comment) => {
  return http.post(`${config.farsapi}comment/send`, comment);
};

export const verifyComment = (commentId) => {
  return http.post(`${config.farsapi}comment/verify/`, commentId);
};

export const answerComment = (comment) => {
  return http.post(`${config.farsapi}comment/answer`, comment);
};





export const getCommentsNews = () => {
  return http.get(`${config.farsapi}commentNews`);
};

export const sendCommentNews = (comment) => {
  return http.post(`${config.farsapi}commentNews/send`, comment);
};

export const verifyCommentNews = (commentId) => {
  return http.post(`${config.farsapi}commentNews/verify/`, commentId);
};

export const answerCommentNews = (comment) => {
  return http.post(`${config.farsapi}commentNews/answer`, comment);
};
