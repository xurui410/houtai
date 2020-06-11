<template>
    <div class="login-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form">
            <h2 class="login-title">积云会员管理系统</h2>
            <el-form-item label="账号" prop="username">
               <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
               <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="onSubmit('form')">登录</el-button>
            </el-form-item>
            
        </el-form>
    </div>
</template>

<script>
import loginApi from "../../api/login";
export default {
    data() {
        return {
            form:{
                username:'',
                password:''
            },
            rules:{
                username: [{ required: true, message: "请输入账号", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }]
            }
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        onSubmit(formName){
            this.$refs[formName].validate(val=>{
                if(val){
                    loginApi.login(this.form.username,this.form.password).then(response=>{
                        let res = response.data;
                        if(res.flag){
                            loginApi.getInfo(res.data.token).then(response=>{
                               let resUser = response.data;
                            //    console.log(resUser)
                               if(resUser.flag){
                                    //将用户信息存储到本地
                                    localStorage.setItem("adminInfo",JSON.stringify(resUser.data))
                                    //将token存储到本地
                                    localStorage.setItem("adminToken",res.data.token)
                                    //跳转到首页
                                    this.$router.push("/");
                               }else{
                                   this.$message({
                                        duration : 1 * 1000,
                                        showClose: true,
                                        message: res.message,
                                        type: 'warning'
                                   });
                               } 
                            })
                        }else{
                            this.$message({
                                duration : 1 * 1000,
                                showClose: true,
                                message: res.message,
                                type: 'warning'
                            });
                            return false;
                        }
                    })
                }else{
                    console.log('error submit');
                    return false;
                }
            })
        }
    }
};
</script>

<style lang='scss' scoped>
.login-form{
    width: 350px;
    height: 300px;
    background: rgba(255,255,255,0.8);
    margin:0 auto;
    margin-top: 200px;
    border-radius: 20px;
    padding-right: 40px;
    h2{
        padding-top:30px;
        text-align: center;
    }
}
.login-container{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    background: url("../../assets/login_bg.jpg");
}
</style>
