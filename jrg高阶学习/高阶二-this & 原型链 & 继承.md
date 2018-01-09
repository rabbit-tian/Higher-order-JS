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




