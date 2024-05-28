import http from "./httpService";
import config from "./config.json";

export const getCourses = () => {
  return http.get(`${config.farsapi}course`);
};

export const getCourse = (courseId) => {
  return http.get(`${config.farsapi}course/${courseId}`);
};

export const newCourse = (course) => {
  return http.post(`${config.farsapi}course/add`, course);
};

export const newCourseAdmin = (course) => {
  return http.post(`${config.farsapi}course/addAdmin`, course);
};

export const updateCourse = (courseId, course) => {
  return http.put(`${config.farsapi}course/${courseId}`, course);
};

export const updateCourseAdmin = (courseId, course) => {
  return http.put(`${config.farsapi}course/updateadmin/${courseId}`, course);
};


export const deleteCourse = (courseId) => {
  return http.delete(`${config.farsapi}course/${courseId}`);
};
