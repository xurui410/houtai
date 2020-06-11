<template>
  <div class="main">
    <!-- <el-breadcrumb v-show="$route.path !== '/home'">
      <el-breadcrumb-item class="line" :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb> -->
    <app-link v-show="$route.path !== '/home'"></app-link>
    <router-view></router-view>
  </div>
</template>

<script>
import AppLink from "./Link"
export default {
  data() {
    return {};
  },
  components: {
      AppLink
  }
};
</script>


<style scoped>
.main{
    padding : 10px;
}

</style>