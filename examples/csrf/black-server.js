const connect = require("connect")
const fs = require("fs")
const path = require("path")

const html = fs.readFileSync(path.join(__dirname,"black.html"))
const app = connect()
  .use(function(req,res,next){
    res.setHeader("content-type","text/html; charset=utf-8")
    res.end(html)
  })
  .listen(4000,function(){
    console.log("black server running...:" + 'http://127.0.0.1:4000')
  })