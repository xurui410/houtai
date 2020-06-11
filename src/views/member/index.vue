<template>
 <div>
     <!-- 查询 -->
        <el-form :inline="true" ref="searchForm" :model="searchMap" class="demo-form-inline">
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名称"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option v-for="item in payTypeOptions" :key="item.type" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyyy-MM-dd" v-model="searchMap.birthday" type="date" placeholder="出生日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="seachList">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
     <!-- 列表 -->
     <el-table :data="list" height="450" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120"></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template slot-scope="scope">{{scope.row.payType | payTypeFilter}}</template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
 </div>
</template>

<script>
import memberApi from "@/api/member";
// 支付类型
const payTypeOptions = [
  {
    type: "1",
    name: "现金"
  },
  {
    type: "2",
    name: "微信"
  },
  {
    type: "3",
    name: "支付宝"
  },
  {
    type: "4",
    name: "银行卡"
  }
];
export default {
 data(){
  return {
     list:[],
     total: 0,
     pageSize: 10,
     currentPage: 1,
     searchMap: {
        cardNum : "",
        name : "",
        payType : "",
        birthday : ""
      },
      payTypeOptions,
  }
 },
 components : {

 },
 methods: {
   resetForm(formName){
      console.log(formName)
      this.$refs[formName].resetFields();
    },
   handleSizeChange(value){
      this.pageSize = value
      console.log(value)
      this.seachList();
   },
   handleCurrentChange(value){
     this.currentPage = value
      console.log(value)
      this.seachList();
   },
   handleEdit(id) {
      console.log("编辑");
    },
    handleDelete(id) {
      console.log("删除");
    },
   seachList(){
     memberApi.getPage(this.currentPage, this.pageSize).then(res=>{
       this.list = res.data.data.rows
       console.log(res)
       this.total = res.data.data.total
     })
   },
 },
 created() {
   this.seachList();
 },
 filters:{
   payTypeFilter(type){
     const obj = payTypeOptions.find(function(data) {
        return data.type == type;
      });
      return obj ? obj.name : null;
   }
 }
}
</script>


<style scoped>

</style>