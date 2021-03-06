### 数组的方法
1. slice:不改变原数组

### forEach,for in,for,for of 的区别
# 都不会改变原数组

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
    - beforeMount: 数据挂载前，挂载：数据和模板编译好后放到页面上 
    - mounted: 数据挂载后，可以拿到真实dom
    - beforeUpdate: 数据更新前
    - updated: 数据更新后（这两个可以用 watch 替代）
    - 调用 vm.$destroy(),触发以下两个方法
    - beforeDestroy : 数据销毁前，可以清楚定时器，解绑事件
    - destroyed: 数据销毁后

4. this.$属性
    - this.$data: vm上数据
    - this.$watch: 监控
    - this.$el: 当前el元素
    - this.$set: 后加的属性实现响应化
    - this.$options: vm 上的所有属性
    - this.$nextTick: 异步方法，等待渲染dom完成后获取vm
        - 如果想在 mounted 中拿到 内容，最好加一个 `this.$nextTick(() => {})` 一步的方法
    - this.$refs:拿到真实的dom方法,
        -  `<p ref="myp">{{a}}</p>`
        -  `this.$refs.myp`
        -  this.$refs如果不是v-for元素，只能获取一个元素
        -  `this.$refs.myp.$el.innerHTML` : 获取 元素的 html内容

### 组件开发 
1. 分类
    - 功能划分：页面级组件：
        - 一个页面时一个组件
        - 将可复用的部分抽离出来，基础组件
    - 用法划分：
        - 全局组件：可以声明一次，在任何地方使用，一般写插件使用
        - 局部组件：必须告诉这个组件属于谁

2. 好处
    - 提高开发效率
    - 方便重复使用
    - 便于协同开发
    - 更容易被管理和维护

3. 自定义标签：vue会把他看成一个组件（出去div,span,a,section等）
4. 组件名: 不要中间大写，多个单词用 “-” 连接  如：my-name,  html中用 my-name，js中转驼峰 myName
5. 全局组件写法
    
    ```
    <div id="app">
        <my-name>tian</my-name>
    </div>
    
    // 1. 组件名：html中：用 “-”连接 my-name，js中：改成驼峰 myName
    Vue.component('myName',{ // 一个对象可以看成是一个组件
        template: '<div>{{msg}}</div>', // 绑定动态数据
        data () { // 组件中的数据必须是函数类型，“返回”一个实例作为组件的数据
            return {msg: '我很美'}
        }
    })
    ```
6. 局部组件 scope-component
7. 订阅发布

    ```
    // 发布: emit  订阅：on
    // 构造函数 girl
    function Girl () {
        // 将可以订阅的事件放在对象中
        this._event = {}
    }
    
    // 在原型上绑定 订阅 和 发布
    Girl.prototype.on = function (eventName,callback) {
        if (this._event[eventName]) { // 没有定义过
            this._event[eventName].push(callback)
        }else{ // 定义过了
            this._event[eventName] = [callback]
        }
    }
    Girl.prototype.emit = function (eventName,...args) {
        // 执行回调函数
        if (this._event[eventName]) {
            this._event[eventName].forEach(cal => {
                cal(...args)
            })
        }
    }
    
    let girl = new Girl()
    
    // callback
    function cry (who) {
        console.log(who+'哭')
    }
    function buy (who) {
        console.log(who+'买') 
    }
    function eat (who) {
        console.log(who+'吃')
    }
    
    // 订阅 on
    girl.on('失恋',cry)
    girl.on('失恋',buy)
    girl.on('失恋',eat)
    
    // 发布 emit
    girl.emit('失恋','我','你')
    ```

8. emit: 发布订阅  this.$emit()
    - 子级使用父级的数据，再通过发布订阅 通知父级修改数据，进而达到更新自己的数据
    - 在父级身上绑定事件 `thinks()`
    - 在子级身上 创建自定义事件来绑定 ` @child-msg="thinks"`，再通过自身事件`@click="getMoney"` `getMoney () {this.$emit('child-msg',800) }` 触发 自定义事件`child-msg`并传递需要的参数, 进而触发父级事件，来改变数据，从而更新自己的数据
         
        ```
        <div id="app">
            父亲: {{money}}
        
            <!-- 通过props继承拿到父亲的数据，绑定到自己身上 -->
            <!-- 儿子绑定自定义事件来 接收父亲绑定的things事件 -->
            <child :m="money" @child-msg="thinks"></child>
        </div>
        
        <script src="./node_modules/vue/dist/vue.js"></script>
        <script>
        // 父亲绑定一些事件，儿子触发这个事件，将参数传递过去，“单向数据流”
        // 如果儿子想改数据，必须要通知父亲修改，父亲数据刷新，儿子数据就会刷新
        
        let vm = new Vue({
            el: '#app',
            data: {
                money: 400
            },
            methods: {
                thinks (val) {
                    this.money = val
                }
            },
            components: { // 子组件
                child: {
                    props: ['m'],
                    template: '<div>儿子: {{m}}  <button @click="getMoney">要钱</button></div>',
                    methods: {
                        getMoney () {
                            this.$emit('child-msg',800) // 触发自己的自定义事件，继而触发父级的thinks事件通知父级改数据（方法时父亲的，属性时当前组件的）
                        }
                    }
                }
            }
        })
        </script>
        ```
9. sync 语法糖
    
    ```
    <!-- :m.sync: 语法糖  自定义事件用 update:m 代替 -->
    <child :m.sync="money"></child>
    
    getMoney () {
        this.$emit('update:m',800) // 触发自己的自定义事件，继而触发父级的thinks事件通知父级改数据（方法时父亲的，属性时当前组件的）
    }
    ```
10. 插槽 slot 
    - 作用：定制模板
    - 如果组件 modal中没有内容，默认走slot里，如果有，忽略 slot里的内容  默认：default-
    - slot里有名字：填入对应内容，渲染
    
    ```
    <div id="app">
        <modal><p slot="content">这是内容</p><h3 slot="title">这是标题</h3></modal>
    </div>
    
    <template id="dialog">
        <div>
            <!-- 如果组件 modal中没有内容，默认走slot里，如果有，忽略 slot里的内容  默认：default-->
            <slot name="default">这是默认标题</slot>
    
            <!-- 规定好名字，填入对应内容 -->
            <slot name="title"></slot>
            <slot name="content"></slot>
        </div>
    </template>

    // 组件
    let modal = {
        template: '#dialog'
    }

    let vm = new Vue({
        el: '#app',
        data: {},
        components: {
            modal
        }
    })
    ```

11. 父级使用子级的数据和方法 通过 ref : 拿到组件的实例，然后进行操作
    - 注：ref 放在组件上，获取的是组件的实例，并不是组件的dom元素
    
    ```
    <div id="app">
        <loading ref="load"></loading>
    </div>
    
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script src="./node_modules/axios/dist/axios.js"></script>
    <script>

    let loading = {
        data () {
            return {
                flag:true
            }
        },
        template: '<div v-show="flag">加载中。。。</div>',
        methods: {
            hide () {
                this.flag = false
            }
        }
    }

    let vm = new Vue({
        el: '#app',
        components: {
            loading
        },
        mounted () {
            console.log(this.$refs.load)
            this.$refs.load.hide()
        }
    })
    </script>
    ```


12. keep-alive ： 缓存标签
    - 两个模板组件切换，每次切换，都会销毁一次组件，造成性能消耗， 解决办法： keep-alive 标签包一下
    - 路由使用机制： 将组件缓存起来
        
    ```
    <div id="app">
    <!-- value属性：如果不加显示 true或者false -->
    <input type="radio" v-model="radio" value="home"> home
    <input type="radio" v-model="radio" value="list"> list

    <!-- 两个模板组件切换 -->
    <!-- 每次切换，都会销毁一次组件，造成性能消耗， 解决办法： keep-alive 标签包一下 -->
    <!-- 路由使用机制： 缓存 -->
    <keep-alive name="flag">
        <component :is="radio"></component>
    </keep-alive>
</div>
<script src="./node_modules/vue/dist/vue.js"></script>
<script src="./node_modules/axios/dist/axios.js"></script>
<script>

    let home = {
        template: '<div>home</div>',
        beforeDestroy () {
            console.log('销毁')
        }
    }
    let list = {
        template: '<div>list</div>',
        beforeDestroy () {
            console.log('销毁')
        }
    }

    let vm = new Vue({
        el: '#app',
        data: {
            radio: 'home'
        },
        components: {
            home,list
        },
    })
</script>
    ```

13. props：使用 Prop 传递数据
    - 父组件的数据需要通过 prop 才能下发到子组件中
    
    ```
    props: {
        //  父传子的属性
        type: {
            type:[String],
            default: 'default' // 默认传 default
        }
    }
    ```
    - 子组件不能擅自修改从父组件拿到的props里的数据，
    - 子组件可以通过 data () {},或者 computed () {},修改从父组件拿到的数据
        
    ```
    computed: {
        color () {
            return 'panel-' + this.type
        }
    },
    ```

14. 组件的循环
    - 组件的循环，要加key    
    
    ```
    <!-- 组件的循环，要加key值 -->
    <panel type="article.type" @say-title="parentFn" v-for="(article,index) in articles" :key="index">
        <!-- <span v-html="article.title">: 解析html -->
        <div slot="title"><span v-html="article.title"></span></div>
        <div slot="content">内容：
            {{article.content}}
        </div>
        <!-- 先判断作者是不是存在 用v-if 如果存在就渲染 -->
        <div slot="footer" v-if="article.author">{{article.author}}</div>
    </panel>
    ```

    
15. eventBus-实现多层级组件的传递 
    - 依赖: 依赖发布订阅
    - 创建第三方实例，实现事件的交互

    
### vue 路由
- 访问不同的路径，就可以返回不同的结果
- single page application 单页面应用

```
<body>
<!--
    1. 前后端分离，后端只负责提供数据接口，
    2. 跳转是前端实现的
    3. 开发时：hash 模式，开发时使用hash，不会导致404，但不支持seo(搜索引擎优化)，搜索引擎找不到hash后面的值
    4. 上线时采用：h5 的 history.pushState
 -->

 <div id="app">
     <!-- router-view:是全局组件，可以直接使用 -->
     <!-- 作用： 显示视图 -->
    <router-view></router-view>
    <!-- 跳转链接 -->
    <!-- to: 必须加路径  tag: 修改标签名 -->
    <router-link to="/home" tag="button">首页</router-link>
    <router-link to="/list" tag="button">列表页</router-link>
 </div>

 <script src="./node_modules/vue/dist/vue.js"></script>
 <script src="./node_modules/vue-router/dist/vue-router.js"></script>
 <script src="./node_modules/axios/dist/axios.js"></script>
 <script>
    // 页面
    let home = {template: '<div>首页</div>'}
    let list = {template: '<div>列表页</div>'}

    // VueRouter:引入vue-rputer ,自带VueRouter 类
    let routes = [ // 路由的映射表，配置路径和组件的关系
        {path: '/home',component:home}, // 配置的关系就是页面级组件
        {path: '/list',component:list} // 路径必须加 “/”
    ]
    let router = new VueRouter({
        routes
    })

    // 实例
    let vm = new Vue({
        el: '#app',
        router, // 路由
    })

</script>
</body>
```

### vue 路由-编程式导航
- `this.$router.push('/list')` , 跳转到 列表页，有历史路径 ['/home','/list',...]
- `this.$router.go(-1)`, 返回到 首页

### vue 路由-嵌套路由
- 父级路由和孩子路由 都要有 视图渲染 `<router-view></router-view>`
- children中 路径 永远不加 /，如果带，表示是一级路由
    
```
<div id="app">
    <router-link to="/home">首页</router-link>
    <router-link to="/detail">详情页</router-link>
    <router-view></router-view>
</div>

<template id="detail">
    <div>
        <router-link to="/detail/profile">个人中心</router-link>
        <router-link to="/detail/about">关于我</router-link>
        <router-view></router-view>
    </div>
</template>

// 路由模板
let home = {
    template: '<div>首页</div>'
}
let detail = {
    template: '#detail'
}
let profile = {
    template: '<div>个人中心</div>'
}
let about = {
    template: '<div>关于我</div>'
}

let routes = [{
        path: '',
        component: home
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/detail',
        component: detail,
        children: [ // children中 路径 永远不加 /，如果带，表示是一级路由
            {
                path: 'profile',
                component: profile
            },
            {
                path: 'about',
                component: about
            },
        ]
    }
]

let router = new VueRouter({
    routes
})

let vm = new Vue({
    el: '#app',
    router
})
```
### vue 路由-参数变化，请求ajax

```
let article = {
    template: '<div>第 {{$route.params.c}} 篇文章</div>',
    watch : {
        $route () { // 路由中的params一变化，就请求ajax
            alert('请求ajax')
        }
    }
}
```

### 路由 + 动画

```
<div id="app">
    <router-link to="/home">home</router-link>
    <router-link to="/list">list</router-link>

    <!-- 动画+路由 -->
    <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
    >
        <!-- 缓存：router-view  谁需要就给谁加 -->
        <keep-alive>
            <router-view class="active"></router-view>
        </keep-alive>
    </transition>
    
</div>
```

### vue-cli: vue脚手架

- 工具：npm i vue-cli -g

- 命令行中 vue -v
出现版本号安装成功

- vue init webpack project(项目名称)

- cd进入project

- 先安装模块 npm i

- 启动项目 npm run dev

### 模块
- node 模块规范: commonjs
- cmd amd require
- esmodule es6的模块
    - 如何定义模块（一个js就是一个模块）
    - 如何导出模块（export）
    - 如何使用模块（import）

```
//首先开启服务器（anywhere 8860）
// type="module"
<script src="./main.js" type="module"></script>


// 导出 (a.js 文件)
export let str = 'tian';
export let str2 = 'yang';

// 引入使用 (main.js 文件)
// 如果是文件模块，要加 './',  如果是第三方模块，不加 './'
// 从另一个文件中 解构出来使用
// import： 具有声明功能，

// console.log(str) // import 命令具有提升效果
import {str，str2} from './a.js';
console.log(str, str2)
```


### webpack 解析模块
- 先下载webpack
- npm init -y
- npm install webpack --save-dev (生产环境)
- 安装webpack最好不要再全局，否者可能导致webpack的版本差异
- 在package.json 中配置一个脚本 ，这个脚本的命令式webpack，会去当前的node_modules下 找bin对相应的webpack名字，让其执行，执行的就是bin/webpack.js，webpack.js 需要当前目录下有个名字叫webpack.config.js文件，我们通过npm run build执行的目录是当前文件的目录，所以会去当前目录下去吓着

### babelz转义es6 -> es5
- babel核心包：npm install babel-core --save-dev
- babel翻译官,解析语法: npm install babel-loader --save-dev
- 让翻译官拥有解析es6的功能 npm install babel-preset-es2015 --save-dev
- 让翻译官拥有解析es7 的功能 npm install babel-preset-stage-0 --save-dev

### 解析css样式
- npm install css-loader style-loader --save-dev
- css-loader: 将css解析成模块，将解析的内容插到style标签内（style-loader）

### less,sass,stylus(预处理语言)
- less-loader  less css-loader style-loader
- sass-loader
- stylus-loader

### 解析图片
- file-loader
- url-loader: 依赖于file-loader，
- 在js中写 图片需要import，或者是线上地址


### 解析html插件
- 插件的作用，以我们自己的html作为模板，将打包的结果自动引入到html中，产出到dist文件目录下
- npm install html-webpack-plugin --save-dev

### webpack 的开发服务器
- webpack-dev-server --save-dev  :可以帮我们启动一个端口号，代码更新时，自动打包，代码有变化，就重新执行

### 安装 vue vue-loader vue-template--compiler
- vue-loader:  解析 .vue文件的
- vue-template--compiler 用来解析vue模板的

### vue文件配置
- 初始化：npm init -y 
- 安装依赖
`npm install webpack webpack-dev-server babel-core babel-loader babel-preset-es2015 babel-preset-stage-0 css-loader style-loader less less-loader file-loader url-loader html-webpack-plugin --save-dev`
- 安装 vue vue-loader(解析 .vue文件) vue-template-compiler （解析vue模板）
- 安装路由 vue-router
- 配置文件 `webpack.config.js`
    - 原码路径：src文件
    - 入口文件: main.js
    - 出口文件：bundle.js (任意取)
    - 配置依赖模块 module
    - plugin：html模板

- package.json: 配置打包的命令
    
    ```
    "build": "webpack",
    "dev": "webpack-dev-server"
    ```

### vue-cli   vue 脚手架
- npm install vue-cli -g
- vue init webpack vue-book : 生成文件夹
- 进入 vue-book 文件
- 初始化安装依赖: npm install

### vue-cli 项目
- components：页面级组件
- base: 基础组件，页面的某一部分
- api： 接口文件
- mock: 后台服务文件


### 阿里字体图标
- 搜索后加入购物车
- 引入线上地址

```
<!-- 图标使用 -->
<i class="iconfont icon-home"></i>
```

### vue 小练习
- App.vue：根组件
- main.js： 入口文件，一般引入 根组件和路由，不做其他操作
- components文件: 页面级组件  Home,Add,List.Collect
- 路由router： 引入Home,Add,List.Collect组件，配置路由
- 在 App.vue 中渲染路由 `<router-view></router-view> <router-link to="/home"></router-link>`
- base文件: 
    - 底部tab切换组件: 把tab切换（首页，列表...）,抽到Tab组件内，方便复用
    - 头部head导航组件：每个页面级组件引入注册，使用就可以了

    
### home 首页 轮播 和 热门图书的功能
- api数据接口
- 在哪个组件应用这个api：如果是基础组件需要这些数据，在这个组件的父级中调用这个方法，将数据传递给基础组件
- 写一个基础组件
    - 创建一个 .vue 文件
    - 在需要使用这个组件的父级中引用这个组件
    - 在组件中注册
    - 以标签的形式引入
- 轮播图组件 
    - 安装插件`npm install vue-awesome-swiper --save`
    - 复制粘贴代码
    - 引入`import VueAwesomeSwiper from 'vue-awesome-swiper'` 和 `import 'swiper/dist/css/swiper.css'`
    - 使用 `Vue.use(VueAwesomeSwiper, /* { default global options } */)`
    - 在主页Home 中引入使用
    - api： 后台，返回数据

    
### list 列表页
- 删除功能
- 详情页跳转  
    - 依赖:路径参数：`{path: '/detail/:bid',component: Detail,name:'detail'},,`  
    - 动态绑定:`:to="{name:'detail',params:{bid:book.bookId}}"`
- 判断 对象是否为空
    - `Object.keys({}).length` :转化为数组后再判断
### 详情页 detail
- 查看 
- 修改
- map:用新值替换旧值
        
    ```
    book = book.map(item => {
        if (item.bookId === id) {
            return this.books[0] // 替换成新的
        }else {
            return item // 其他原封不动返回
        }
    })
    ```
- 添加页 add
### 实现loading组件  及 页面缓存
    - axios 如何同时完成多个接口
`axios.all([getSliders(),getHotBooks()])`
    - loading组件：css3 网上代码
    - home页缓存 :路由源信息 keep-alive
                    
        ```
        // 路由：
        routes: [
            {
                path: '/home',
                component: Home,
                // 路由源信息 meta  如何取：this.$route.meta.keepAlive
                meta: {keepAlive:true}
            },
        ]
        
        // 路由显示页：App.vue
        <template>
            <div id="app">
                <!-- 使用路由 -->
                <!-- keep-alive:需要缓存的 $route.meta.keepAlive:是不是需要缓存的布尔值-->
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
            
                <!-- 正常的访问走这边：不需要缓存的 -->
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            
                <Tab></Tab>
            </div>
        </template>
        ```

### 上拉加载
- 默认每次给5条，前端告诉后台要从第几条开始加载
- 后台返回 还要告诉前端 是否有更多的数据 
- 不断往数组中加数组的方法 `this.books = [...this.books,...books]`
- 滚动高度(scrollTop + 元素可见高度(clientHeight) + 20 > 元素的总高度(scrollHeight))
- +20:提前一点请求数据，提高用户体验

### 下拉刷新
- github 上插件: vue-pull-refresh
- 根据插件复制粘贴套用

### 图片懒加载
- github 上插件: vue-lazyload
- 使用步骤
    - `npm install vue-lazyload -D`
    - main.js 中 ，引入插件
    
    ```
    import VueLazyload from 'vue-lazyload' //图片懒加载

    Vue.use(VueLazyload, {//图片懒加载
      preLoad: 1.3,
      error: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518092973370&di=360b9985c4106bde48a51dc90d61d5fd&imgtype=0&src=http%3A%2F%2Fimg01.taopic.com%2F160312%2F267851-16031210562321.jpg',
      loading: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
      attempt: 1
    })
    ```
    - list组件中: 把img的src换成 v-lazy
    `<img v-lazy="book.bookCover">`


### 项目优化
- 代码分隔  coding split
    - 点一个页面，加载一个页面，而不是都加载了
    - 路有中不用引入 `import Home from '../components/Home.vue';`
    - 只要这样配置 
    
        ```
        {
            path: '/home',
            component: () => import('../components/Home.vue'),
            // 路由源信息 meta  如何取：this.$route.meta.keepAlive
            meta: {keepAlive:true}
        },
        ```
        


