### 如下代码
    
    ```javascript
    //代码1
    function People(){}
    var p = new People()
    p.__proto__ === People.prototype 
    People.__proto__ === Function.prototype
    People.prototype.__proto__ === Object.prototype
    
    //代码2
    Function.prototype === Function.__proto__         
    Function.prototype === Object.__proto__           
    Function.prototype.__proto__ === Object.prototype 
    Function instanceof Object
    
    //代码3
    Object instanceof Function
    Function instanceof Object
    Function instanceof Function
    Object instanceof Object
    
    1. 问题1：画出代码1的原型图？
    2. 问题2：从代码2你能得出什么结论？试画出原型图？
    3. 问题3：解释代码3的原因？
    
    ```

1. 在解答上面的问题之前，先记住下面几句话，这几句话能解释一切关于原型方面的问题：
  - 当 new 一个函数的时候会创建一个对象，『函数.prototype』 等于 『被创建对象.__proto__』
  - 一切函数都是由 Function 这个函数创建的，所以『Function.prototype === 被创建的函数.__proto__』


