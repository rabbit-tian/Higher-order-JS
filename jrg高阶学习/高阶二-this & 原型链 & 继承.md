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
    因此this指向window
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



