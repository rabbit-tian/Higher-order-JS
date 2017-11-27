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
   - Promise 是异步编程的一种解决方案
   - 语法：
   
        ```javascript
        new Promise(function (){
					// 异步操作
			})
        ```
    - 三种状态：
        - pending（进行中）
        - fulfilled（已成功）
        - rejected（已失败）
    - promise对象下有一个方法 then
        - promise对象.then(resolvedFn,rejectedFn)
        - 当promise对象的状态变为resolved，那么执行resolvedFn，如果是rejected，执行rejectedFn
    - 举例说明
        
      ```javascript
    	function ajax1(){
			return new Promise(function (reslove,reject){
				$.ajax({
					url: 'http://192.168.2.75:3001/user',
					success:reslove,
					error: reject
				})
			})
		}
		
		function ajax2(){
				return new Promise(function (reslove,reject){
					$.ajax({
						url: 'http://192.168.2.75:3001/adress',
						success:reslove,
						error: reject
					})
				})
			}
			
		ajax1()
			.then(function(data) {
				console.log(data);
				return ajax2()
				// 如果手动的return 一个promise对象，
               // 那么下一个then就是这个promise下的方法
			})
			.then(function(data) {
				console.log(data);
			})
			.catch(function (err){  //  捕获错误的
				console.log(err);
			})
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

8. Object.is():判断2个值是否相等

   ```javascript
   NaN === NaN  //false
   Object.is(NaN, NaN)   //true
   Object.is({},{})  //flase
   Object.is(+0,-0); //flase
   ```

9. assign:从右往左赋值,浅拷贝

   ```javascript
   let obj = Object.assign({name:'ee'},{name:'hh',age:13},{job:'web'});
   ```

10. 对象的   keys, values, entries

   ```javascript
   let {keys, values, entries} = Object;
   let obj = { a: 1, b: 2, c: 3 };

   console.log(entries(obj)); // [["a":1],["b":2],["c":3]]
   console.log(keys(obj));   // ["a", "b", "c"]
   console.log(values(obj)); // [1, 2, 3]
   ```

11. Set(): 里面的内容不能有重复的

    ```javascript
    // 数组去重
    let arr = [1,2,2,3,3,4,54,32,2,3,4,6,2,1,2,1];

    1. 方法一：
    for(var i=0;i<arr.length;i++){
      for(var j=i+1;j<arr.length;j++){
        if(arr[i] == arr[j]){
          arr.splice(j,1);
          j--;
        }
      }
    }

    2. 方法二： 可以去重，包括字符串去重

    let obj = {};
      let arr2 = [];
      for(var i=0;i<arr.length;i++){
        if(!obj[typeof arr[i] + arr[i]]){
          obj[typeof arr[i] + arr[i]] = 1;
          arr2.push(arr[i]);
        }
    }

    3. ES6方法去重：Set
    [... new Set(arr)] 
    ```

    ​

