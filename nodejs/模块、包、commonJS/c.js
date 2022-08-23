function test(){
    console.log("test-c");
}
var modlueb = require("./b")
modlueb._init()
modlueb.test()
module.exports = test