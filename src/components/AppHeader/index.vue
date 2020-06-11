<template>
  <div class="header">
    <router-link to="/">
      <img class="logo" src="../../assets/logo.png" alt="logo" width="40" height="40" />
      <span class="company">积云会员管理系统</span>
    </router-link>

    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{userInfo.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changePassWord" icon="el-icon-edit">
            修改密码
        </el-dropdown-item>
        <el-dropdown-item command="loginOut" icon="el-icon-s-fold">
            退出系统
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import loginApi from "@/api/login"
export default {
  data() {
    return {
        userInfo : {}
    };
  },
  created(){
      const info = localStorage.getItem("adminInfo"); 
      this.userInfo = JSON.parse(info);
      console.log(this.userInfo)
  },
  methods : {
    handleCommand(command){
      switch(command){
        case "changePassWord" :
          this.changePassword() 
          break;
        case "loginOut" :
          this.loginOut()
          break;
        default:
          break;  
      }
    },

    //修改密码
    changePassword(){
      alert("word")
    },

    //退出登录
    loginOut(){
      const token = localStorage.getItem("adminToken");
      loginApi.loginOut(token).then(response=>{
        const resp = response.data;
        if(resp.flag){
          //清除本地存储的token
          localStorage.removeItem("adminToken");
          //清除本地存储的用户信息
          localStorage.removeItem("adminInfo");
          //退出成功,我们要跳转到登录页
          this.$router.push("/login");
        }else{
          this.$message({
            message: resp.message,
            type: 'warning'
          });
        }
      })
    }
  },
  components: {}
};
</script>


<style scoped>
/* img{
    position: absolute;
    left: 100px;
    top: 10px;
    display: block;
} */
.logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
}
.company {
  color: white;
  text-decoration: none;
  position: absolute;
}
.el-dropdown{
    float: right;
    padding-right:40px;
    color: #fff;
}
.el-dropdown-link{
    cursor: pointer;
}
</style>