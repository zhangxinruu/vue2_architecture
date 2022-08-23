function renderHtml(url){
    switch(url){
        case "/login":
            return `
            <html>
                <div>登录</div>
            </html>`
        case "/list":
            return `
            <html>
                <div>list</div>
            </html>`
        case "/api/list":
            return `["1","2","3"]`
        default:
            return `
            <html>
                <div>not fount</div>
            </html>`
    }
}
module.exports = renderHtml