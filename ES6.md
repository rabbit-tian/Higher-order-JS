1. ##### 箭头函数

   ***箭头函数：this永远（一辈子）跟父级走***

   ```javascript
   // 正常方式
   function fn() {
     console.log(1);
   }

   // ES6箭头函数表示
   var fn = () => console.log(1);

   var fn = (a,b) => console.log(a+b);

   var fn = (a,b) => {
       console.log(a+b);
   }

   var fn = a => console.log(a);
   ```

2. ##### class 面向对象

   - 区别

   ```javscript
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
   ```

   - 面向对象之 ES方法

     ```javascript
     class Tab {
       constructor(){
         this.btns = document.getElementsByTagName('button');
         this.content = document.getElementsByTagName('div');
       }
       Event(){
         var _this = this; //Tab
         for(var i=0;i<this.btns.length;i++){
           this.btns[i].index = i;
           this.btns[i].onclick = function(){
             //this -> 点击的按钮
             // console.log(this);
             // console.log(this.index);
             _this.tabs(this);
           }
         }
       }
       tabs(that){
         for(var i=0;i<this.btns.length;i++){
           this.btns[i].className = '';
           this.content[i].className = '';
         }
         that.className = 'active';
         this.content[that.index].className = 'show';
       }
     }
     var t = new Tab;
     var t2 = new Tab;
     t.Event();
     ```

     ​

3. ##### ES6结构赋值

   ```javascript
   1. a和b换值
   var a = 10;
   var b = 20;
   var [b,a] = [a,b];
   console.log(a,b); // 20,10

   2. 获取元素的 getComputedStyle 值
      let {width,height,left} = getComputedStyle(box);
         console.log(height);
   3. 数组的解构
      1.数组的解构，右边是数组，左边一定要是数组
        let [a,[[b]],c] = [1,[[2]],3]
      2.报错
      	 let [foo] = 1;
   	 let [foo] = false;

     	let [foo] = NaN;

     	let [foo] = undefined;

     	let [foo] = null;

     	let [foo] = {};

   5. 举例
      let [x=40,y] = [10,20];
      console.log(x); // 10
      let [x=y , y = 1] = [,2];
      console.log(y); // 报错 let不会预解析  y没有定义
      console.log(x); // 报错 let不会预解析  y没有定义

      1.对象解构

      左边是对象右边也要是对象

      let {foo:ff,bar:[a,b,c,{kk}]} = {foo:1,bar:[3,4,5,{kk:'mm'}]};

      let {foo} = {foo:1}  -> foo=1

      let {foo:f} = {foo:1}; ->给foo取了个别名叫f，foo就没了，访问foo就报错，要访问f



   ```




4. promise

   - 异步问题，解决回调函数的噩梦

   - ```javascript
     export default function req(url) {

         return new Promise( (resolve, reject)=>{

             if(url==="todos"){
                 setTimeout( ()=> {
                     resolve(data);
                 }, 2000 )
             }else{
                 reject({
                     code: 2,
                     data: 'url 写错了'
                 })
             }

         });
     }

     let promise = req("http://localhost:80/todo"); // 实例化对象

     // promise 的then方法和 catch 方法
     promise
         .then(
             (fdjhk)=>{
                 console.log(fdjhk);
             }
         )
         .catch( (err)=>{
             if(err.code===2){
                 console.log(err.data);
             }
         } )
     ;
     ```

     ​