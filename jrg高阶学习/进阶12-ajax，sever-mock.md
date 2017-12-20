### 题目一：ajax 是什么？有什么作用？
1. ajax:ajax是一种技术方案，但不是新的技术。依赖现有的css/html/javascript，最核心的是依赖浏览器提供的XMLHttpRequest对象，是这个对象使得浏览器有发出http请求和接收http响应的功能，并且在页面不刷新的情况下和服务端进行数据的交互。
2. ajax的作用：实现数据的异步操作，在页面不跳转，不刷新的情况下获取数据，提高用户的体验

### 题目二：前后端开发联调需要注意哪些事情？后端接口完成前如何 mock 数据？
1. 注意事项：
    - 数据的类型的约定
    - 接口的名称，请求和响应的格式
2. mock数据
    - 可以使用node搭建一个服务器，返回我们的数据
    - 使用easy-mock模拟

### 题目三：点击按钮，使用 ajax 获取数据，如何在数据到来之前防止重复点击?
1. 解决思路：设置一个开关，当点击后请求的数据没有响应前，做的操作都return掉，无效
2. 具体代码见github [解决数据响应问题](https://github.com/rabbit-tian/Higher-order-JS/tree/master/jrg%E9%AB%98%E9%98%B6%E5%AD%A6%E4%B9%A0/ajax%E7%9A%84%E5%87%BD%E6%95%B0%E5%B0%81%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/%E5%8A%A0%E8%BD%BD%E6%9B%B4%E5%A4%9A)

### 题目四：实现加载更多的功能，代码提交到 github  
1. 具体代码见github [加载更多](https://github.com/rabbit-tian/Higher-order-JS/tree/master/jrg%E9%AB%98%E9%98%B6%E5%AD%A6%E4%B9%A0/ajax%E7%9A%84%E5%87%BD%E6%95%B0%E5%B0%81%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/%E5%8A%A0%E8%BD%BD%E6%9B%B4%E5%A4%9A)




