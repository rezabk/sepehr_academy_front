import axios from "axios";
import { toast } from "react-toastify";
import { getItem } from "../storage/storage";

axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    console.log(error);
    toast.error("مشکلی از سمت سرور پیش آمده.", {
      position: "top-right",
      closeOnClick: true,
    });
  } else {
    try {
      if (!!error.response.data.messages[0]) {
        toast.error(error.response.data.messages[0], {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(error.response.data.message.messages[0], {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
