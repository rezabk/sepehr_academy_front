import http from "./httpService";
import config from "./config.json";

export const registerUser = (user) => {
  return http.post(`${config.farsapi}auth/register`, user);
};

export const registerEmployee = (user) => {
  return http.post(`${config.farsapi}auth/employee/register`, user);
};

export const loginUser = (user) => {
  return http.post(`${config.farsapi}auth/login`, user);
};

export const loginEmployee = (user) => {
  return http.post(`${config.farsapi}auth/employee/login`, user);
};
