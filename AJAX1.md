1. ##### 什么是AJAX

   “Asynchronous Javascript And XML”（异步的JavaScript和XML），是指一种创建交互式网页应用的网页开发技术，尤其是在一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。

2. ##### 传统开发和AJAX开发

   - 传统的Web开发：

     传统的Web开发就好比是瀑布模型，它的下一步实现，完全建立在上一步的基础之上，如果上一步没有完成，下一步就没办法开展，当用户向服务器发送请求时，服务器端必须完全处理好客户端的请求，然后客户端完全接收到服务器端的响应后，才能继续进行操作。如果是刷新，那么久必须刷新整个页面，当整个页面都加载出来时，才可以进行显示。

   - Ajax：

     而Ajax技术，就可以看做是增量、螺旋、喷泉等了。它的下一步实现，并不完全依赖于上一步的实现。就像是增量一样，它可以将一个大型的请求，分化为很多个不等的增量增量模型，在这里，我理解其为局部实现。就好似Ajax中的局部刷新，我可以将我的真个Web页划分为不等的增量，每个增量都是独立的，我可以独立的对其中某一个增量进行一次完整的请求-刷新-显示

   - 两者区别

     - 效率：ajax效率相对于传统Web开发要高
     - 交互方式：Ajax采用异步通信，主要以数据交互为主；传统的web开发采用同步同喜，主要以页面交互为主

3. ##### ajax的原理

   - 基础三部：
     - url是谁
     - 要给后端传什么
     - 成功以后数据长什么样
   - 具体步骤
     - 创建一个ajax对象
     - 填写地址
     - 发送服务器
     - 等待回应
     - 通话

4. 请求方式：get和post


   - get方式（安全性不高，体积较小）
     - 通过地址栏进行数据的传输。.php?user=leo&password=123456
     - 相对不安全
     - 体积较小，具体能传输多少，跟浏览器限制有关系
     - 在写中文的时候，IE下会把中文转成URI编码，会引起报错。
     - 通过encodeURI(转一下);

   - post方式（跟用户信息相关的、较大体积的）

     - 服务器进行传输(拼接的字段要在send中)

     - 理论上来说是没有大小限制的（后端会做限制）

     - 相对就安全一些

     - 在send前加请求头

       ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

- 简单的对比写法

  ```javascript
  <body>
      姓名:<input type="text" name="user" id="userId"/> 
  <script>
      const userId = document.getElementById('userId');
  	
  	// get的方式：通过地址栏进行传输
  	
  	userId.onblur = function (){
        	// 创建一个ajax对象
          var ajax = new XMLHttpPequest; 
        	// 填写服务器地址
        	ajax.open('get','php/get.php?user='+userId.value);
        	// 发送给服务器
        	ajax.send();
        	// 等待
        	ajax.onload = function (){
              console.log(ajax.responseText);
          }
      }
      
       
      // post的方式 ：通过服务器进行传输
      userId.onblur = function (){
          // 创建一个ajax对象
          var ajax = new XMLHttpPequest; 
        	// 填写服务器地址
        	ajax.open('get','php/get.php');
        	//在send前加请求头
        	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        	// 发送给服务器
        	ajax.send('user='+userId.value);
        	// 等待
        	ajax.onload = function (){
              console.log(ajax.responseText);
          }
      }
  ```

  ​