### 问题1： apply、call 、bind有什么作用，什么区别
1. apply和call
    - call apply，调用一个函数，传入函数执行上下文及参数
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



