import request from '../utils/request';

// 请求方式
export default {
    login(mobile,password){
        return request({
            method:"post",
            url: "/user/login",
            data : {
                mobile,
                password,
            }
        })
    },
    getInfo(token){
        return request({
            method:"get",
            url:`/user/info/${token}`
        })
       
    },
    loginOut(token){
        return request({
            method:"post",
            url:"/user/logout",
            data:{
                token
            }
        })
    }
}
