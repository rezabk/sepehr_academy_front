import http from "./httpService";
import config from "./config.json";

export const contactUs = (contact) => {
  return http.post(`${config.farsapi}contactUs/sendMessage`,contact);
};


export const contactUsGetAll = () => {
  return http.get(`${config.farsapi}contactUs`,);
};

export const contactUsVerify = (id) => {
  return http.post(`${config.farsapi}contactUs/verify/${id}`);
};

export const contactUsDelete = (id) => {
  return http.delete(`${config.farsapi}contactUs/${id}`);
};
