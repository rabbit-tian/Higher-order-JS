### 题目1： 什么是同源策略
1. 同源策略:浏览器出于安全方面的考虑，只允许与本域下的接口交互。不同源的客户端脚本在没有明确授权的情况下，不能读写对方的资源。
2. 本域指的是
    - 同协议：如都是http或者https
    - 同域名：如都是http://baidu.com/a 和http://baidu.com/b
    - 同端口：如都是80端口
3. 需要注意的是: 对于当前页面来说页面存放的 JS 文件的域不重要，重要的是加载该 JS 页面所在什么域



### 题目2： 什么是跨域？跨域有几种实现形式
1. 跨域:允许不同域的接口进行交互
2. 跨域的实现形式
    - JSONP
    - CORS(加请求头Origin)
    - 降域（iframe的降域）
    - postMessage

### 题目3： JSONP 的原理是什么
1. JSONP 的原理：JSONP(JSON with padding)，是通过 script 标签加载数据的方式去获取数据当做 JS 代码来执行 提前在页面上声明一个函数，函数名通过接口传参的方式传给后台，后台解析到函数名后在原始数据上「包裹」这个函数名，发送给前端。换句话说，JSONP 需要对应接口的后端的配合才能实现。    
2. 实现步骤
    - 定义数据处理函数 fn
    - 创建script标签，src的地址执行后端接口，最后加个参数callback= fn
    - 服务端在收到请求后，解析参数，计算返还数据，输出 fus(data) 字符串
    - fu(data)会放到script标签做为js执行。此时会调用fn函数，将data做为参数，然后渲染到页面上。

### 题目4： CORS是什么
1. CORS：CORS 全称是跨域资源共享（Cross-Origin Resource Sharing），是一种 ajax 跨域请求资源的方式，支持现代浏览器，IE支持10以上。
2. CORS的基本思想：使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是失败。
3. 在服务器端，要设置Access-Control-Allow-Origin头部

### 题目5： 根据视频里的讲解演示三种以上跨域的解决方式 ，写成博客
1. 详见giuhub [跨域的几种方式](https://github.com/rabbit-tian/Higher-order-JS/tree/master/jrg%E9%AB%98%E9%98%B6%E5%AD%A6%E4%B9%A0/%E8%B7%A8%E5%9F%9F%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E6%B3%95)

