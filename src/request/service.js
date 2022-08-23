import axios from 'axios'
import Vue from 'vue'

// 获取token
function getToken(){
    return sessionStorage.getItem('token')
}
// 创建axios实例
let service = axios.create({
    baseURL: "https://lianghj.top:8888/api/private/v1/",
    timeout: 3000
})
// 配置请求拦截器
service.interceptors.request.use(
    (config)=>{
        // 返回 config
        config.headers.Authorization = getToken()
        return config
    })

Vue.prototype.$http = service
// export default service