function test(){
    console.log("test-a");
}
function uppr1(str){
    return str.substring(0,1).toUpperCase()+str.substring(1)
}
// module.exports = test
// 导出多个方法1
// module.exports = {
//     test,
//     uppr1
// }
// 导出多个方法2
exports.test = test
exports.uppr1 = uppr1