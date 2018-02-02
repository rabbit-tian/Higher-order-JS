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

### 安装vue,初始化一个项目
- npm init 初始化 产生一个package.json文件来描述项目依赖，不能大写，不能有特殊字符，不能中文，不能和安装包同名
- 或者 npm init -y :一键生成（注意文件名不能是vue等）
- npm init vue: 安装vue依赖

### vue的创建过程 定义属性
- Object.defineProperty

```javascript
let obj = {}
Object.defineProperty(obj,'name',{
    value:1, // 属性值
    configurable: false, // 是否可删除
    writable: false, // 是否可修改
    enumerable: false, // 是否可枚举
})
// delete obj.name
// obj.name = 1000
// for(let key in obj){
//     console.log(key)
// }
console.log(obj)
```

### vue的双向数据绑定 mvvm
- 表单元素 input checkbox select textarea radio
- vue的 指令 v-：知识dom的行间属性，vue赋予这种指令一定的意义，来实现特殊的功能，所有属性要以 ”v-“ 开头
- v-model: 实现数据的双向绑定，数据影响视图，视图也会影响数据 
- value，selected，checked 属性，vue不识别
 
### vue的基础指令
- v-model: 数据的双向绑定
    - text：数据
    - checkbox：布尔值是，多个选项时，需要value属性
- v-text: 等同于 {{}}
    - 优点：由于页面会先加载dom，后加载vue，页面出现的一瞬间会有{{}}闪现，而v-text不会出现这种状况
    - 如果先加载vue，后加载dom，页面会出现白屏
- v-for:循环，高效，复用原来的结构，循环谁，就在谁身上加 v-for 属性 
- v-on:click= "fn" 或 @:click= "fn" 
    - 绑定事件 
    - 函数放在 methods 里面，methods和data里面的数据都会放到vm上，所以，不要重名
    - methods中的this指向：实例 vm
    - @:click= "fn()":如果不传参数，则不要写括号，会自动传入事件源，如果写参数，要手动传入 $event 属性
    - 键盘修饰符 ：modifiers  => @:click.enter= "fn"
- :img  :name  和 v-bind 等同，动态绑定数据
- v-if: 显示隐藏，操作dom，适合一开始就确认好状态
- v-show: 显示隐藏，操作样式，适合频繁操作dom

### 自定义指令
1. dierctives

```
<div id="app">
<!--v- 开头-->
    <button v-color="flag">change color</button>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script>
    let vm = new Vue({
        el: '#app',
        directives: {
            // v-color 而来的 函数名
            color (el,bindings) {
                console.log(arguments)
                el.style.backgroundColor = bindings.value
            }
        },
        data: {
            flag: 'red'
        },
    })
</script>
```

### v-bind 简写 ":"
- 动态绑定“属性”
- 图片 <img :src="变量" :width="变量">
- :class 动态绑定样式
    - 对象的形式 `<div class="a" :class="{b:flag,c:cut}">我是田甜啦</div>`
    - 数组的形式 `<div class="a" :class="[class1,class2]">我是tian啦</div>` ,class1和class2后端返回的数据
- :style 动态添加行间样式
    
    ```
    <div id="app">
        <!-- :style  动态添加行间样式 -->
        <!-- 对象的形式 -->
        <div :style="{background: 'pink',color: 'red'}">我是田甜啦</div>
        <!-- 数组的形式 -->
        <div :style="[sty1,sty2,{fontSize: '50px'}]">我是tian啦</div>
    </div>
    ```

### 数据的响应式变化 reactivity
- 数据劫持：vue会循环data中的数据，一次增加getter和setter
- 使用变量时，先要初始化，否则新加的属性不会导致页面刷新

### vue 钩子函数 created
- 在数据初始化后会调用，this指向vm实例
- 专门用来发送ajax的方法

### watch
1. 优点: 支持异步，其余和computed一样
2. 如果不需要异步，一般用 computed

```
    <div id="app">
        <input type="text" v-model="info"> {{msg}}
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script>
        let vm = new Vue({
            el: '#app',
            watch: {
                // 根据 获取输入框的内容来 算出错误信息
                // 支持异步
                // info要和input中的一样
                info (newVal,oldVal) {
                    setTimeout( () =>{
                        if (newVal.length <3) {
                            return this.msg = '名字太短'
                        }
                        if (newVal.length >6) {
                            return this.msg = '名字太长'
                        }
                    },1000)
                }
            },
            data: {info:'', msg: ''}

        })
    </script>
```

### 计算属性 computed
- 原理： Object.defineProperty()
- 优点：数据会被缓存，如果依赖的数据（归vue管理的数据，可以响应式变化的）没有发生变化，就不会重新执行，节省性能
- 两部分组成： get 和 set（不能只写set，必须要有get）
- set: 一般通过js赋值影响其他人，或者表单元素设置值得时候会调用set
- 缺点： 不支持异步  

```javascript
全选：<input type="checkbox" v-model="checkAll">

单选：<input type="checkbox" v-model="item.isSelected">

computed: { // 计算属性：
    // 动态计算 checkAll 的值
    checkAll: {
        get () { // 获取值
            // 当页面加载时，要获取 checkAll的值，此时get函数被调用
            // 根据单选的状态计算全选的状态
            return this.products.every(item => item.isSelected)
        },
        set (val) { // 设置值
            // 当点击全选按钮时，此时checkAll的值改变，调用了set函数
            // 根据全选的状态计算单选的状态
            this.products.forEach(item => item.isSelected = val)
        }
    },
    // 动态计算 总价值
    sum: { // sum 的数据会被缓存，如果依赖的数据没有发生变化，就不会重新执行，节省性能 
        get () {
            return this.products.reduce((prev,next) => {
                if (!next.isSelected) return prev; // 只计算勾选的价格
                return prev + next.proPrice * next.proCount
            },0)
        }
    }
    // 如果只有get方法的简写
    sum() {
        return this.products.reduce((prev, next) => {
            if (!next.isSelected) return prev; // 只计算勾选的价格
            return prev + next.proPrice * next.proCount
        }, 0)
    }
}


```

### 动画 transition
- v-show
- transition
- v-enter
- v-enter-active
- v-leave-active

```javascript

.tian-enter{
    opacity: 0;
}
.tian-enter-active{
    transition: 1s linear;
}
.tian-leave{
    opacity: 1;
}
.tian-leave-active{
    opacity: 0;
    transition: 1s linear;
}

<transition name="tian">
    <div v-show="flag" class="box"></div>
</transition>
```

- 引入animate.css

```javascript
<link rel="stylesheet" href="./node_modules/animate.css/animate.css">

<transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
    <div v-show="flag" class="box"></div>
</transition>
```

- 一组动画

```javascript
<transition-group enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
    <div v-for="(item,index) in newArr" :key="index">{{item}}</div>
</transition-group>
```

### 事件 （冒泡，捕获）

1. 冒泡
    - @click.stop=""  : 阻止冒泡 （事件传播）
    - 原生阻止冒泡写法
        - stopPropagation()
        - cancelBubble = true
        - 冒泡：从里往外冒

        ```
        <div id="app">
            <div @click="parent">parent
                <div @click.stop="child">child
                    <div @click.stop="grandson">grandson</div>
                </div>
            </div>
        </div>
        ```
    
        ```
        <div id="app">
        <!-- 加了 @click.capture.stop ，此时 只会弹出 parent，原因：stop 阻止 事件传播，不再往下了-->
            <div @click.capture.stop="parent">parent
                <div @click.stop="child">child
                    <div @click="grandson">grandson</div>
                </div>
            </div>
        </div>
        ```

2. 捕获
    - @click.capture="parent"  : 捕获
    - 代替 addEventListener('click',fn)
    - 点击 孙子，先执行向内捕获阶段，然后再向外冒泡(不包括捕获对象)
    
    ```
    <div id="app">
        <!-- 点击grandson： 先 parent(捕获) => grandson(冒泡) => child(冒泡)-->
        <div @click.capture="parent">parent
            <div @click="child">child
                <div @click="grandson">grandson</div>
            </div>
        </div>
    </div>
    ``` 

3. 阻止默认行为
    - @click.prevent="parent"  : 阻止默认行为
    - 防止a标签跳转
    
    ```
    <a href="https://www.baidu.com/" @click.prevent="parent">parent</a>
    ```
    
4. @click.once="parent"
    - 事件只会触发一次
    
```
<div id="app">
        <!-- once: 只会触发一次 -->
        <div @click="parent">parent
            <div @click.once="child">child
                <div @click="grandson">grandson</div>
            </div>
        </div>
    </div>
```

5. @click.self="parent": 只有点击自己时才会触发
    
```
<div id="app">
        <!-- .self: 只有点击自己时才会触发 -->
        <div @click.self="parent">parent
            <div @click.once="child">child
                <div @click="grandson">grandson</div>
            </div>
        </div>
    </div>
```

### 过滤器
- 放在 Vue上，可供多个实例使用，并且要放在最上面

```
<div id="app1">
    {{'tian' | my(data)}}
</div>
<div id="app2">
    {{'tian' | my(data)}}
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script>
// 放在 Vue上，可供多个实例使用，并且要放在最上面
    Vue.filter('my',data => {
        return data+'heihei'
    })
    new Vue({
        el: '#app1',
    })
    new Vue({
        el: '#app2',
    })
</script>
```

### template 标签
- 包裹元素使用
- v-show 不支持template，v-if 支持

```
<!-- template 用v-show不生效 -->
<template v-if="flag">
    <div>tian</div>
    <div>tian</div>
    <div>tian</div>
    <div>tian</div>
</template>

<div v-else>yang</div>
```

### key值的作用
- 默认情况下切换DOM的时候，相同的结构会被复用，如果不需要复用，要加key值做标识

```
<!-- 注册登录框转换 -->
<button @click="cut=!cut">点我啊</button>
<template v-if="cut">
    <label>注册</label>
    <input type="text" :key="Math.random()">
</template>
<template v-else>
    <label>登录</label>
    <input type="text" :key="Math.random()">
</template>
```

### 实现单页开发的方式
1. 通过 hash 记录跳转的路径 (可以产生历史管理)
    - 在a标签上加锚点 `<a href="#/all">全部</a>`
    - 监控hash值的变化，实现单页开发
        - `this.hash = window.location.hash.slice(2) || 'all'` :页面一刷新先获取hash值
        - hashchange: hash一变化就发生的事件
            this.hash = window.loca
        
        ```
        window.addEventListener('hashchange', () => {// hashchange: hash一变化就发生的事件
            this.hash = window.location.hash.slice(2)
        })
        ```
    
2. 浏览器自带的历史管理的方法 history (history.pushState()) 可能会导致 404错误
3. 开发时使用hash的方式，上线时 使用 history

### localStorage : 本地存储
- 通过watch监听，只要发生变化就存储在本地，而不需要计算，所有不用computed
- localStorage.setItem() 和localStorage.getItem()
    
    ```
    // 存储值 {"a":1}
    // 理由：如果不用 JSON.stringify() 转化，会转化成 [object Object]
    localStorage.setItem(JSON.stringify('a',{"a":1})) 
    
    // 提取值 {"a":1}
    // 理由：如果不用 JSON.parse() 转化，得到的是一个字符串，我们需要的是对象
    JSON.parse(localStorage.getItem('a'))
    ```
    
- 通过钩子函数 created 拿到 localStorage 的数据，渲染到页面上
        
    ```
    created(){ // 页面刷新时，将 localStorage中的数据提取出来渲染到页面上
        // 当localStorage中没有数据时，走 this.todos
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos
    },
    watch: { // 监控 数据变化，存储在localStorage中
        todos: {
            handler () {
                localStorage.setItem('data',JSON.stringify(this.todos))
            },deep:true
        }
    },
    ```

### 生命周期: 钩子函数
1. 就是回调函数，只是起了个名字而已，不需过多理解
2. 根实例初始化时会被调用
3. 生命周期有哪些方法
    - beforeCreate : 出生前，一些内部方法，不会用到
    - created: 出生后，获取ajax，做一些初始化操作
    - 挂载元素el 和 模板template
    - beforeMount: 数据编译好前，数据挂载前，数据和模板编译
    - mounted: 数据挂载后，可以拿到真实dom
    - beforeUpdate: 数据更新前
    - updated: 数据更新后（这两个可以用 watch 替代）
    - 调用 vm.$destroy(),触发以下两个方法
    - beforeDestroy : 数据销毁前，可以清楚定时器，解绑事件
    - destroyed: 数据销毁后

