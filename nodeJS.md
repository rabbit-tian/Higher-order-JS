1. ##### 什么是nodeJS

   - Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境
   - Node.js 的包管理器 npm，是全球最大的开源库生态系统。

2. ##### nodeJS的特点

   - 事件驱动
   - 非阻塞式I/o
   - 单线程

3. ##### 创建一个服务器

   ```javascript
   const http = require('http'); //创建一个http的服务器
   /*
       request:请求（理解为接收客户端发送过来的信息）
       response:响应（理解成“发送”给客户端）

       listen(端口号)
           当开启一个服务之后需要一直开启，因为用户什么时候访问是不知道的，
           通过listen一直将这个服务开启着，直到有用户来进行访问就执行所需的服务。

       进入目录 -> shift + 右键 -> 打开命令窗口
   */

   const server = http.createServer(function(request,response){
      //console.log('已经请求服务器了');
      //https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=s&
      response.write('window.baidu.sug({q:"s",p:false,s:["steam","孙 政 才","双世宠妃","搜狗输入法下载","搜狗输入法","顺丰快递单号查询","三国杀","苏宁易购","搜房网","上海天气"]})');
      response.end();
   });
   server.listen(9090);
   ```

   ​

4. ##### readFile和writeFile

   ```javascript
   /*
   readFile:
       第一个参数：
           路径

       第二个参数:
           回调函数，
               err ->错误

               data -> 数据
   */

   const http = require('http'); //直接下载下来的模块不用路径,如果你引入自己的模块('./httpx')
   const fs = require('fs'); //专门用来操作本地文件
   http.createServer((req,res)=>{
       //urlName是前端发送的信息
       let urlName = req.url;
       let na = 'www';
       // console.log(urlName); //  /index.html
       //因为谷歌浏览器会默认给服务器发送一个favicon.ico,如果文件中没有就报错
       if(req.url !== '/favicon.ico'){
           //na + urlName = www/index.html
           fs.readFile(na + urlName,function(err, data){
               if(err){ //如果文件没有读取出来走err
                   res.write('404');
               }else{
                   //文件读取出来了，data->Buffer格式的，需要使用toString去转一下
                   res.write(data.toString());
               }
               res.end();
           });
       }
       
   }).listen(8888);
   ```

   ​

5. ##### express

   - express是基于Node.js平台，快速，开放，极简的web开发框架。

   - 登录注册框的 get和post ，express框架形式

     ```javascript
     const express = require('express'); //引入express框架
     const app = express();//开启服务
     const bodyParser = require('body-parser');//作用是对post请求的请求体进行解析
     /*
         中间件 static  进行静态资源的托管
         http://www.cnblogs.com/chyingp/p/nodejs-learning-express-body-parser.html
     */
     app.use(bodyParser.urlencoded({ extended: true }));
     app.use(express.static('www'));
     const sql = [{"name":"李庚","pass":123}];
     //登录
     app.post('/user',function(req,res){
         // console.log(req.body);
         const urlObj = req.body;
         const json = {code:0};
         const onOff = sql.find(e=>e.name == urlObj.user);
         if(urlObj.act == 'login'){
             if(onOff){
                 if(onOff.pass == urlObj.pass){
                     json.msg = 'seccess login';
                 }else{  
                     json.msg = 'username or password error!';
                     json.code = 1;
                 }
             }else{
                 json.code = 2;
                 json.msg = 'no person';
             }
         }
         res.send(JSON.stringify(json));
     });

     app.get('/user',(req,res)=>{
        const urlObj = req.query;
        const json = {"code":0};
        if(urlObj.act == 'add'){
             const onOff = sql.find(e=>e.name == decodeURI(urlObj.user));
             if(onOff){
                 json.msg = 'username exist';
                 json.code = 1;
             }else{
                 sql.push({"name":decodeURI(urlObj.user),"pass":urlObj.pass});
                 json.msg = 'add success!';
             }
             res.send(JSON.stringify(json));
        }
     });

     app.listen(80);

     ```

     ​

   ​

   ​