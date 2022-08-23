var http = require("http")
var renderHtml = require("./module/renderHtml")
var renderStatus = require("./module/renderStatus")
http.createServer((req, res)=>{
    if(req.url === "./favicon.ico"){
        return
    }
    const url = new URL(req.url,"http://127.0.0.1:3000")
    pathname = url.pathname
    console.log(url);
    for (var [key,value] of url.searchParams){
        console.log(key,value);
    }
    res.writeHead(renderStatus(pathname),{"Content-Type":"text/html;charset=utf-8"})
    res.write(renderHtml(pathname))
    res.end()
}).listen(3000,()=>{
    console.log("server start");
})
