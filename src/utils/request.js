import axios from 'axios';

const request =  axios.create({
    baseURL: process.env.VUE_APP_BASE_API,   
    timeout:5000,  // 请求超时时间
})
// 请求拦截
request.interceptors.request.use(config=>{
    return config;
},error=>{
    return Promise.reject(error);
})
// 响应拦截
request.interceptors.response.use(response=>{
    return response;
},error=>{
    return Promise.reject(error);
})
// 导出
export default request;