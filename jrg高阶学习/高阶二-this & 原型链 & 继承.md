### 问题1： apply、call 、bind有什么作用，什么区别
1. apply和call
    - call和apply，调用一个函数，传入函数执行上下文及参数
    
    ```javascript
    // call
    var obj = {
        value: 200
    }
    function fn (a,b) {
        console.log(this.value+a+b) // 207
    }
    fn.call(obj,3,4) // call的第一个参数是this的指向
    
    // apply: 和call唯一的不同，参数
    var obj = {
        value: 200
    }

    function fn(a, b) {
        console.log(this.value + a + b) // 207
    }

    fn.apply(obj, [3, 4]) // call的第一个参数是this的指向
    
    ```
    
2. bind，返回一个新函数，并且使函数内部的this为传入的第一个参数

    ```javascript
    document.onclick = function () {
    console.log(this) // document
    
    // 将定时器内的this指向改为事件函数的对象document
    setTimeout(function () {
        console.log(this) // document
        }.bind(this),50)
    }
    ```
    
### 问题2： 以下代码输出什么?

```javascript

var john = { 
  firstName: "John" 
}
function func() { 
  alert(this.firstName + ": hi!")
}
john.sayHi = func
john.sayHi() // "John:hi!"

```

### 问题3： 以下代码输出什么,为什么?

```javascript

func() 
function func() { 
  alert(this) // [object Window]
}

/*
    var fun= function(){}
    fun是window中的。
    相当于
    window.fun = function(){}
    因此，this指向window
*/

```

### 问题4：下面代码输出什么

```javascript   
document.addEventListener('click', function(e){
    console.log(this); // document，DOM对象绑定事件
    setTimeout(function(){
        console.log(this); // window，setTimeout、setInterval 这两个方法执行的函数this也是全局对象
    }, 200);
}, false);
```

### 问题5：下面代码输出什么，why
```javascript   
var john = { 
  firstName: "John" 
}

function func() { 
  alert( this.firstName ) // "John"
  // 通过call改变this的指向为john
}
func.call(john)
```
### 问题6： 以下代码有什么问题，如何修改

```javascript
var module= {
  bind: function(){
    $btn.on('click', function(){
      console.log(this) //this指向 $btn
      this.showMsg();
    }).bind(this)
  },

  showMsg: function(){
    console.log('饥人谷');
  }
}

```

### 问题7：有如下代码，解释Person、 prototype、__proto__、p、constructor之间的关联。


```javascript
function Person(name){
    this.name = name;
}
Person.prototype.sayName = function(){
    console.log('My name is :' + this.name);
}
var p = new Person("若愚")
p.sayName();
```
1. Person：构造函数（类）
2. prototype：构造函数原型
3. __proto__：原型链
4. P：实例化对象，通过__proto__，指向prototype
5. constructor：原型的属性，指向 构造函数 Person
6.` p.__proto__=== Person.prototype`
7. `p.__proto__.constructor === Person.prototype.constructor === Person`


### 问题8： 上例中，对对象 p可以这样调用 p.toString()。toString是哪里来的? 画出原型图?并解释什么是原型链。

1. 对象p会在自己的属性和方法找，找到后就返回；
2. 没有找到，通过p的proto属性，找到其类型Person的prototype属性(原型对象)，继续查找，找到就返回；
3. 没有找到，通过prototype的_proto_属性找到Object的prototype属性(任何类的prototype属性本质上都是个类Object的实例,所以prototype也和其它实例一样也有个_proto_内部属性，指向其类型Object的prototype),找到返回
4. 图解：[原型图](https://upload-images.jianshu.io/upload_images/6828981-94042de4a64aacdb.png?imageMogr2/auto-orient/)
5. 原型链：JS在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做proto的内置属性，用于指向创建它的函数对象的原型对象prototype。在访问一个对象属性的时候，如果对象本身没有找到这个属性，就会沿着原型链一层一层的寻找。

### 问题9：对String做扩展，实现如下方式获取字符串中频率最高的字符

```javascript
String.prototype.getMostOften = function(){
  var obj = {}
  for(var i=0; i<this.length; i++){
    var item = this.substr(i,1)
    if(obj[item]){
      obj[item]++
    }else{
      obj[item] = 1
    }
  }
  var num =0,max = null
  for(key in obj){
    if(obj[key]>num){
      num = obj[key]
      max = key
    }
  }
  return max
}

var str = 'ahbbccdeddddfg';
var ch = str.getMostOften();
console.log(ch); //d , 因为d 出现了5次

```

### 问题10： instanceOf有什么作用？内部逻辑是如何实现的？
1. 作用:instanceof运算符返回一个布尔值，表示指定对象是否为某个构造函数的实例
2. instanceof的原理是检查原型链，对于那些不存在原型链的对象，就无法判断。

```javascript
var arr = [1, 2, 3];
arr instanceof Array; //true
其实是判断arr.__proto__===Array.prototype
arr instanceof Object; //true
判断arr.__proto__.__proto__===Object.prototype
```

### 问题11：继承有什么作用?
1. 继承是指一个对象直接使用另一对象的属性和方法。通过继承，可以使子类共享父类的属性和方法，可以覆盖(重写)和扩展父类的属性和方法，减少内存的使用，提高代码复用性。

### 问题12： 下面两种写法有什么区别?

```javascript
//方法1
function People(name, sex){
    this.name = name;
    this.sex = sex;
    this.printName = function(){
        console.log(this.name);
    }
}
var p1 = new People('饥人谷', 2)

//方法2
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}

Person.prototype.printName = function(){
    console.log(this.name);
}
var p1 = new Person('若愚', 27);
```

- 区别
    - 方法1中每个实例的printName方法实际上作用一样，但是每个实例要重复一遍，大量对象存在的时候是浪费内存；
    - 方法2中把printName方法存放到Person.prototype里，每个实例对象的proto都指向Person.prototype能访问到，减少了对象的使用。

### 问题13： Object.create 有什么作用？兼容性如何？
1. 作用：Object.create() 方法使用指定的原型对象和其属性创建了一个新的对象，可以让另外一个构造函数的 prototype 的 _proto_ 等于这个创建的对象，实现继承
2. 兼容性：各大浏览器的最新版本（包括IE9）都兼容了这个方法。
### 问题14： hasOwnProperty有什么作用？ 如何使用？
1. 作用:hasOwnPerperty是Object.prototype的一个方法，返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上。
2. 如何使用：obj.hasOwnProperty(prop)
    - prop：要检测的属性 （字符串 名称或者 Symbol）
    
    ```javascript
    o = new Object();
    o.prop = 'exists';
    o.hasOwnProperty('prop');// 返回 true
    o.hasOwnProperty('toString');// 返回 false
  o.hasOwnProperty('hasOwnProperty');// 返回 false
    ```

### 问题15：如下代码中call的作用是什么?

```javascript
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}
function Male(name, sex, age){
    Person.call(this, name, sex);    //这里的 call 有什么作用
    this.age = age;
}
```
- 作用：改变构造函数 Person 的this指向，指向Male，使Male的实例对象可以使用Person的属性

### 问题16： 补全代码，实现继承

```javascript
function Person(name, sex){
    this.name = name
    this.sex = sex
}

Person.prototype.getName = function(){
    console.log(this.name)
};    

function Male(name, sex, age){
   Person.call(this,name,sex)
   this.age = age
}

Male.prototype = Object.create(Person.prototype)
Male.prototype.constructor = Male


Male.prototype.getAge = function(){
    console.log(this.age)
};

var ruoyu = new Male('若愚', '男', 27);
ruoyu.getName();
```


