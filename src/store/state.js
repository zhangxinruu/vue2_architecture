export default{
    get userToken(){
        return localStorage.getItem('toekn')
    },
    set userToken(value){
        localStorage.setItem('token', value)
    }
}