1. ##### 包装函数

   - 由于非空对象才能加属性和方法，因此 如string这种简单类型必须通过包装函数来包装后，调用属性和方法

   - 包装函数：当去调用简单类型的属性或者方法时，系统会偷偷的把简单类型转化为复杂类型，使用该对象的属性和方法，之后又偷偷的销毁。

   - 举例分析

     ```javascript
     var str = 'abc';
     var arr = [1,2,3];

     console.log(str.length); // 3
     str.length = 1; // 简单类型的length只能读不能写
     console.log(str.length); // 3

     console.log(arr.length); // 3
     arr.length = 1; // 复合类型的length即能读又能写
     console.log(arr.length); // 1


     var str2 = new String('abc');
     console.log(str2.length); // 3
     str2.length = 1;// 简单类型的length只能读不能写
     console.log(str2.length); // 3
     console.log(str2);

     // new完后 可以改变添加属性和修改属性
     str2.num = 1;
     console.log(str2.num); // 1
     str2.num = 2;
     console.log(str2.num); // 2
     ```

     ​

2. ##### toString

   ```javascript
       /*
           只要使用alert那么它就会偷偷地调用toSting方法

           toSting -> 把xx类型转成string类型

           所有的类型都有toSting方法

           obj -> [object Object]  
           		第一个object代表类型
           		第二个Object代表系统构造函数是谁

           toSting()  还能转进制  -> var num = 10; num.toString(进制数)

       */

   // 1. alert 调用 toString的方法
   var obj = {name: 'tian'};
   alert(obj);

   // 2. Array借用object的toString弹 [object Object] 的方法
   var arr = [1,2,3,4,5];
   Array.prototype.toString = Object.prototype.toString;
   console.log(arr.toString()); // [object Object]

   // 3. toSting()  还能转进制
   var num = 12;  
   console.log(num.toString(2)); // 1100  1*(2^3) + 1*(2^2) +0*(2^0) +0*(2^0) = 12
   ```

   ​

3. 如何判断下面的数据类型是数组

   ```javascript
   var arr = [1,2,3,4];

   1. 方法一：push
   console.log(!!arr.push);  // true

   2. 方法二：通过 Object.prototype.toString 能弹出 [object Object] 的特性
   			并利用 call改变 this指向 ，弹出 [object Array]

   var arr = [1,2,3,4];
   //Array.prototype.toString //我的车（没有车灯）
   var s = Object.prototype.toString;//他的车（有车灯）
   console.log(Object.prototype.toString.call(arr) === '[object Array]'); // true

   3. 根据 document.getElementsByTagName 的方法获取的是 类数组
   var lis = document.getElementsByTagName('li'); // 类数组
   lis = Array.prototype.slice.call(lis); // 利用数组的slice方法，通过call改变this的指向为lis，此时slice返回出 一个新的数组
    
   // 此时lis就可以使用 forEach 的方法
   lis.forEach(function (ele,i){
       ele.onclick  = function (){
           console.log(i);
       }
   },document); 
   // forEach的第一个参数：函数  第二个参数：document代表改变 this指向 document

   ```

   ​

4. ##### 修改this的指向  （call   apply    bind）

   ```javascript
       /*
          修改this指向的方法  
           call:
               函数身上的一个方法，有若干的参数

               第一个参数：
                   改变this指向

               第二个往后的参数：
                   就是实参的个数。

           apply:
               只有2个参数

               第一个参数：
                   改变this指向

               第二个参数:
                   数组

           bind:
               修正this指向但是不直接调用，它会返回一个新的函数
               当调用新函数的时候会调出修改之后的this

               若干个参数:
                   第一个参数：
                       改变this指向
                   第二个往后的参数：
                       就是实参的个数。

       */

   function fn(a,b){
       console.log(a+b); // 3
     	console.log(this); // document
   }
   fn.call(document,1,2); 



   function fn(a,b,c){
       console.log(a+b+c); // 6
     	console.log(this); // document
   }
   fn.apply(document,[1,2,3]);



   function fn(a,b){
      alert(a+b); // 3
      console.log(this);
   }

   var f = fn.bind(document); // bind将fn函数的this改向 document
   f(1,2); // document
   ```

   ​

5. ##### 找到数组中最小的数字

   ```javascript
   var arr = [70,30,11,4,1,3,5,7,9,0];

   console.log(Math.max.apply('',arr)); // max的参数只能是基础类型的数字，但是利用apply的第二个参数是数组的属性，将arr数组作为参数传给 Math.max 使用，继而实现数组能用max方法
   ```

   ​

6. ##### constructor

   ```javascript
   constructor：实例化对象的一个属性，指向构造函数
   			*** 不过不准确，容易被修改。

   constructor被修改的情况
   function Teacher(name,age){
     this.name = name;
     this.age = age;
   }
   Teacher.prototype = {
     constructor:Teacher, //此种写法要加这句话，constructor才不会被修改
     say:function(){
        alert(this.name);
     }
   }
   var t = new Teacher('尹小胖',78);
   t.say();
   console.log(t.constructor); // 函数 Teacher

   ```

   ​

7. ##### instanceof

   ```javascript
   instanceof : 二元运算符
   作用：判断 左值是不是右值构造出来的  左值必须要为对象  返回的是boolean值
   实例化(对象)***  instanceof  构造函数

   举例： 
   function fn(){}
   var f = new fn;
   console.log(f instanceof fn); // true
   ```

   ​

8. ##### hasOwnProperty

   ```javascript
   *** obj.hasOwnProperty('属性名');
   是不是自身的属性:函数内的。

   class Fn {
     constructor(name){
        this.name = name;
     }
   say(){
       console.log(this); //Fn{}
       function fn2(){ // ES6 的 class严格模式下，此处的this为undefined
          console.log(this); //undefined
       }
       fn2(); // 此处不是new出来的
     }
   }

   var f = new Fn('田甜');
   f.say();
   console.log(f.hasOwnProperty('name')); // true
   ```

   ​

9. ##### 深度克隆 deepClone

   ```javascript
   // 此处要考虑arr中可能有数组，也可能有对象，此时o可能是[],也可能是{}

   var arr = [1,2,3,4,[9,5,6,{name:'tian'}]];

   function deepClone(obj){
       var o = null;
       // 此处注意两个object，第一个object：类型(小写) 第二个Object: 系统的构造函数 (大写)
       if(Object.prototype.toString.call(obj) === '[object Object]'){
           o = {};
       }else{
           o = [];
       }

   //    var os = Object.prototype.toString;
   //    var o = os.call(obj) === '[object Object]'? {}:[];

       // 使用for in来循环obj ，如果 obj的键值得类型是object，就再递归直到找到 其为简单数据类型再把值 赋给o
       for (var attr in obj) {
           if(typeof obj[attr] == 'object'){
               o[attr] = deepClone(obj[attr]);
           }else{
               o[attr] = obj[attr];
           }
       }
       return o;
   }

   var arr2 = deepClone(arr);

   arr2[4].push(0);

   console.log(arr2); // [1,2,3,4,[9,5,6,{name:'tian'},0]]
   console.log(arr); // [1,2,3,4,[9,5,6,{name:'tian'}]]
   ```

   ​

10. ##### 面向对象的继承----拷贝继承

    ```javascript
    	<style>
            #box,#box2{
                width: 100px;
                height: 100px;
                background-color: red;
                position: absolute;
                left: 0;
                top: 0;
            }
            #box2{
                left: 100px;
                background-color: yellowgreen;
            }
        </style>
    </head>
    <body>
    <div id="box"></div>
    <div id="box2"></div>

    <script>
      function Drag(id){ // 构造函数
            this.box = document.getElementById(id);
            this.disX = 0;
            this.disY = 0;
        }

        Drag.prototype.init = function (){
            var _this = this;
            this.box.addEventListener('mousedown',function (ev){
                _this.down(ev);
            });
        };

        Drag.prototype.down = function (ev){
            var _this = this;

            this.disX = ev.clientX - this.box.offsetLeft;
            this.disY = ev.clientY - this.box.offsetTop;

            var move = function (ev){
                _this.move(ev);
            };
            var up = function (ev){
                _this.up(ev,move,up);
            };

            document.addEventListener('mousemove',move);
            document.addEventListener('mouseup',up);
        };

        Drag.prototype.move = function (ev){
            this.box.style.left = ev.clientX - this.disX + 'px';
            this.box.style.top = ev.clientY - this.disY + 'px';
        };

        Drag.prototype.up = function (ev,move,up){
            document.removeEventListener('mousemove',move);
            document.removeEventListener('mouseup',up);
        };



        //属性的继承 -- 类式继承（构造继承）
        function Drag2(id){ // 构造函数
            Drag.call(this,id);
        }

        // 拷贝继承
        // 如果直接使用传址的方法，两个box都有吸附效果

        // 浅拷贝，传值 的方法将drag拷贝一份，是一个新的地址，改动后不会影响drag的效果

        for (var attr in Drag.prototype) {
            if(Drag.prototype.hasOwnProperty(attr)){
                Drag2.prototype[attr] = Drag.prototype[attr];
            }
        }

        // 拷贝继承的缺点：drag2不仅会继承drag的方法，还会继承老爹object的方法
        /* Object.prototype.say = function (){
            console.log(11);
        }; */


        // 改变drag2的move
        Drag2.prototype.move = function (ev){
            var l = ev.clientX - this.disX;
            var t = ev.clientY - this.disY;

            if(t<50){
                t= 0;
            }else if(t>window.innerHeight - this.box.offsetHeight - 50){
                t = window.innerHeight - this.box.offsetHeight;
            }

            this.box.style.left = l + 'px';
            this.box.style.top = t + 'px';
        };



        var d = new Drag('box');
        d.init();

        var d2 = new Drag2('box2');
        d2.init();


        console.dir(d2);
    ```

    ​

11. ##### 面向对象----原型继承

    ```javascript
    <style>
            #box,#box2{
                width: 100px;
                height: 100px;
                background-color: red;
                position: absolute;
                left: 0;
                top: 0;
            }
            #box2{
                left: 100px;
                background-color: yellowgreen;
            }
        </style>
    </head>
    <body>
    <div id="box"></div>
    <div id="box2"></div>

    <script>
        function Drag(id){ // 构造函数
            this.box = document.getElementById(id);
            this.disX = 0;
            this.disY = 0;
        }

        Drag.prototype.init = function (){
            var _this = this;
            this.box.addEventListener('mousedown',function (ev){
                _this.down(ev);
            });
        };

        Drag.prototype.down = function (ev){
            var _this = this;

            this.disX = ev.clientX - this.box.offsetLeft;
            this.disY = ev.clientY - this.box.offsetTop;

            var move = function (ev){
                _this.move(ev);
            };
            var up = function (ev){
                _this.up(ev,move,up);
            };

            document.addEventListener('mousemove',move);
            document.addEventListener('mouseup',up);
        };

        Drag.prototype.move = function (ev){
            this.box.style.left = ev.clientX - this.disX + 'px';
            this.box.style.top = ev.clientY - this.disY + 'px';
        };

        Drag.prototype.up = function (ev,move,up){
            document.removeEventListener('mousemove',move);
            document.removeEventListener('mouseup',up);
        };


        //属性的继承 -- 类式继承（构造继承）
        function Drag2(id){ // 构造函数
            Drag.call(this,id);
        }

        // 原型继承
        function Paohui(){}
        Paohui.prototype = Drag.prototype; // paohui函数和Drag的空间地址一样
        var p = new Paohui; // 作用：new一个新对象paohui，阻隔drag和drag2，并利用新对象paohui的原型链 ，将drag的原型链接给drag2
        Drag2.prototype = p; // Drag2 和 paohui的实例化对象 p 的空间地址一样，Drag2通过p的原型链找到paohui的prototype -> Drag的prototype
        Drag2.prototype.constructor = Drag2; // 由于属性的继承，Drag2实例化对象的constructor是 Drag函数，因此要人为修改成Drag2

    //    function Paohui(){}
    //    Paohui.prototype = Drag.prototype;
    //    Drag2.prototype = new Paohui;
    //    Drag2.prototype.constructor = Drag2;



        // 改变drag2的move
        Drag2.prototype.move = function (ev){
            var l = ev.clientX - this.disX;
            var t = ev.clientY - this.disY;

            if(t<50){
                t= 0;
            }else if(t>window.innerHeight - this.box.offsetHeight - 50){
                t = window.innerHeight - this.box.offsetHeight;
            }

            this.box.style.left = l + 'px';
            this.box.style.top = t + 'px';
        };



        var d = new Drag('box');
        d.init();

        var d2 = new Drag2('box2');
        d2.init();

        console.log(d2.constructor);
    </script>
    </body>
    ```

    ​