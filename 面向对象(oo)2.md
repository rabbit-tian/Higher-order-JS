1. ##### 什么是面向对象

   - 面向对象是一种思想(一种开发的方式)
   - 把具有共同特性的代码归为一类，把它的细节描述挂在原型上的一种编程方式。

2. 面向对象的拖拽

   ```js
   <style>
   #box{
       width:100px;
       height: 100px;
       background: red;
       position: absolute;
       top:0;
       left:0;
   }
   </style>
   </head>
   <body>
       sdsadsadjhsjdhsa
       <div id="box"></div>
   <script>
       // 构造函数
       function Drag(id){
           this.box = document.getElementById(id);
           this.disX = 0;
           this.disY = 0;
       }
   	// 配置文件
       Drag.prototype.init = function(){
           var _this = this;
           this.box.addEventListener('mousedown',down);
           function down(ev){
               _this.down(ev); // 由于此处this指向 this.box，因此要把Drag传进去
           }
       }
   	// 鼠标按下事件
       Drag.prototype.down = function(ev){
           var _this = this;
           this.disX = ev.clientX - this.box.offsetLeft;
           this.disY = ev.clientY - this.box.offsetTop;
           var move = function(ev){
               _this.move(ev); // 由于此处this指向document，因此要把Drag传进去
           }
           var up = function(ev){
               _this.up(ev,move,up); // 由于此处this指向document，因此要把Drag传进去
           }
           document.addEventListener('mousemove',move);
           document.addEventListener('mouseup',up);

           ev.preventDefault();
       }
   	// 鼠标移动事件
       Drag.prototype.move = function(ev){
           this.box.style.left = ev.clientX - this.disX + 'px';
           this.box.style.top = ev.clientY - this.disY + 'px';
       }
       // 鼠标抬起事件
       Drag.prototype.up = function(ev,move,up){
           document.removeEventListener('mousemove',move);
           document.removeEventListener('mouseup',up);
       }

       var d = new Drag('box'); // 实例化对象
       d.init(); // 执行

   </script>
   </body>
   ```

   ​

3. 初识ES6和箭头函数

   - ES6

     ```javascript
     /*
             类:
                 function Person(){}

             ES6:
                 class Person{
                     constructor(形参){
                         //一般初始化都放在这里。
                     }
                 }
                 //键值对
                 {
                     name:name
                 }
                 {
                     name
                 }
                 //函数
                 {
                     fn:function(){}
                 }
                 {
                     fn(){

                     }
                 }
     */

         // 正常方法
         function PerSon(name,age,sex){
             this.name = name;
             this.age = age;
             this.sex = sex;
         }

         PerSon.prototype.say = function (){
             alert(this.name);
         };

         var p = new PerSon('田甜','18','女');
         p.say();


         // ES6 方法

         class Fn{
             constructor(name,age,sex){
                 this.name = name;
                 this.age = age;
                 this.sex = sex;
             }

             say(){
                 alert(this.age)
             }
         }

         var f = new Fn('田甜','18','女');
         f.say();
     ```

   - 箭头函数

     ```javascript
         // 正常方式
         function fn() {
             console.log(1);
         }
     //    fn();

         // 箭头函数   this永远指向老爹

         var fn2 = () => console.log(2);
     //    fn2(); // 2

         var fn3 = (a,b) => {
             return a+b;
         };

     //    console.log(fn3(2, 3)); // 5

         // 只要是箭头函数内的this都指向老爹

         document.onclick = function (){
             var fn4 = () => {
     //            console.log(this); // document
                 var fn5 = () => {
                     console.log(this); // document
                 };
                 fn5();
             };
             fn4();
         }
     ```

     ​


   - 举例：面向对象的拖拽(ES6+箭头函数的方式)

   ```javascript
   <style>
           *{
               margin: 0;
               padding: 0;
           }
           #box{
               width: 100px;
               height: 100px;
               background-color: red;
               position: absolute;
               left: 0;
               top: 0;
           }

       </style>
   </head>
   <body>
   <div id="box"></div>
   <script>
       class Drag{
           constructor(id){
               this.box = document.getElementById(id);
               this.disX = 0;
               this.disY = 0;
               this.box.addEventListener('mousedown',(ev) => {
                   this.down(ev);
               })
           }
           down(ev){
               this.disX = ev.clientX - this.box.offsetLeft;
               this.disY = ev.clientY - this.box.offsetTop;

               var move = (ev) => {
                   this.move(ev);
               };
               var up = (ev) => {
                   this.up(ev,move,up);
               };

               document.addEventListener('mousemove',move);
               document.addEventListener('mouseup',up);

               ev.preventDefault();
           }
           move(ev){
               this.box.style.left = ev.clientX - this.disX + 'px';
               this.box.style.top = ev.clientY - this.disY + 'px';
           }
           up(ev,move,up){
               document.removeEventListener('mousemove',move);
               document.removeEventListener('mouseup',up);
           }
       }

       var d = new Drag('box');
   </script>
   ```

   ​

4. 神奇的this

   ```javascript
       /*
           this:
               window
               事件触发元素
               对象
               undefined
               父级
               写啥是啥

           只要在函数中，有可能被修改

           先看是函数还是方法，如果是方法，那么this基本上是寄主。
           如果是函数，那么基本上是window
               
       */

   // 具体例子分析

   function fn(){
     console.log(this);
   }
   fn(); //window


   document.onclick = function(){
     console.log(this); // document

     function fn(){
       console.log(this); //window
     }
     fn();

     (function(){
       console.log(this); // window
     })();
   };


   document.onclick = (function(){
     console.log(this); //window  立即执行
     return function(){
       console.log(this);//document
     }
   })();


   document.onclick = fn(); //window
   function fn(){
     console.log(this); // 打印不出
   }


   document.onclick = new fn();
   function fn(){
     console.log(this); //fn{}
   }

   document.onclick = function(){
     function fn1(){
       console.log(this); // 命名函数fn1{}
       return function(){
         console.log(this); // 匿名函数 {}
       }
     }
     new new fn1; //函数才能new
   }

   document.onclick = function(){
     function fn1(){
       return function(){
         setTimeout(function(){
           console.log(this); // window  定时器的this 都指向 window
         });
       }
     }
     new new fn1;
   }


   var arr = [];
   arr.fn = function(){
     function fn1(){
       return function(){
         console.log(this); //{}
       }
     }
     new new fn1;
   };
   new arr.fn;


   var obj = {
     name:'nizp',
     fn:function(){
       console.log(this.name); // C  ''
     }
   };
   setTimeout(obj.fn,1000);
   /*
      A:nizp  B:undefined C:'' D:null  E:报错
   */



   function fn(){
           var fn2 = function(){
               console.log(this);//window
               var fn3 = () => {
                   console.log(this);//fn3{}
                   function fn4(){
                       console.log(this);
                   }
               }
               new fn3(); //箭头函数不能new不然要报错。
           }; 
           return fn2;
       }
       fn()();
   ```

   ​
