import service from './service'

//封装post请求
export function requestPost(url, data){
    return service.post(url,data)
} 