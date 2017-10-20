1. ##### ES6方法的继承

   ```javascript
   <style>
   #box{
       width:100px;
       height: 100px;
       background: red;
       position: absolute;
       top:0;
       left:0;
   }
   #box2{
       width:100px;
       height: 100px;
       background: skyblue;
       position: absolute;
       top:0;
       left:100px;
   }
   </style>
   </head>
   <body>
       <div id="box"></div>
       <div id="box2"></div>
   <script>

       /*
          使用ES6的class不能使用Drag.prototype = {}
           Drag.prototype = {
               constructor:Drag,
               move,
               up,
               down
           }
       */
       class Drag {
           constructor(id){
               this.box = document.getElementById(id);
               this.disX = 0;
               this.disY = 0;
           }

           init(){
               this.box.addEventListener('mousedown',(ev)=>{
                   this.down(ev);
               });
           }

           down(ev){
               this.disX = ev.clientX - this.box.offsetLeft;
               this.disY = ev.clientY - this.box.offsetTop;
               var move = ev => this.move(ev);
               var up = ev => this.up(ev,move,up);
               
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
       
       // Drag.prototype.say = function(){
       //     alert('说');
       // }

      
       class Drag2 extends Drag {
          constructor(id,txt){
              
               //继承写了constructor必须写super，不然会报错
               //在super()上面就不能设置属性(不能使用this)，不然会报错
               // this.txt = txt;   报错
               super(id);
               this.txt = txt;
               
          }
          say(){
              alert(this.txt);
          }
          move(ev){
               var l = ev.clientX - this.disX;
               if(l<0)l=0;
               this.box.style.left = l  + 'px';
               this.box.style.top = ev.clientY - this.disY + 'px';
           }

       }

       var d = new Drag('box');
       var d2 = new Drag2('box2','呵呵');
       d.init();
       d2.init();
       d2.say();
       // d.say(); // 只有Drag2才有say的函数，Drag没有
   </script>
   </body>
   ```

   ​

2. ##### ES6的常量和变量

   ```javascript
   变量:
   	let
   	在同域下不能多次声明一个变量名
   	暂存死区（没有预解析），在变量的上方打印不出undefined，而是报错
   	不会在window下创建这个变量。
   常量:(不可变的量，要变就报错)
   	const
   	在同域下不能多次声明一个变量名
   	暂存死区（没有预解析），在变量的上方打印不出undefined，而是报错
   	不会在window下创建这个变量。
   	立即声明立即赋值使用
       特：不能改变常量的地址，但是可以改变同一个地址下的属性值

   ```

   ​