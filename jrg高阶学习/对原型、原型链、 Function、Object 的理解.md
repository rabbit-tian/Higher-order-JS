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
  - 一切函数的原型对象都是由 Object 这个函数创建的，所以『Object.prototype === 一切函数.prototype.__proto__』

2. 三句话
    - p.__proto__ === Person.prototype
    - Person.__proto__ === Function.prototype
    - 一切函数.prototype.__proto__ === Object.prototype
        - Person.prototype.__proto__ === Object.prototype
        - Function.prototype.__proto__ === Object.prototype

3. 题目一：分布解析，见下图
    [原型图1](https://pic1.zhimg.com/b6aa8d4260e78ce3618e0d85febc2bbc_r.jpg)
    - (1). 函数 Person 创建了 对象p，所以 p.__proto__ === Person.prototype
    - (2). Object 函数创建了 Person.prototype, 所以 Person.prototype.__proto__ === Object.prototype
    - (3). Person 作为对象的角色被 函数function创建，所以 Person.__proto__ === Function.prototype

4. 题目二：分布解析，见下图
    [原型图2](https://pic4.zhimg.com/c2891fbeeb0530ef61885c0e6414170a_r.jpg)

    - （1）任何函数都是 Function 创建，所以Function 创建了 Function，所以 Function.prototype === Function.__proto__
    - （2）Object 也是函数。所以Function创建了Object，所以 Function.prototype === Object.__proto__
    - （3）Function.prototype 是普通对象，普通对象是由Object创建的，所以 Function.prototype.__proto__ === Object.prototype

5. 题目三
    - instanceof 的作用是判断一个对象是不是一个函数的实例，实际上是判断fn的prototype是不是在obj的原型链上。比如: obj.__proto__ === fn.prototype
    - 对于 Function instanceof Function，因为 Function.__proto__ === Function.prototype，所以为true。
    - 对于 Object instanceof Object， 因为 Object.__proto__.__proto__ === Function.prototype.__proto__ === Object.prototype ， 所以为true
    - 对于 Function instanceof Object, 因为 Function.__proto__.__proto__ === Function.prototype.__proto__ === Object.prototype， 所以为 true
    - 对于 Object instanceof Function， 因为 Object.__proto__ === Function.prototype，所以为 true

