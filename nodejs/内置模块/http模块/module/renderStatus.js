function renderStatus(url){
    var arr = ["/api/list","/login","/list"]
    return arr.includes(url)?200:400
 }
 module.exports = renderStatus