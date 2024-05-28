import http from "./httpService";
import config from "./config.json";

export const postImage = (image) => {
  return http.post(`${config.farsapi}upload/image`, image);
};
