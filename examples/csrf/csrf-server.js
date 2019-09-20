const connect = require("connect")
const cookieParser = require("cookie-parser")
const expressSession = require("express-session")
const bodyParser = require("body-parser");
const redisStore = require("connect-redis")(expressSession)

const secret = '123456'

const testUser = {
  name:'admin',
  pass:'123456'
}

const app = connect()
  .use(cookieParser(secret))
  .use(expressSession({
    secret:secret,//签名秘钥
    // store:new redisStore({
    //   // port:6379,
    //   host:'140.82.48.104',
    //   pass:'7594368',
    //   db:7,
    //   prefix:'session-',
    //   logErrors:true,
    // }),
    cookie: { 
      maxAge:3600000,//cookie保存时间,默认不限制
      // secure : true,//是否只在https上设置cookie，默认false
      // domain:'codediy.club',//写入cookie的域名，默认不检测域名
      path:'/',//写入cookie的路径，默认/
    },
    resave: true,
    name: 'express.session',//cookie名
    saveUninitialized: true
  }))
  .use('/user',function (req, res, next) {
    const session = req.session || {};
    if(!session.login){
      res.statusCode = 401;
      return res.end("not auth")
    }
    res.setHeader("content-type","text/plain; charset=utf-8")
    console.log("hello,我要转账了")
    res.end("hello,我要转账了")
  })
  .use("/login",bodyParser.urlencoded({extends:false}))
  .use('/login',function (req, res, next) {
    switch(req.method){
      case 'GET':
      if(req.session)
      delete req.session.login;
      res.setHeader("content-type","text/html")
      res.end(`
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
<form action="/login" method="POST">
<input type="text" name="username">
<input type="password" name="password">
<button type="submit">submit</button>
</form>
</body>
</html>
      `)
      break
      case 'POST':
        const {username,password} = req.body
        if(username === testUser.name && password === testUser.pass){
          req.session.login = true;
          res.setHeader("content-type","text/html")
          res.end(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
          </head>
          <body>
          <h1>LOGIN SUCCESS</h1>
          <a href="/user">去转账</a> 
          </body>
          </html>
          `)
        }
      break
    }
  })
  .listen(3000,function(){
    console.log("server running...:" + 'http://127.0.0.1:3000')
  })