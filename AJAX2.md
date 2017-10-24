1. ##### ajax: 异步的js与xml ,前后端数据交互的一种技术

2. ##### XML,类似于HTML的语言

   ```javascript
   举例获取XML文件的数据
   data.xml文件内容：
   <?xml version="1.0" encoding="UTF-8"?>
   <content>
   	<person>
   		<name>小明</name>
   		<age>18</age>
   		<sex>男</sex>
   		<info>我是一个快乐的逗逼青年。</info>
   	</person>
   	<person>
   		<name>小红</name>
   		<age>16</age>
   		<sex>女</sex>
   		<info>有人陪我逛街么？</info>
   	</person>
   	<person>
   		<name>小梅</name>
   		<age>17</age>
   		<sex>女</sex>
   		<info>只要你看到我的笑容，不要你看到我的笑纹</info>
   	</person>
   	<person>
   		<name>小赵</name>
   		<age>19</age>
   		<sex>男</sex>
   		<info>阿里月饼666</info>
   	</person>
   	<person>
   		<name>小码</name>
   		<age>19</age>
   		<sex>男</sex>
   		<info>十一还加班，码农真心伤不起....</info>
   	</person>
   	<person>
   		<name>真胖</name>
   		<age>18</age>
   		<sex>男</sex>
   		<info>永生这个大屌丝,继续互相伤害</info>
   	</person>
   </content>

   // 具体的获取数据的方式
   <body>
       <input type="text" id="userId"/>
       <ul id="ul"></ul>
   <script>
       const txt = document.getElementById('userId');
       txt.onblur = function(){
           const ajax = new XMLHttpRequest; // 创建一个ajax对象

           ajax.open('get','data.xml',true); // 填写请求的后台地址，请求的方式是get，true为异步操作

           ajax.send(); // 发送请求
   		
         // 等待回应
           ajax.onload = function(){
               const d = ajax.responseXML; //获取XML数据

               let persons = d.getElementsByTagName('person'); // 获取类数组 
               
               persons = Array.from(persons); // 类数组转数组

               persons.forEach((ele,i) => { // 数组使用forEach
                   let li = document.createElement('li');

                   li.innerHTML = '我的名字叫'+ele.children[0].innerHTML + '今年'+ele.children[1].innerHTML+'岁,性别:'+ele.children[2].innerHTML+',我想说:'+ele.children[3].innerHTML;

                   ul.appendChild(li);
               });
           }
       }
   </script>
   </body>
   ```

   ​

3. ##### 同步与异步

   - 同步：前面的没有执行完，后面的不会执行，一直等待
   - 异步：不用等待前面的执行完，后面的代码依然执行

4. ##### 解决兼容问题：IE9以上才支持ajax的onload事件

   ```javascript
   /*
               有五步：
                   0-4

                   ***0是监控不到的 ，到了第五步说明完成

               0 － （未初始化）还没有调用send()方法 
               1 － （载入）已调用send()方法，正在发送请求 
               2 － （载入完成）send()方法执行完成，已经接收到全部响应内容 
               3 － （交互）正在解析响应内容 
               4 － （完成）响应内容解析完成，可以在客户端调用了   

               onreadystatechange 每当完成一步就执行一次 

               如果把onreadystatechange放在send之前，那么可以监听到第2步，
               但是意义不大，因为4之前的步骤，前端都拿不到数据，只有第五步的时候
               前端才能有数据。

               ajax.readyState查看当前到了第几步。

               200-207 成功的范围
               5字开头一定是后端的问题

   */

   <script>
       /*
           同步:
               前面的没有执行完，后面的不会执行，一直等待

           异步：
               不用等待前面执行完，后面的代码依然执行

           IE9以上才支持ajax的onload事件

       */


       document.documentElement.onclick = function(){
           var ajax = new XMLHttpRequest;

           ajax.open('get','php/get.php?user=leo',true);
     	
    		//  onreadystatechange解决兼容问题
           ajax.onreadystatechange = function(){
               // alert(ajax.responseText);
               if(ajax.readyState === 4){
                   //alert(ajax.responseText);
                   if(ajax.status >= 200 && ajax.status <= 207){
                       alert(ajax.status);
                   }else{
                       alert('失败');
                   }
                   
               }
           };
           // ajax.onload = function(){
           //     alert(ajax.readyState);
           // }
           ajax.send();
       }
       
   ```

   ​

5. ##### 序列化操作

   ```javascript
   1. 将对象转化为字符串

   var o = {
      name:'hh',
      age:18,
      sex:'人妖'
   };
   var arr = [];
   for (var attr in o) {
     arr.push(attr + '='+o[attr]);
   }
   console.log(arr); // ["name=hh", "age=18", "sex=人妖"]
   var str = arr.join('&');
   console.log(str); // 'name=hh&age=18&sex=人妖'


   2.将字符串转对象

   var str = 'name=hh&age=18&sex=人妖';
   var arr = str.split('&')

   var o ={};
   arr.forEach((e,i) => {
       var arr2 = e.split('=');
     	o[arr2[0]] = arr2[1]
   })
   console.log(o); // {name: "hh", age: "18", sex: "人妖"}
   ```

   ​

6. ##### ajax函数封装

   ```javascript
   function ajax(json){
       //默认的配置
       var settings = {
           url:'',
           method:'get',
           success:function(){},
           fail:function(){},
           data:{},
           dataType:'json'
       }

       //有配置走配置，没配置走默认，配置项覆盖默认项
       for(var attr in json){
           settings[attr] = json[attr]; 
       }

       //序列化操作，把对象转成字符串，可以去看第6个课件
       var arr = [];
       for(var attr in settings.data){
           arr.push(attr + '=' + settings.data[attr]);
       }
       settings.data = arr.join('&'); // 拼接成这种形式 user=txt.value&pass=123

       var ajax = new XMLHttpRequest; // 创建一个ajax对象

       // console.log(settings.data);

       //由于 get和post的方式的 写法不一样，要走两套
       if(settings.method === 'get'){
           ajax.open('get',settings.url+'?'+settings.data,true); // 填写后台地址
           ajax.send(); // 发送
       }else if(settings.method === 'post'){
           ajax.open('post',settings.url,true); // 填写后台地址
           ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded'); // 设置表头
           ajax.send(settings.data); // 发送
       }

       // onreadystatechange的 五部解决 onload 的兼容问题
       ajax.onreadystatechange = function(){
           //4代表完成
           if(ajax.readyState === 4){
               //200-207之前算成功
               if(ajax.status >= 200 && ajax.status <= 207){
                   //说明我要json
                   if(settings.dataType === 'json'){
                       var d = ajax.responseText;
                       settings.success(eval('('+ new Function('','return'+ d)() +')'));
                   }else if(settings.dataType === 'xml'){ //说明我要xml
                       settings.success(ajax.responseXML);
                   }else if(settings.dataType === 'str'){ //说明我要 str
                       settings.success(ajax.responseText);
                   }
                   
               }else{
                   settings.fail(ajax.status); 
               }
           }
       }
   }
   ```

   ​