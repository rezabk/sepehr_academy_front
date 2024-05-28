import http from "./httpService";
import config from "./config.json";

export const getTeachers = () => {
  try {
    return http.get(`${config.farsapi}employee/getallteachers`);
  } catch (error) {
    return [];
  }
};

export const getTeacher = (teacherId) => {
  try {
    return http.get(`${config.farsapi}employee/${teacherId}`);
  } catch (error) {
    return [];
  }
};

export const updateTeacher = (teacherId, teacher) => {
  return http.put(`${config.farsapi}employee/${teacherId}`, teacher);
};
export const deleteTeacher = (teacherId) => {
  return http.delete(`${config.farsapi}employee/${teacherId}`);
};
