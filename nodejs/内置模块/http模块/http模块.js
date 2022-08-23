var http = require("http")
var renderHtml = require("./module/renderHtml")
var renderStatus = require("./module/renderStatus")
http.createServer((req, res)=>{
    // req接收浏览器传的参数
    // res返回渲染的内容
    res.writeHead(renderStatus(req.url),{"Content-Type":"text/html;charset=utf-8"})
    res.write(renderHtml(req.url))
    console.log(req.url);
    res.end()
}).listen(3000,()=>{
    console.log("server start");
})
