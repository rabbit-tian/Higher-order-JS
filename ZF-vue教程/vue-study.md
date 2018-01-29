### 数组的方法
1. slice:不改变原数组


### forEach,for in,for,for of 的区别
1. for: 编程式
2. forEach: 
    - 声明式（不关心如何实现）
    - 不支持 return
3. for in
    - for(let key in arr)
    - key 会变成字符串类型
    - 包括数组的私有属性也能打印出来 如：arr.b = 100
4. for (let val of val)
    - 支持return
    - 不能遍历对象
5. filter 过滤
    - 不会改变原数组
    - 返回：过滤后的结果
    - 回调函数里面：返回true，放到新数组中
    - 删除某一项
6. map 映射：将一个数组映射成一个新数组
    - 不操作原数组
    - 返回新数组
    - 回调函数中：返回啥这项就是啥
    - 修改，更新每一项
7. includes: 数组中是否包含
    - [1,3,2,5,4].includes(5) => true
8. find: 返回找到的那一项 不会改变数组 回调函数中返回true表示找到了，找到后停止循环
    - 找具体的某一项
9. some：找到true位置，返回true，找不到返回false
10. every: 找到false后停止，返回false
11. reduce：收敛，四个参数
    - 返回叠加后的结果
    - 回调函数返回：下一个的上一个 prev
    
    ```javascript
    let arr = [
        {price:30,count:2},
        {price:40,count:2},
        {price:50,count:2},
        {price:60,count:2}
    ]
    
    let newArr = arr.reduce(function (prev,next) {
        console.log(prev,next)
        /*
        0 {price: 30, count: 2}
        reduce.html:19 60 {price: 40, count: 2}
        reduce.html:19 140 {price: 50, count: 2}
        reduce.html:19 240 {price: 60, count: 2}
        */
        return prev+next.price*next.count
    },0) // 0是初始值
    console.log(newArr) // 360
    
    
    // 将二维数组变成一维数组
        let arr1 = [[1,2,3],[4,5,6],[7,8,9]]
        let newArr1 = arr1.reduce(function (prev,next) {
            return prev.concat(next)
        })
        console.log(newArr1) // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ```

### 箭头函数 arrow
1. 不具备 this，arguments，自己家没有就找上一级this
2. 如何更改this： call，apply，bind
3.  

```javascript
function a(b){
    return b+1
}
// 改装成箭头函数
let a = b => b+1


function a(b) {
    return function(c) {
        return b + c
    }
}
a(1)(2)
// 改装成箭头函数
let a = b => {  
    return c => b + c
}
a(1)(2)

```

### 闭包
1. 函数执行的瞬间
2. 不销毁的作用域
3. 当执行后返回的结果必须是引用数据类型，被外界变量接收，此时这个函数不会销毁
4. 模块化（主要是）

### 框架和库
- 框架：vue  拥有完整的解决方案，我们写好，人家调用我
- 库：jQuery ：我们调用他

### 渐进式（渐进增强）
- vue全家桶：vue.js  + vue-router  + vuex + axios
- 通过组合完成一个完整的框架
- 声明式渲染，无需关心怎么实现
- 组件系统
- 客户端路由（vue-router）
- 大规模状态管理 （vuex）
- 构建工具 （vue-cli）

### vue的特点
- 核心只关注视图层 view
- 易学，轻量，灵活
- 适用于移动端开发

### vue的两大核心点
- 响应的数据变化
- 组合的视图组件
    
### MVC  单向的
- model 数据
- view 视图
- controler 控制器

### MVVM（angular ,vue） 双向的
- model 数据
- view 视图
- viewModel 视图模式

### 安装vue
- npm init 初始化 产生一个package.json文件来描述项目依赖，不能大写，不能有特殊字符，不能中文，不能和安装包同名
- 或者 npm init -y :一键生成（注意文件名不能是vue等）

