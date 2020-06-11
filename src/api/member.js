import request from "@/utils/request"

export default {
    getList(){
        return request({
            method : "get", 
            url : "/member/list"
        });
    },
    getPage(page,size,data){
        return request({
            method:"post",
            url:`/member/list/search/${page}/$size`,
            data:data
        })
    }
}