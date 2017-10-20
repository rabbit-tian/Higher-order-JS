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

2. ##### ES6的常量和变量  和  块 作用域{}

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
   块 作用域{}

   ****** {}  例子分析  ************************************************
   var a = 10;
   var obj = {
     fn(){
       console.log(this);
     },
     a,
     ["num"+1]:12,
     ["num"+2]:13
   };
   obj.fn();  // {a: 10, num1: 12, num2: 13, fn: ƒ}
   console.log(obj); // {a: 10, num1: 12, num2: 13, fn: ƒ}
   	
   可以改成如下：
   var d = 1;
   var a = 10;
   var obj = {
     fn(){
       console.log(this);
     },
     a,
     ["num"+1]:12,
     ["num"+2]:13
   };
    document.onclick = function(){
       d++; // 2
       console.log(obj["num"+d]); // 13 
    }
    
   ****** const 例子分析  ************************************************
    
   const c = 10; // 简单类型的每次赋值相当于 每次创造了一个新的空间地址
   c = 20;
   console.log(c); // 报错，这样改变了c的地址

   const d = {name:'tian'};
   d.name = 'shen';
   console.log(d); // {name:'tian'} const只要不是改变 d的地址就可以

   ****** let 例子分析  ************************************************
   let b = 20;
   b = 30;
   console.log(b); // 30

   {
     let b = 10;
     {
       console.log(b); // 子级可以拿到父级作用域的变量
     }
   }

   let a = 10;
   let a = 10; // 报错 同一个作用域 不能重复let同一个变量

   ******* let 和 块 搭配的神奇 例子分析  ************
     
    for(let i = 0;i<btns.length;i++) {
         btns[i].onclick = function(){
          alert(i); // 0 1 2 3 4 ...
      }
    }
   ```

   ​


   ```Javascript

   /*
    采集 addEvent(document,'事件名',事件函数)
    .zdy = {
    }
    
    addEventListener{'click':[function (){},function (){}],'move':[function (){},function (){}]}
   */

   // 绑定器

       function addEventListener(obj, eventName, fn) {
           // 放事件函数的对象，如果之前有该事件的对象就存到这个对象内，否则就创造 对象
           obj.event = obj.event || {};

           // 将事件函数放在 上述的对象中，进行分类，如果之前有这个事件函数的数组就放进去，否则就再创建一个新的数组 []
           obj.event[eventName] = obj.event[eventName] || [];

           // 将事件放在对应的函数数组中
           obj.event[eventName].push(fn);

       }

       // 触发器

       function Trigger(obj, eventName) {
           // 判断该事件是否存在，如果不存在就return出去，否则就调用该事件

           if (!obj.event[eventName]) return;

           // 循环事件函数，一个个触发
           obj.event[eventName].forEach((e, i) => {
               e.call(obj);
           })
       }

   // 绑定点击事件
   addEventListener(document, '点击', function () {
     alert('点击');
   });

   // 利用 系统点击事件 来触发 Trigger
   //    document.onclick = function (){
   //        Trigger(document,'点击');
   //    };


       // 点击三次触发
   //    var num = 0;
   //    document.onclick = function () {
   //        num++;
   //        // 解决每次点击的间隔过长
   //        setTimeout(function (){
   //            num = 0;
   //        },2000);
   //
   //        if(num === 3){
   //            Trigger(document,'点击');
   //            num = 0;
   //        }
   //    }

       // 长按2秒以上出效果 ：鼠标抬起的时间和鼠标按下的时间 的时间差 和2作比较

       document.timer = null;
       document.onmousedown = function (){
           var d = new Date;
           document.timer = setInterval(function (){
               var d2 = new Date;
               if(Math.ceil((d2-d)/1000)>=2){
                   Trigger(document,'点击');
                   clearInterval(document.timer);
               }
           })
       };
       document.onmouseup = function (){
           clearInterval(document.timer);
       }


   ```

   ​

4. ##### 自定义属性---ES6

   ```javascript
   class Events {
     constructor(){
       this.zdy = this.zdy || {};
     }
     on(evName,fn){
       this.zdy[evName] = this.zdy[evName] || [];
       this.zdy[evName].push(fn);
     }
     trigger( evName ){
       if(!this.zdy[evName])return;
       this.zdy[evName].forEach((ele)=> ele())
     }
     //解除订阅
     off(evName,fnName){
       this.zdy[evName].forEach((ele,i)=>{
         if(ele == fnName){
           this.zdy[evName].splice(i,1);
         }
       });
     }
   }

   const o = new Events;
   const f = fn.bind(document);
   function fn(){
     console.log(this);
     alert('上滚了');
     o.off('上滚',f);
   }

   o.on('上滚',f);

   document.onmousewheel = function(ev){
     if(ev.wheelDelta > 0){
       o.trigger('上滚');
     }
   };
   console.log(o);
   ```

5. ##### 组件—选项卡

   ```javascript
   html:
   <body>
       <div id="box"></div>
   <script src="myTabs.js"></script>
   <script>
       /*
           组件:
               为了方便复用（造轮子）
       */
       var t = new Tabs('box');
       t.init({
           btns:['社会','科技','财经'],
           content:['19大','无人驾驶','睁开眼1个亿'],
           events:'onmouseover'
       });

   </script>
   </body>


   css:
   .active{
       background: yellow;
   }
   #box div{
       width:200px;
       height: 200px;
       border: 1px solid #000;
       display: none;
   }
   #box div.show{
       display: block;
   }


   tabs.js:


   class Tabs {
       constructor(id){
           this.box = document.getElementById(id);
           //默认配置
           this.settings = {
               btns:['新闻','体育','音乐','娱乐','游戏'],
               content:['什么时候能脱贫','夜王标枪得第一','双节棍','鹿晗和xx好','LOLS7'],
               events:'onclick'
           }
       }
       init(json){ //json配置项
           //有配置走配置，没配置走默认
           this.settings = Object.assign(this.settings,json);
           this.createCss(); //创建css
           this.creareBtn();//创建按钮
           this.creareCont();//创建内容
           this.Events(this.settings.events);//加事件
       }
       creareBtn(){
           this.settings.btns.forEach((e,i)=>{
               let btn = document.createElement('button');
               btn.className = (i==0)?'active':'';
               btn.innerHTML = e;
               this.box.appendChild(btn);
           });
       }
       creareCont(){
           this.settings.content.forEach((e,i)=>{
               let divs = document.createElement('div');
               divs.className = (i==0)?'show':'';
               divs.innerHTML = e;
               this.box.appendChild(divs);
           });
       }

       Events(event){
           this.btns = Array.prototype.slice.call(this.box.getElementsByTagName('button'));
           this.cont = Array.prototype.slice.call(this.box.getElementsByTagName('div'));
           this.btns.forEach((ele,i)=>{
               ele[event] = () => this.tab(i);
           });
       }
       tab(index){
           this.btns.forEach((ele,i)=>{
               ele.className = '';
               this.cont[i].className = '';
           });
           this.btns[index].className = 'active';
           this.cont[index].className = 'show';
       }
       createCss(){
           const s = document.createElement('link');
           s.href = 'tabs.css';
           s.rel="stylesheet";
           document.getElementsByTagName('head')[0].appendChild(s);
       }
   }
   ```





6. 小东西 filter  classList  every

   ```javascript
   1. filter  过滤
   arr.filter(function(e,i){return 需要的内容}) 返回为新的数组（过滤后的数组）

   var arr = [1,2,3,4,5];
   console.log(arr.filter((e,i)=>{
     if(i%2){
       return e;
     }
   }));  // [2,4]  将数组arr中是2的倍数的数字返回出来 ，返回数组

   2. class的多个添加和删除
   box.classList.add('ok');
   box.classList.remove('hehe');

   3. every  根据条件检查每一项 ，返回出 布尔值

   var arr = [1,2,3,5]; // 检出arr中的数是否都是数字类型，只要有一个不是数字类型就返回false
   console.log(arr.every((e)=>typeof e == 'number')); // true

   ```

   ​