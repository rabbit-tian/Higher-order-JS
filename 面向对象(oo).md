1. ##### 什么是面向对象

   - 面向对象是一种思想(一种开发的方式)
   - 把具有共同特性的代码归为一类，把它的细节描述挂在原型上的一种编程方式。

2. ##### js面向对象的特征

   - 抽象
   - 封装
   - 继承
   - 多态

3. ##### 构造函数(又叫 工厂函数，类)

   - 能 return 对象 的就是 构造函数

   - 构造函数首字母大写

   - 举例

     ```javascript
     //工厂函数、类、构造函数
     function Person(name,age,sex){
       var obj = {};//原材料

       //加工
       obj.name = name;
       obj.age = age;
       obj.sex = sex;
       obj.say = function(){
         alert('我叫'+this.name);
       };

       //出厂
       return obj;
     }

     var t =  new Person('tian',18,'女');
     var s =  new Person('shen',28,'男');

     t.say(); // 我叫 tian
     s.say(); // 我叫 shen

     /*
     	t和s ：实例化对象
     	new：
     		函数一元运算符。 专门用来运算的符号
     		this 指向 实例化对象
     		var t =  new Person； 可不写括号 ，括号只用于传参
     		默认 return this
     		如果return 简单（基础）类型，那么返回值为实例化对象
     		如果return 复合（复杂）类型，那么返回值为这个复合（复杂）类型。
     */

     function fn(){
       //alert(this); //window
       //console.log(this)
       return {name:'呵呵'};
     }

     // var f = fn();

     var f = new fn;  //f实例化对象

     console.log(f);
     ```

4. ##### 面向对象(new改写)

   ```javascript
     /*
           new RegExp();

           new Date();

           new String

           new Array

           new Object
       
           构造函数首字母要大写
       */

   //工厂函数、类、构造函数
   function Person(name,age,sex){
     // var obj = {};//原材料

     //加工
     this.name = name; // 属性
     this.age = age;
     this.sex = sex;
     this.say = function(){ // 方法
       alert('我叫'+this.name);
     }

     // //出厂
     // return obj;
   }

   var lg =  new Person('李庚',28,'男');

   lg.say();
   ```

   ​

5. ##### 原型 (prototype)  与原型链 (_ _proto_ _)

   - 什么是原型

     -  prototype的值是一个对象 (prototype：object) ***

     - 函数的一个属性，解决性能问题

     - prototype  原型，只要是函数都有这个属性，**值：对象**，解决性能问题的

     - 一般面向对象都是把属性挂在构造函数中，把方法挂在构造函数的原型上。

     - 对象找链 -> 构造函数找原型 -> 找值下的链

       p.say  -> Person.prototype -> Object.prototype

   - 什么是原型链

     - _ proto_ === 构造函数.prototype
     - _ proto _  原型链  只要是对象都有原型链，它是链接对象与构造函数的桥梁
     - 对象没有原型，只有原型链而函数既有原型也有原型链，__构造函数的原型只给它的实例化对象使用__

   ​

6. ##### 面向对象的 选项卡

   ```javascript
   <head>
       <meta charset="UTF-8">
       <title>Title</title>
       <style>
           .active{
               background-color: yellowgreen;
           }
           .show{
               display: block;
               background-color: #ccc;
           }
           div{
               width: 200px;
               height: 200px;
               display: none;
           }
           button{
               outline: none;
               cursor: pointer;
           }

       </style>
   </head>
   <body>
   <button class="active">标题一</button>
   <button>标题二</button>
   <button>标题三</button>
   <div class="show">11111111111</div>
   <div>22222222222</div>
   <div>33333333333</div>


   <script>
   	1. 面向过程的写法
       var btns = document.querySelectorAll('button');
       var content = document.querySelectorAll('div');

       for (var i = 0; i < btns.length; i++) {
           btns[i].index = i; // 记录索引
           // 添加点击事件
           btns[i].onclick = function (){
               // 大清洗
               for (var i = 0; i < btns.length; i++) {
                   btns[i].className = '';
                   content[i].className = '';
               }
               // 当前点击按钮添加样式
               this.className = 'active';
               content[this.index].className = 'show';
           }
       }
   	/************************************************************************/
   	2.面向对象的选项卡
      	// 构造函数
       function Tab(){
           this.btns = document.querySelectorAll('button');    // 按钮
           this.content = document.querySelectorAll('div'); // 内容框
       }

       Tab.prototype.event = function (){
           var _this = this; // tab
           // 循环按钮，添加点击事件
           for (var i = 0; i < this.btns.length; i++) {
               this.btns[i].index = i; // 记录索引值
               this.btns[i].onclick = function (){
                   _this.tabs(this); // 将当前点击的 按钮 作为参数传过去 ，此处是实参
               }
               
           }
       };

       // 点击按钮需要做的事情
       Tab.prototype.tabs = function (that){ // 此处that是形参
           // 大清洗
           for (var i = 0; i < this.btns.length; i++) {
               this.btns[i].className = '';
               this.content[i].className = '';
           }

           // 给当前添加样式
           that.className = 'active';
           this.content[that.index].className = 'show';
       };


       // 实例化对象
       var p = new Tab;

       p.event();

   /************************************************************************/

   	3.加自动播放的 选项卡
       
       // 构造函数
       function Tab(){
           this.btns = document.querySelectorAll('button');    // 按钮
           this.content = document.querySelectorAll('div'); // 内容框
           // 自动播放
           this.num = 0;
           this.timer = null;
       }

       Tab.prototype.event = function (){
           var _this = this; // tab

           // 循环按钮，添加点击事件

           for (var i = 0; i < this.btns.length; i++) {
               // 闭包
               (function (index){ // 参数 index
                   // 自执行函数内的this指向window
                   _this.btns[index].onclick = function (){
                       _this.tabs(index);
                   }
               })(i); // 实参 i
           }
       };

       // 点击按钮需要做的事情
       Tab.prototype.tabs = function (index){ // 此处that是形参
           // 大清洗
           for (var i = 0; i < this.btns.length; i++) {
               this.btns[i].className = '';
               this.content[i].className = '';
           }

           // 给当前添加样式
           this.btns[index].className = 'active';
           this.content[index].className = 'show';
       };

       // 自动播放
       Tab.prototype.autoPlay = function (){
           var _this = this;
           this.timer = setInterval(function (){
               _this.num ++;
               if(_this.num>_this.btns.length-1){
                   _this.num = 0;
               }
               _this.tabs(_this.num);
           },1000)
       };


       // 实例化对象
       var p = new Tab;

       p.event();
       p.autoPlay();

   </script>
   ```

   ​

   ​