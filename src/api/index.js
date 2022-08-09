import axios from "axios";
import qs from "qs";
import { Message, Loading } from "element-ui";
import router from "../router";
import bus from "../../src/views/common/bus.js"
import { getToken, clearToken } from "../utils/auth";


let API = "http://localhost:9999/";
let loading;
const Axios = axios.create({
  // baseURL: API, 
  timeout: 100000,
  responseType: "json",
  withCredentials: false, 
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  }
});


Axios.interceptors.request.use(
  config => {
    if (config.method === "post") {
      if (!config.hideLoading) {
        loading = Loading.service({
          lock: true,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }

      if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8') {
        
        config.data = qs.stringify(config.data);
      }
    }
    let token = getToken();
    if (token !== null && token !== undefined) {
      config.headers['Authorization'] = "Bearer " + token;
    }
    return config;
  },
  error => {
    Message({
      //  show the message box
      showClose: true,
      message: error,
      type: "error.data.error.message"
    });
    return Promise.reject(error.data.error.message);
  }
);

Axios.interceptors.response.use(
  res => {
    loading && loading.close();
    let data = res.data;
    let success = data.status === 0 || data.code === 0
    if (data.status === 10) {
      clearToken()
      router.push("/login")
      return
    }
    let msg = data.msg;
    if (!success) {
      Message({
        //  show the message box
        showClose: true,
        message: msg,
        type: "error"
      });
      return Promise.reject(res.data);
    }
    return Promise.resolve(res.data);
  },
  error => {
    loading && loading.close();
    console.log(error, 'error----');
    Message({
      showClose: true,
      message: "Internal Error, Please contact admin",
      type: "error"
    });

    return Promise.reject(error);
  }
);
export {
  Axios
}

export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, "$api", { value: Axios });
  }
};
