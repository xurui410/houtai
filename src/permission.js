//引入路由文件,通过引入路由我们获取到路由对象
import router from "./router"

/*权限校验：
    通过router路由前置钩子函数 beforeEach() ， 
    在跳转路由前进行拦截判断是否已经登录， 
    如果已登录，则进行路由跳转，如果没有则回到登录页
*/

/*
前置路由钩子函数 
    to ：即将要进入的目标路由对象
    from ：当前导航正要离开的路由对象 
    next : 调用该方法，进入目标路由
*/

/*
    1. 判断用户是否是登录状态
        使用本地存储看能不能获取的本地存储的token 

    2. 获取到token,则表示的登录状态
    
    3. 没有获取到token,则表示用户没有登录

        跳转到登录页



*/

import loginApi from "./api/login"

//通过路由对象我们可以调用导航守卫方法
router.beforeEach((to, from, next) => {
    //获取token
    const token = localStorage.getItem("adminToken");
    //没有token
    if(!token){
        if(to.path !== "/login"){
            next({path : "/login"})
        }else{
            next();
        }
    }else{ //有token的情况
        if(to.path == "/login"){
            next();
        }else{
            //获取用户信息
            const userInfo = localStorage.getItem("adminInfo");
            if(userInfo){
                next();
            }else{
                loginApi.getInfo(token).then(response=>{
                    const resp = response.data;
                    console.log(resp)
                    if(resp.flag){
                        localStorage.setItem("adminInfo",JSON.stringify(resp.data));
                        next();
                    }else{
                        next({path : "/login"})
                    }
                })
            }
        }
    }
})