import request from '../utils/request';

// 请求方式
export default {
    test(){
        return request({
            method:"get",
            url:BASE_URL + "/db.json"
        })
    }
}
