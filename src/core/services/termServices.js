import http from "./httpService";
import config from "./config.json";
import { getItem } from "../storage/storage";

export const getTerms = () => {
  return http.get(`${config.farsapi}term/getall`);
};

export const getTerm = (termId) => {
  return http.get(`${config.farsapi}term/${termId}`);
};

export const newTerm = (term) => {
  return http.post(`${config.farsapi}term/`, term);
};

export const updateTerm = (termId, term) => {
  return http.put(`${config.farsapi}term/${termId}`, term);
};

export const deleteTerm = (termId) => {
  return http.delete(`${config.farsapi}term/${termId}`);
};

export const removeStudentFromTerm = (studentId, term) => {
  return http.post(
    `${config.farsapi}term/removeStudentFromTerm/${studentId}`,
    term
  );
};

export const addStudentToTerm = (studentId, term) => {
  return http.post(`${config.farsapi}term/addStudentToTerm/${studentId}`, term);
};

export const likeTerm = (term) => {
  return http.post(`${config.farsapi}term/like`, term);
};

export const dislikeTerm = (term) => {
  return http.post(`${config.farsapi}term/dislike`, term);
};

export const checkLike = (check) => {
  return http.post(`${config.farsapi}term/check`, check);
};
