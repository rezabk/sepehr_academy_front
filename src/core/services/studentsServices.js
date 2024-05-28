import http from "./httpService";
import config from "./config.json";

export const getStudents = () => {
  return http.get(`${config.farsapi}student/getall`);
};
export const getStudent = (studentId) => {
  return http.get(`${config.farsapi}student/${studentId}`);
};

export const updateStudent = (studentId, student) => {
  return http.put(`${config.farsapi}student/${studentId}`, student);
};

export const deleteStudent = (studentId) => {
  return http.delete(`${config.farsapi}student/${studentId}`);
};
