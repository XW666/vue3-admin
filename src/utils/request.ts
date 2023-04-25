import axios from 'axios';
import baseUrl from '../config/index'
import {
  ElLoading
} from 'element-plus'
let loadinginstace
const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000
});
// 
service.interceptors.request.use(
  config => {

    config.headers!['X-Litemall-Admin-Token'] = '7a3a798c-30fd-4e44-bb6f-2ee82055681b'


    loadinginstace = ElLoading.service({
      text: 'Loading…',
      fullscreen: true
    })
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  response => {
    loadinginstace.close()
    if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
  },
  error => {
    loadinginstace.close()
    console.log(error);
    return Promise.reject();
  }
);

export default service;