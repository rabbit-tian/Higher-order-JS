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

5. 字符串扩展

   - includes() : 字符串中是否包含某个(段)字符，返回布尔值
   - 'tian'.startswidth('t'): 字符串是否以 't' 开头，返回布尔值
   - 'tian'.endwidth('n'): 字符串是否以 'n' 结尾，返回布尔值

6. 数值扩展

   - Number.parseInt('12.2px')   :  12   数字取整
   - Number.parseInt('')  ： NaN  
   - Number.parseInt('110'，2)   : 二进制转  十进制   6
   - Number.isNaN('a')   :  这个不会经过  number转 =>  false
   - isNaN('')  ： false   （0不是NaN）
   - Number.isInteger(): 用来判断是否是一个正数

7. 数组扩展

   - for of 循环

     ```javascript
     let arr = [1,2,3,4,5]
     for(var i of arr.keys()){
       	console.log(arr[i]) // 1,2,3,4,5
     }
     ```

   - entries,拿key和value进行遍历

     ```javascript
     1.entries,拿key和value进行遍历
     2.只有拥有遍历接口(Symbol.iterator)才能使用for of循环
     3. 这个遍历接口可以返回对象，对象中有一个叫做next的函数，这个函 数需要返回对象

     let obj = {name:'hehe',age:18};

     //添加遍历器
         obj[Symbol.iterator] = function(){
             let arr = Object.keys(obj); //拿到对象key值[name,age]
             let index = 0;
             return {
                 next(){
                     //如果添加成立就停止遍历
                     if(index >= arr.length){
                         return {
                             value:1,
                             done:true
                         }
                     }else{
                        //继续遍历
                         return {
                             value:{
                                 val:obj[arr[index]],//obj[arr[0]] -> obj.name
                                 key:arr[index++] //arr[0++]  name
                             },
                             done:false
                         }
                     }
                 }
             }
         }

         
         for(let {val,key} of obj){
             console.log(val,key) // hehe name   18 "age"
         }

     ```

     ​

   ​

   ​