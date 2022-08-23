import {requestPost} from '../common'

// 登录接口
export function login(data){
    return new Promise((resolve, reject)=>{
        requestPost('/login', data).then(res=>resolve(res.data))
        .catch(err=>reject(err))
    })
}